// src/WeatherApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = '3a025f10f908f6e20e33e01afa73c32b';
const API_URL = `https://api.openweathermap.org/data/2.5/weather`;

function WeatherApp() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');

  useEffect(() => {
    if (city) {
      axios
        .get(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`)
        .then(response => {
          console.log(response.data); // Add this line to check the response data
          setWeatherData(response.data);
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
        });
    }
  }, [city]);
  

  return (
    <div className="container">
      <h1 className="weather-header">Weather App</h1>
      <div className="input-container">
        <input
          className="input-field"
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={e => setCity(e.target.value)}
        />
      </div>
      {weatherData && (
        <div className="weather-container">
          <h2 className="weather-header">
            Weather in {weatherData.name}, {weatherData.sys.country}
          </h2>
          <p className="weather-data">Temperature: {weatherData.main.temp}°C</p>
          <p className="weather-data">Weather: {weatherData.weather[0].description}</p>
          <p className="weather-data">Humidity: {weatherData.main.humidity}%</p>
          <p className="weather-description">
            Enjoy the {weatherData.weather[0].description} day!
          </p>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
