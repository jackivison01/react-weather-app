import React, { useState } from "react";
import axios from 'axios';
import SearchBar from "../components/SearchBar";
import WeatherMessage from "../components/WeatherMessage";

export default function ForecastWeather() {
    const [forecast, setForecast] = useState(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [weatherMessage, setWeatherMessage] = useState('');
    const [forecastTemps, setForecastTemps] = useState([]);

    const processForecast = (forecastData) => {
        const tempForecastTemps = [];
        const hour = new Date().getHours();
        for (let i = hour; i <= hour + 6; i++) {
            const forecastObject = {
                time: i,
                temp: forecastData[0].hour[i].temp_c
            }
            tempForecastTemps.push(forecastObject);
        }
        setForecastTemps(tempForecastTemps);
    }

    const fetchForecast = async () => {
        try {
            const API_KEY = import.meta.env.VITE_APP_WEATHER_API_KEY;
            const response = await axios.get(
                `https://api.weatherapi.com/v1/forecast.json`,
                {
                    params: {
                        key: API_KEY,
                        q: city,
                    },
                }
            );
            const forecastData = response.data.forecast.forecastday;
            setForecast(forecastData);

            processForecast(forecastData);

            const location = response.data.location
            const msg = `${location.name}, ${location.country}`;
            setWeatherMessage(msg);
            setError('');
        } catch (err) {
            console.log(err.message)
            setForecast(null);
            setError('Enter a valid city');
        }
    };

    return (
        <div>
            <SearchBar onSearch={fetchForecast} setCity={setCity}></SearchBar>
            <div>
                <WeatherMessage weather={forecast} weatherMessage={weatherMessage} />
                <div className='forecast-temps'>
                    {forecastTemps.map((forecastObj, index) => (
                        <div key={index} className='forecast-temp'>{forecastObj.time}: {forecastObj.temp}°</div>
                    ))}
                </div>
            </div>
            <div className='error-message'>{error}</div>
        </div>
    );
}