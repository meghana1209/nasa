import React from "react";

export default function Dashboard({ aqi, pollutants, weather, alert }) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Dashboard</h2>
      {alert && (
        <div className="bg-red-100 text-red-800 p-2 mb-4 rounded shadow">{alert}</div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
    </section>
  );
}
