
from fastapi import FastAPI
from .routers import airquality, weather, forecast

app = FastAPI(title="AeroSense – NASA TEMPO Air Quality Forecast System")

app.include_router(airquality.router, prefix="/api/airquality", tags=["Air Quality"])
app.include_router(weather.router, prefix="/api/weather", tags=["Weather"])
app.include_router(forecast.router, prefix="/api/forecast", tags=["Forecast"])
