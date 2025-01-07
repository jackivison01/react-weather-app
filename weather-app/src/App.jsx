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
      <div>{weather.current.temp_c}</div>
      {console.log(weather.current.temp_c)}
      <button onClick={fetchWeather}>Get weather</button>
    </>
  )
}