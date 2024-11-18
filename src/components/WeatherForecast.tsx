import type { ForecastData } from "@/api/types";
interface weatherForecastProps {
  data: ForecastData;
}

const WeatherForecast = ({ data }: weatherForecastProps) => {
  return <div>WeatherForecast</div>;
};

export default WeatherForecast;
