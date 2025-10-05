import React from "react";

export default function ForecastChart({ forecast }) {
  return (
    <section className="mb-6">
      <h2 className="text-xl font-semibold mb-2">Map & Forecast</h2>
      <div className="bg-white rounded shadow p-4">
        {/* TODO: Integrate Chart.js/Plotly.js and Leaflet map */}
        <div>Forecast (next 24h):</div>
        <ul>
          {forecast.map((f, i) => (
            <li key={i}>Hour {f.hour}: AQI {f.aqi}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
