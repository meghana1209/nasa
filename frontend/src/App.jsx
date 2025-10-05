
import React, { useEffect, useState } from "react";

function App() {

  const [aqi, setAqi] = useState(null);
  const [pollutants, setPollutants] = useState({});
  const [weather, setWeather] = useState({});
  const [forecast, setForecast] = useState([]);
  const [settings, setSettings] = useState({ email: "", push_token: "" });
  const [alert, setAlert] = useState("");

  useEffect(() => {
    fetch("/api/airquality")
      .then((res) => res.json())
      .then((data) => {
        setAqi(data.aqi);
        setPollutants(data.pollutants);
        if (data.aqi > 100) {
          setAlert("Unhealthy AQI detected! Alert sent.");
        } else {
          setAlert("");
        }
      });
    fetch("/api/weather")
      .then((res) => res.json())
      .then((data) => setWeather(data));
    fetch("/api/forecast")
      .then((res) => res.json())
      .then((data) => setForecast(data.forecast));
  }, [settings]);

  const handleSettingsChange = (e) => {
    setSettings({ ...settings, [e.target.name]: e.target.value });
  };

  const handleSettingsSubmit = async (e) => {
    e.preventDefault();
    await fetch("/api/airquality/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    // Optionally re-fetch AQI with new settings
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-blue-900 text-white p-4 text-center text-2xl font-bold">
        AeroSense – NASA TEMPO Air Quality Forecast System
      </header>
      <main className="p-4">
        <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
        {alert && (
          <div className="bg-red-100 text-red-800 p-2 mb-4 rounded shadow">
            {alert}
          </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded shadow p-4">Current AQI: <span className="font-bold">{aqi ?? '--'}</span></div>
          <div className="bg-white rounded shadow p-4">
            Pollutants:
            <span className="font-bold">
              {pollutants.NO2 !== undefined ? `NO₂: ${pollutants.NO2}, ` : ''}
              {pollutants["PM2.5"] !== undefined ? `PM2.5: ${pollutants["PM2.5"]}, ` : ''}
              {pollutants.O3 !== undefined ? `O₃: ${pollutants.O3}` : ''}
            </span>
          </div>
          <div className="bg-white rounded shadow p-4">
            Weather:
            <span className="font-bold">
              {weather.temperature !== undefined ? `Temp: ${weather.temperature}°C, ` : ''}
              {weather.humidity !== undefined ? `Humidity: ${weather.humidity}%, ` : ''}
              {weather.wind !== undefined ? `Wind: ${weather.wind} m/s, ` : ''}
              {weather.rain !== undefined ? `Rain: ${weather.rain} mm` : ''}
            </span>
          </div>
        </div>
        <h2 className="text-xl font-semibold mb-2">User Settings</h2>
        <form className="bg-white rounded shadow p-4 mb-6" onSubmit={handleSettingsSubmit}>
          <label className="block mb-2">Email for alerts:
            <input type="email" name="email" value={settings.email} onChange={handleSettingsChange} className="border p-1 ml-2" />
          </label>
          <label className="block mb-2">Push token:
            <input type="text" name="push_token" value={settings.push_token} onChange={handleSettingsChange} className="border p-1 ml-2" />
          </label>
          <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded">Save Settings</button>
        </form>
        <h2 className="text-xl font-semibold mb-2">Map & Forecast</h2>
        <div className="bg-white rounded shadow p-4 mb-6">
          {/* TODO: Integrate Leaflet map and Chart.js/Plotly.js for forecast */}
          <div>Forecast (next 24h):</div>
          <ul>
            {forecast.map((f, i) => (
              <li key={i}>Hour {f.hour}: AQI {f.aqi}</li>
            ))}
          </ul>
        </div>
        <h2 className="text-xl font-semibold mb-2">Historical Trends</h2>
        <div className="bg-white rounded shadow p-4">[Historical Trends Placeholder]</div>
      </main>
      <footer className="bg-blue-900 text-white p-2 text-center text-sm mt-8">
        Data sources: NASA TEMPO, OpenAQ, OpenWeatherMap
      </footer>
    </div>
  );
}

export default App;
