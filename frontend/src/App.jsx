
import React, { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import Settings from "./components/Settings";
import ForecastChart from "./components/ForecastChart";
import Trends from "./components/Trends";

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
        <Dashboard aqi={aqi} pollutants={pollutants} weather={weather} alert={alert} />
        <Settings settings={settings} onChange={handleSettingsChange} onSubmit={handleSettingsSubmit} />
        <ForecastChart forecast={forecast} />
        <Trends />
      </main>
      <footer className="bg-blue-900 text-white p-2 text-center text-sm mt-8">
        Data sources: NASA TEMPO, OpenAQ, OpenWeatherMap
      </footer>
    </div>
  );
}

export default App;
