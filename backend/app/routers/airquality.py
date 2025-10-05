

from fastapi import APIRouter, Request
import os
import requests
from app.db import get_db_conn

router = APIRouter()

def fetch_nasa_tempo():
    api_key = os.getenv("NASA_TEMPO_API_KEY")
    return {"NO2": 12, "PM2.5": 8, "O3": 22, "source": "NASA TEMPO"}

def fetch_openaq():
    api_key = os.getenv("OPENAQ_API_KEY")
    return {"NO2": 10, "PM2.5": 7, "O3": 20, "source": "OpenAQ"}

def send_alert(aqi, email=None, push_token=None):
    if aqi > 100:
        # Simulate sending alert (replace with real email/push logic)
        print(f"ALERT: AQI {aqi} is unhealthy!")
        if email:
            print(f"Email sent to {email}")
        if push_token:
            print(f"Push notification sent to {push_token}")

@router.get("/")
async def get_air_quality(request: Request):
    tempo = fetch_nasa_tempo()
    openaq = fetch_openaq()
    aqi = max(tempo["NO2"], openaq["NO2"]) + max(tempo["PM2.5"], openaq["PM2.5"]) + max(tempo["O3"], openaq["O3"])
    conn = get_db_conn()
    cur = conn.cursor()
    cur.execute(
        "INSERT INTO air_quality (timestamp, location, aqi, no2, pm25, o3, source) VALUES (NOW(), %s, %s, %s, %s, %s, %s)",
        ("default", aqi, tempo["NO2"], tempo["PM2.5"], tempo["O3"], "NASA TEMPO")
    )
    conn.commit()
    cur.close()
    conn.close()
    # Get user settings from query params or env
    email = request.query_params.get("email") or os.getenv("ALERT_EMAIL")
    push_token = request.query_params.get("push_token") or os.getenv("ALERT_PUSH_TOKEN")
    send_alert(aqi, email, push_token)
    return {"aqi": aqi, "sources": [tempo["source"], openaq["source"]], "pollutants": {"NO2": tempo["NO2"], "PM2.5": tempo["PM2.5"], "O3": tempo["O3"]}}

@router.post("/settings")
async def update_settings(request: Request):
    data = await request.json()
    # Save user settings (location, notification type) to DB or env
    # For demo, just print
    print("User settings updated:", data)
    return {"status": "success", "settings": data}
