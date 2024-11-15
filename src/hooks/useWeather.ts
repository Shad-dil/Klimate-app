import { Coordinates } from "@/api/types";
import { weatherAPI } from "@/api/weather";
import { useQuery } from "@tanstack/react-query";

export const WEATHER_KEY = {
  weather: (coords: Coordinates) => ["weather", coords],
  forecast: (coords: Coordinates) => ["forecast", coords],
  location: (coords: Coordinates) => ["location", coords],
} as const;

export function useForecastQuery(coordinates: Coordinates) {
  const { data, error, isLoading } = useQuery({
    queryKey: WEATHER_KEY.forecast(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () => (coordinates ? weatherAPI.getForecast(coordinates) : null),
    enabled: !!coordinates,
  });
  return { data, isLoading, error };
}

export function useWeatherQuery(coordinates: Coordinates) {
  const { data, error, isLoading } = useQuery({
    queryKey: WEATHER_KEY.weather(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.getCurrentWeather(coordinates) : null,
    enabled: !!coordinates,
  });
  return { data, isLoading, error };
}

export function useReverseGeoQuery(coordinates: Coordinates) {
  const { data, error, isLoading } = useQuery({
    queryKey: WEATHER_KEY.location(coordinates ?? { lat: 0, lon: 0 }),
    queryFn: () =>
      coordinates ? weatherAPI.reverseGeocode(coordinates) : null,
    enabled: !!coordinates,
  });
  return { data, isLoading, error };
}
