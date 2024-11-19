import { useSearchHistory } from "@/hooks/useSearchHistory";
import { useLocationSearch } from "@/hooks/useWeather";
import { format } from "date-fns";
import { Clock, Loader2, Search, XCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";

const CitySearch = () => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { data: locations, isLoading } = useLocationSearch(query);
  const { history, addToHistory, clearHistory } = useSearchHistory();

  const handleSelect = (cityData: string) => {
    const [lat, lon, name, country] = cityData.split("|");

    //Add to search History
    addToHistory.mutate({
      query,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
      name,
    });
    setOpen(false);
    navigate(`city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        variant={"outline"}
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-4- lg:w-64"
      >
        <Search className="mr-2 h-4 w-4" />
        Seacrh cities...
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          placeholder="search cities ..."
          value={query}
          onValueChange={setQuery}
        />
        <CommandList>
          {query.length > 2 && !isLoading && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
          {/* <CommandGroup heading="Favorites">
            <CommandItem>Calendar</CommandItem>
          </CommandGroup> */}

          {history.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup heading="Recent Search">
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-muted-foreground text-xs">Recent Search</p>
                  <Button
                    variant={"ghost"}
                    onClick={() => clearHistory.mutate()}
                    size="sm"
                  >
                    <XCircle className="h-4 w-4" />
                    Clear
                  </Button>
                </div>
                {history.map((location) => {
                  return (
                    <>
                      <CommandItem
                        key={`${location.lat}-${location.lon}`}
                        value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                        onSelect={handleSelect}
                      >
                        <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{location.name}</span>
                        {location?.state && (
                          <span className="text-sm text-muted-foreground">
                            {location.state}
                          </span>
                        )}
                        <span className="text-sm text-muted-foreground">
                          {location.country}
                        </span>
                        <span className="ml-auto text-xs  text-muted-foreground">
                          {format(location.searchedAt, "MMM d, h:mm a")}
                        </span>
                      </CommandItem>
                    </>
                  );
                })}
              </CommandGroup>
            </>
          )}
          <CommandSeparator />
          {locations && locations?.length > 0 && (
            <CommandGroup heading="Suggestions">
              {isLoading && (
                <div className="flex items-center justify-center p-4">
                  <Loader2 className="h-4 w-4 animate-spin" />
                </div>
              )}
              {locations.map((location) => {
                return (
                  <CommandItem
                    key={`${location.lat}-${location.lon}`}
                    value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                    onSelect={handleSelect}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    <span>{location.name}</span>
                    {location?.state && (
                      <span className="text-sm text-muted-foreground">
                        {location.state}
                      </span>
                    )}
                    <span className="text-sm text-muted-foreground">
                      {location.country}
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
