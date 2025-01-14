export default function WeatherMessage({ weather, weatherMessage }) {
  return (
    <>
      {weather ? (<div>{weatherMessage}</div>) : (<div>Press Search</div>)}
    </>
  )
}