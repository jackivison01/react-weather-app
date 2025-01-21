import Icon from "./Icon"

export default function ForecastDisplay({ forecastObj, index }) {
  return (
    <div
      key={index}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
        padding: "5px 10px",
        border: "1px solid #ccc",
      }}
    >
      <Icon icon={forecastObj.icon} />
      <div style={{ fontSize: "16px" }}>
        {forecastObj.time}:00
      </div>
      <div style={{ fontSize: "16px" }}>
        {forecastObj.temp}°
      </div>
    </div>
  )

}