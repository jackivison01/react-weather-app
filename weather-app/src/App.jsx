import React, { useState } from 'react';
import axios from 'axios';

function SearchBar({ onSearch, setCity }) {
  const handleChange = (event) => {
    setCity(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSearch();
    };
  };

  return (
    <>
      <input
        placeholder='Enter a city:'
        onChange={handleChange}
        onKeyDown={handleKeyPress}>
      </input>
      <button onClick={onSearch}>Search</button>
    </>
  )
}

function WeatherMessage({ weather, weatherMessage }) {
  return (
    <>
      {weather ? (<div>{weatherMessage}</div>) : (<div>Press Search</div>)}
    </>
  )
}

function WeatherIcon({ weather }) {
  return (
    <>
      {weather ? (
        <img src={weather.current.condition.icon} alt="Weather Icon"></img>
      ) :
        (<></>)}
    </>
  )
}

function WeatherTemperature({ weather }) {
  return (
    <>
      {weather ? (<div>{weather.current.temp_c}{"\u00B0"}</div>) : (<div></div>)}
    </>
  )
}

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');
  const [validCity, setValidCity] = useState('');
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
      setValidCity(city);
      setError('');
    } catch (err) {
      setWeather(null);
      setError('Enter a valid city');
    }
  };

  return (
    <>
      <div>
        <SearchBar onSearch={fetchWeather} setCity={setCity}></SearchBar>
      </div>
      <div>
        <WeatherIcon weather={weather}></WeatherIcon>
      </div>
      <div>
        <WeatherTemperature weather={weather}></WeatherTemperature>
      </div>
      <div>
        <WeatherMessage weather={weather} weatherMessage={weatherMessage}></WeatherMessage>
      </div>
      <div>{error}</div>
    </>
  )
}