import React, { useState } from 'react';
import axios from 'axios';

export default function WeatherApp() {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('London');

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
    } catch (err) {
      setWeather(null);
    }
  };

  return (
    <>
      <div>
        <input></input>
        <button onClick={fetchWeather}>Search</button>
      </div>
      {weather ? (
        <div>Temp in {city} is: {weather.current.temp_c}</div>) : (<div>Press button</div>)
      }
      {weather ? console.log(weather.current.uv) : console.log("")}
    </>
  )
}