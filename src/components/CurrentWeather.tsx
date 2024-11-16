import type { GeocodeResponse, WeatherData } from "@/api/types";
import { Card, CardContent } from "./ui/card";

interface CurrentWeatherProps {
  data: WeatherData;
  locationName?: GeocodeResponse;
}

const CurrentWeather = ({ data, locationName }: CurrentWeatherProps) => {
  console.log(data);
  const {
    weather: [currentWeather],
    main: { temp, feels_like, temp_min, temp_max, humidity },
    wind: { speed },
  } = data;

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <div className="spsce-y-2">
                <div className="flex items-center">
                  <h2>{locationName?.name}</h2>
                  {locationName?.state && (
                    <span className="text-mu">{locationName?.state}</span>
                  )}
                </div>
                <p></p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default CurrentWeather;
