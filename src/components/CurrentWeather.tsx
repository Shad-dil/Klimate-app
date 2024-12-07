import type { GeocodeResponse, WeatherData } from "@/api/types";
import { ArrowBigDown, ArrowUp, Droplet, Wind } from "lucide-react";
import { Card, CardContent } from "./ui/card";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodeResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  console.log(data);
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, humidity },
    wind: { speed },
  } = data;
  const formatTemp = (temp: number) => `${Math.round(temp)}°`;
  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="flex items-center">
                <h2 className="text-2xl font-bold tracking-tighter">
                  {locationName?.name}
                </h2>
                {locationName?.state && (
                  <span className="text-muted-foreground mx-2">
                    {locationName?.state}
                  </span>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {locationName?.country}
              </p>
              <div className="flex items-center gap-2">
                <p className="text-7xl font-bold tracking-tighter">
                  {formatTemp(temp)}
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-medium text-muted-foreground">
                    Feels Like {formatTemp(feels_like)}
                  </p>
                  <div className="flex gap-2 text-sm font-medium">
                    <span className="flex gap-1 items-center text-blue-500">
                      <ArrowBigDown className="h-3 w-3" />
                      {formatTemp(temp_min)}
                    </span>
                    <span className="flex gap-1 items-center text-red-500">
                      <ArrowUp className="h-3 w-3" />
                      {formatTemp(temp_min)}
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Droplet className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5 ">
                    <p className="text-sm font-medium">Humidity</p>
                    <p className="text-muted-foreground text-sm">{humidity}%</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-blue-500" />
                  <div className="space-y-0.5 ">
                    <p className="text-sm font-medium">Wind Speed</p>
                    <p className="text-muted-foreground text-sm">{speed} m/s</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center flex-col">
              <div className="relative flex items-center justify-center aspect-square max-w-[200px]">
                <img
                  src={`https://openweathermap.org/img/wn/${currentWeather.icon}@4x.png`}
                  alt={currentWeather.description}
                  className="h-full w-full object-contain"
                />
                <div className="absolute bottom-0 text-center">
                  <p className="text-sm font-medium capitalize">
                    {currentWeather.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CurrentWeather;
