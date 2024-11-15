import { Coordinates } from "@/api/types";
import { useEffect, useState } from "react";

interface Geolocationstate {
  coordinates: Coordinates | null;
  error: string | null;
  isLoading: boolean;
}
export function useGeoLocation() {
  const [locationData, setLocationData] = useState<Geolocationstate>({
    coordinates: null,
    error: null,
    isLoading: true,
  });
  const getLocation = () => {
    setLocationData((prev) => ({ ...prev, isLoading: true, error: null }));
    if (!navigator.geolocation) {
      setLocationData({
        coordinates: null,
        error: "Geolocation is not Supported by your browser",
        isLoading: false,
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocationData({
          coordinates: {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        });
      },
      (error) => {
        let errorMessage: string;
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "Location Permission is Denied , Please Accept Location Persmission";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location is Unavailable , Please Try Again";
            break;
          case error.TIMEOUT:
            errorMessage = "Location Request timeout";
            break;
          default:
            errorMessage = "Unknown Error Encountered";
            break;
        }
        setLocationData({
          coordinates: null,
          error: errorMessage,
          isLoading: false,
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return {
    ...locationData,
    getLocation,
  };
}
