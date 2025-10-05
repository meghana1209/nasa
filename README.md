# AeroSense – NASA TEMPO Air Quality Forecast System
## Project Structure
- `frontend/` – React + Vite + Tailwind CSS web app
- `backend/` – Python FastAPI REST API
- `db/` – PostgreSQL database setup

## Setup Steps
1. Clone repo and copy `.env.example` to `.env` in both frontend and backend
2. Run `docker-compose up` to start all services
3. Access frontend at `http://localhost:3000`, backend at `http://localhost:8000`

## Data Sources
- NASA TEMPO satellite (NO₂, PM2.5, O₃)
- OpenAQ ground sensors
- OpenWeatherMap (weather)

## Features
- Dashboard: AQI, pollutants, weather
- Interactive map: pollution heatmaps
- Forecast chart: 24–48h
- Alerts: AQI > 100
- Historical trends & correlations
- Source transparency

## Extras
- ML model for AQI prediction
- User settings
- CI/CD workflow

## Screenshots
*Add screenshots here after setup*

## Citations
- NASA TEMPO: https://tempo.si.edu/
- OpenAQ: https://openaq.org/
- OpenWeatherMap: https://openweathermap.org/

---

See each folder for more details and code comments.
# nasa