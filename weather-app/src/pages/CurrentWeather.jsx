import React, { useState } from 'react';
import axios from 'axios';
import './App.css';
import SearchBar from '../components/SearchBar';
import WeatherMessage from '../components/WeatherMessage';
import Icon from '../components/Icon';
import WeatherTemperature from '../components/WeatherTemperature';

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [weatherMessage, setWeatherMessage] = useState('');

  const fetchWeather = async () => {
    try {
      const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json`,
        {
          params: {
            key: API_KEY,
            q: city,
          },
        }
      );
      setWeather(response.data);

      const location = response.data.location
      const msg = `${location.name}, ${location.country}`;
      setWeatherMessage(msg);
      setError('');
    } catch (err) {
      setWeather(null);
      setError('Enter a valid city');
    }
  };

  return (
    <div className='weather-app'>
      <h1>Current Weather</h1>
      <div>
        <SearchBar onSearch={fetchWeather} setCity={setCity}></SearchBar>
      </div>
      <div>
        {weather ? (<Icon icon={weather.current.condition.icon} />) : (<></>)}
      </div>
      <div>
        <WeatherTemperature weather={weather} />
      </div>
      <div>
        <WeatherMessage weather={weather} weatherMessage={weatherMessage} />
      </div>
      <div className='error-message'>{error}</div>
    </div>
  )
}