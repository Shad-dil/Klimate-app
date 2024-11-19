import { useFavorite } from "@/hooks/useFavorite";
import { Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "./ui/button";

const FavoriteButton = ({ data }) => {
  const { addToFavorite, removeFavorite, isFavorite } = useFavorite();
  const isCurrentlyFav = isFavorite(data.coord.lat, data.coord.lon);
  const handleToogleFAvorite = () => {
    if (isCurrentlyFav) {
      // Call removeFavorite without trying to evaluate its return value
      removeFavorite.mutate(`${data.coord.lat}-${data.coord.lon}`);
      toast.error(`Remove ${data.name} From Favorites`);
    } else {
      // Call addToFavorite without trying to evaluate its return value
      addToFavorite.mutate({
        name: data.name,
        lat: data.coord.lat,
        lon: data.coord.lon,
        country: data.sys.country,
      });
      toast.success(` Added ${data.name} to Favorites`);
    }
  };
  return (
    <>
      <Button
        variant={isCurrentlyFav ? "default" : "outline"}
        size={"icon"}
        onClick={handleToogleFAvorite}
        className={isCurrentlyFav ? "bg-yellow-500 hover:bg-yellow-600" : ""}
      >
        <Star className={`h-4 w-4 ${isCurrentlyFav ? "fill-current" : ""}`} />
      </Button>
    </>
  );
};

export default FavoriteButton;
