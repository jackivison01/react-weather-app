import { useState } from "react";

export default function useForecastTemps() {
  const [forecastTemps, setForecastTemps] = useState([]);

  const processForecast = (forecastData) => {
    const tempForecastTemps = [];
    const hour = new Date().getHours();
    for (let i = hour; i <= hour + 6; i++) {
      const forecastObject = {
        time: i,
        temp: forecastData[0].hour[i].temp_c,
        icon: forecastData[0].hour[i].condition.icon,
      };
      tempForecastTemps.push(forecastObject);
    }
    setForecastTemps(tempForecastTemps);
  };

  return [forecastTemps, processForecast];
}
