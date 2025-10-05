CREATE TABLE IF NOT EXISTS air_quality (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    aqi INTEGER NOT NULL,
    no2 REAL,
    pm25 REAL,
    o3 REAL,
    source VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS weather (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    temperature REAL,
    humidity REAL,
    wind REAL,
    rain REAL,
    source VARCHAR(50)
);

CREATE TABLE IF NOT EXISTS forecast (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    location VARCHAR(255) NOT NULL,
    forecast_data JSONB,
    source VARCHAR(50)
);
