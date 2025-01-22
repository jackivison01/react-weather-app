import React, { useState } from "react";
import axios from 'axios';
import SearchBar from "../components/SearchBar";
import WeatherMessage from "../components/WeatherMessage";
import useForecastTemps from "../hooks/useForecastTemps";
import ForecastDisplay from "../components/ForecastDisplay";

export default function ForecastWeather() {
    const [forecast, setForecast] = useState(null);
    const [city, setCity] = useState('');
    const [error, setError] = useState('');
    const [weatherMessage, setWeatherMessage] = useState('');
    const [forecastTemps, processForecast] = useForecastTemps([]);
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [inputValue, setInputValue] = useState("");

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
            setInputValue("");
            setCity("");
            setFilteredSuggestions([]);
        } catch (err) {
            console.log(err.message)
            setForecast(null);
            setError('Enter a valid city');
        }
    };

    return (
        <div>
            <h1>Weather Forecast</h1>
            <SearchBar
                onSearch={fetchForecast}
                setCity={setCity}
                filteredSuggestions={filteredSuggestions}
                setFilteredSuggestions={setFilteredSuggestions}
                inputValue={inputValue}
                setInputValue={setInputValue}>
            </SearchBar>
            <div>
                <WeatherMessage weather={forecast} weatherMessage={weatherMessage} />
                <div className="forecast-temps" style={{ display: "flex", flexDirection: "row", gap: "10px" }}>
                    {forecastTemps.map((forecastObj, index) => (
                        <ForecastDisplay forecastObj={forecastObj} index={index} />
                    ))}
                </div>

            </div>
            <div className='error-message'>{error}</div>
        </div>
    );
}