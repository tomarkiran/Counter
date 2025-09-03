const apiKey = "39c60dc3c9171f1fa15dbfbe6f154484"

import React, { useEffect, useState } from "react"
import "./Weather.css"

const Weather = () => {
  const [data, setData] = useState(null)
  const [forecast, setForecast] = useState([])
  const [city, setCity] = useState("")
  const [loading, setLoading] = useState(false)
  const [isCitySearch, setIsCitySearch] = useState(false)

  useEffect(() => {
    getCurrentLocationWeather()
  }, [])

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true)
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      )
      const currentData = await res.json()
      setData(currentData)

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
      )
      const forecastData = await forecastRes.json();

      const daily = forecastData.list
        .map((item, index) => (index % 8 === 0 ? item : null))
        .filter(Boolean)

      setForecast(daily)
      setIsCitySearch(false)
    } catch (error) {
      console.error("Error fetching weather:", error)
    } finally {
      setLoading(false)
    }
  }

  const fetchWeatherByCity = async () => {
    if (!city) return;
    try {
      setLoading(true)
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const currentData = await res.json()
      setData(currentData)

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
      );
      const forecastData = await forecastRes.json()

      const daily = forecastData.list
        .map((item, index) => (index % 8 === 0 ? item : null))
        .filter(Boolean)

      setForecast(daily)
      setIsCitySearch(true)
    } catch (error) {
      console.error("Error fetching weather:", error)
    } finally {
      setLoading(false)
    }
  };

  const getCurrentLocationWeather = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          fetchWeatherByCoords(latitude, longitude)
        },
        (err) => console.error("Geolocation error:", err)
      )
    } else {
      alert("Geolocation not supported by your browser.")
    }
  }

  return (
    <div className="weather-container">
      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="search-btn" onClick={fetchWeatherByCity}>🔍</button>
        <button
          className="location-btn"
          onClick={getCurrentLocationWeather}
          style={{ background: isCitySearch ? "green" : "#555" }}
        >
          ⟳
        </button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {data && (
        <div className="weather-card">
          <h2 className="location">
            {data.name}, {(data.sys && data.sys.country) || "N/A"}
          </h2>
          <div className="main-weather">
            <div className="temp-section">
              <img
                src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                alt={data.weather[0].main}
                className="weather-icon"
              />
              <div className="temp">{Math.round(data.main.temp)}°C</div>
            </div>
            <div className="condition">
              <p>{data.weather[0].main}</p>
              <p>Feels like {Math.round(data.main.feels_like)}°C</p>
            </div>
          </div>
          <div className="info-cards">
            <div className="info-card">Wind: {data.wind.speed} m/s</div>
            <div className="info-card">Pressure: {data.main.pressure} hPa</div>
            <div className="info-card"> Humidity: {data.main.humidity}%</div>
            <div className="info-card">Visibility: {data.visibility / 1000} km</div>
            <div className="info-card"> Dew Point: {Math.round(data.main.temp - ((100 - data.main.humidity) / 5))}°C</div>
            <div className="info-card">UV Index: Low</div>
          </div>
        </div>
      )}
      {forecast.length > 0 && (
        <div className="forecast">
          <h3>Daily Forecast</h3>
          <div className="forecast-cards">
            {forecast.map((day, index) => (
              <div className="forecast-card" key={index}>
                <p className="day">
                  {new Date(day.dt * 1000).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].main}
                />
                <p className="temp">
                  {Math.round(day.main.temp_min)}° / {Math.round(day.main.temp_max)}°
                </p>
                <p>{day.weather[0].main}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Weather
