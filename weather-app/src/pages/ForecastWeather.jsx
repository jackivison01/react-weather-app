import React, { useState } from "react";
import SearchBar from "../components/SearchBar";
import WeatherMessage from "../components/WeatherMessage";

export default function ForecastWeather() {
    const [forecast, setForecast] = useState(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [weatherMessage, setWeatherMessage] = useState('');

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
            setForecast(response.data.forecast.forecastday);

            const location = response.data.location
            const msg = `${location.name}, ${location.country}`;
            setWeatherMessage(msg);
            setError('');
        } catch (err) {
            setForecast(null);
            setError('Enter a valid city');
        }
    };

    return (
        <div>
            <SearchBar onSearch={fetchForecast} setCity={setCity}></SearchBar>
            <div>
                <WeatherMessage weather={forecast} weatherMessage={weatherMessage} />
            </div>
            <div className='error-message'>{error}</div>
        </div>
    );
}