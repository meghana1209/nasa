

from fastapi import APIRouter
from app.db import get_db_conn
import numpy as np
from statsmodels.tsa.arima.model import ARIMA

router = APIRouter()

def predict_aqi_arima(history, steps=24):
    # ARIMA model for AQI prediction
    if len(history) < 5:
        # Not enough data, fallback to mean
        return [int(np.mean(history))] * steps
    model = ARIMA(history, order=(2,1,2))
    model_fit = model.fit()
    forecast = model_fit.forecast(steps=steps)
    return [int(x) for x in forecast]

@router.get("/")
def get_forecast():
    """
    Generate 24-48h air quality forecast using historical and weather data.
    """
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute("SELECT aqi FROM air_quality ORDER BY timestamp DESC LIMIT 100")
    rows = cur.fetchall()
    history = [r[0] for r in rows][::-1]  # oldest first
    forecast_aqi = predict_aqi_arima(history, steps=24)
    forecast_data = [{"hour": h+1, "aqi": forecast_aqi[h]} for h in range(24)]
    cur.execute(
        "INSERT INTO forecast (timestamp, location, forecast_data, source) VALUES (NOW(), %s, %s, %s)",
        ("default", str(forecast_data), "arima")
    )
    conn.commit()
    cur.close()
    conn.close()
    return {"forecast": forecast_data, "source": "arima"}
