export default function WeatherTemperature({ weather }) {
  return (
    <>
      {weather ? (<div>{weather.current.temp_c}{"\u00B0"}</div>) : (<div></div>)}
    </>
  )
}