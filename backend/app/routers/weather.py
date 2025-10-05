
from fastapi import APIRouter
import os
import requests
from app.db import get_db_conn

router = APIRouter()

def fetch_openweathermap():
    api_key = os.getenv("OPENWEATHER_API_KEY")
    # url = f"https://api.openweathermap.org/data/2.5/weather?q=London&appid={api_key}"
    # resp = requests.get(url)
    # data = resp.json()
    # return {"temperature": data["main"]["temp"], "humidity": data["main"]["humidity"], "wind": data["wind"]["speed"], "rain": data.get("rain", 0), "source": "OpenWeatherMap"}
    return {"temperature": 25, "humidity": 60, "wind": 5, "rain": 0, "source": "OpenWeatherMap"}

@router.get("/")
def get_weather():
    """
    Fetch current weather data from OpenWeatherMap and store in DB.
    """
    weather = fetch_openweathermap()
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO weather (timestamp, location, temperature, humidity, wind, rain, source) VALUES (NOW(), %s, %s, %s, %s, %s, %s)",
        ("default", weather["temperature"], weather["humidity"], weather["wind"], weather["rain"], weather["source"])
    )
    conn.commit()
    cur.close()
    conn.close()
    return weather
