export default function WeatherMessage({ weather, weatherMessage }) {
  return (
    <>
      {weather ? (<div style={{ paddingBottom: "10px" }}>{weatherMessage}</div>) : (<></>)}
    </>
  )
}