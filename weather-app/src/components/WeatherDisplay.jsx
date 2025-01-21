import Icon from "./Icon";
import SearchBar from "./SearchBar";
import WeatherTemperature from "./WeatherTemperature";
import WeatherMessage from "./WeatherMessage";

export default function WeatherDisplay({ weather, fetchWeather, setCity, error, weatherMessage }) {
  return (
    <>
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
    </>
  )
}