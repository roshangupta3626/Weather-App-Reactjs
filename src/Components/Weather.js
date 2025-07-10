import React, { useState } from 'react';
import './Weather.css';
import { FaSearch, FaWind } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';
import { WiHumidity } from 'react-icons/wi';

const Weather = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState();
  const [error, setError] = useState('');

  const API_KEY = '5acc1683650652bab831ecf7d57fd397';

  const handleOnChange = (event) => {
    setCity(event.target.value);
  };

  const fetchData = async () => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    try {
      const response = await fetch(url);
      const output = await response.json();
      if (response.ok) {
        setWeather(output);
        setError('');
      } else {
        setError('No data found. Please enter a valid city name.');
      }
    } catch (error) {
      setError('Something went wrong. Try again.');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <div className="container">
      {/* Header */}
      <header className="weather-header">
        <h1>🌤️ Weather Info by <span className="highlight">Roshan</span></h1>
        <p className="sub-text">Check real-time weather updates in any city</p>
      </header>

      {/* Search */}
      <form onSubmit={handleSubmit} className="city">
        <input
          type="text"
          value={city}
          onChange={handleOnChange}
          placeholder="Enter city name"
        />
        <button type="submit">
          <FaSearch />
        </button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {/* Weather Info */}
      {weather && weather.weather && (
        <div className="content">
          <div className="weather-image">
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
              alt={weather.weather[0].description}
            />
            <h3 className="desc">{weather.weather[0].description}</h3>
          </div>

          <div className="weather-temp">{weather.main.temp}°C</div>

          <div className="weather-city">
            <MdLocationOn size={24} />
            {weather.name}, {weather.sys.country}
          </div>

          <div className="weather-stats">
            <div className="stat-box">
              <h3><FaWind /> Wind</h3>
              <span>{weather.wind.speed} km/h</span>
            </div>
            <div className="stat-box">
              <h3><WiHumidity /> Humidity</h3>
              <span>{weather.main.humidity}%</span>
            </div>
            <div className="stat-box">
              <h3>Clouds</h3>
              <span>{weather.clouds.all}%</span>
            </div>
            <div className="stat-box">
              <h3>Feels Like</h3>
              <span>{weather.main.feels_like}°C</span>
            </div>
          </div>

          <div className="weather-extra">
            <div>Pressure: {weather.main.pressure} hPa</div>
            <div>Visibility: {(weather.visibility / 1000).toFixed(1)} km</div>
            <div>Sunrise: {new Date(weather.sys.sunrise * 1000).toLocaleTimeString()}</div>
            <div>Sunset: {new Date(weather.sys.sunset * 1000).toLocaleTimeString()}</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
