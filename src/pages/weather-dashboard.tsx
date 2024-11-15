import WeatherSkeleton from "@/components/loading-skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/useGeolocation";
import { useReverseGeoQuery } from "@/hooks/useWeather";
import { MapPin, RefreshCw, Terminal } from "lucide-react";

const WeatherDashboard = () => {
  const {
    coordinates,
    error: locationError,
    getLocation,
    isLoading: locationLoading,
  } = useGeoLocation();

  const handleRefresh = () => {
    getLocation();
    if (coordinates) {
      // Reload Data
    }
  };

  const locationQuery = useReverseGeoQuery(coordinates);
  console.log(locationQuery);

  if (locationLoading) {
    return <WeatherSkeleton />;
  }
  if (locationError) {
    return (
      <Alert variant={"destructive"}>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Location Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p> {locationError}</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (!coordinates) {
    return (
      <Alert variant={"destructive"}>
        <AlertTitle>Location Required</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p> Please Allow Location , to see your local Weather!</p>
          <Button onClick={getLocation} variant={"outline"} className="w-fit">
            <MapPin className="mr-2 h-4 w-4" />
            Enable Location
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="space-y-4">
        {/* Favorite Cities  */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold tracking-tight">My Location</h1>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={handleRefresh}
            // disabled={false}
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default WeatherDashboard;
