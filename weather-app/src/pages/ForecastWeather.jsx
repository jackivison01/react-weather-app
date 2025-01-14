import React from "react";
import SearchBar from "../components/SearchBar";

export default function ForecastWeather() {
    const fetchForecast = async () => {
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
        <div>
            <SearchBar></SearchBar>
        </div>
    );
}