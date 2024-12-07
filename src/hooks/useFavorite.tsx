import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

interface favoriteCity {
  id: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  addedAt: number;
}

export function useFavorite() {
  const newQueryClient = useQueryClient();
  const [favorites, setFavorites] = useLocalStorage<favoriteCity[]>(
    "favorite",
    [] // This is correctly inferred as SearchHistoryItem[]
  );

  const favoriteQuery = useQuery({
    queryKey: ["favorite"],
    queryFn: () => favorites,
    initialData: favorites,
    staleTime: Infinity,
  });

  const addToFavorite = useMutation({
    mutationFn: async (
      city: Omit<favoriteCity, "id" | "addedAt">
    ): Promise<favoriteCity[]> => {
      const newFavorite = {
        ...city,
        id: `${city.lat}-${city.lon}`,
        addedAt: Date.now(),
      };
      const exists = favorites.some((fav) => fav.id === newFavorite.id);
      if (exists) return favorites;
      const newFavorites = [...favorites, newFavorite].slice(0, 10);
      setFavorites(newFavorites);
      return newFavorites; // Return the new history
    },
    onSuccess: () => {
      newQueryClient.invalidateQueries({
        queryKey: ["favorite"],
      });
    },
  });

  const removeFavorite = useMutation({
    mutationFn: async (cityId: string) => {
      const newFavorites = favorites.filter((city) => city.id !== cityId);
      setFavorites(newFavorites);
      return newFavorites;
    },
    onSuccess: () => {
      newQueryClient.invalidateQueries({
        queryKey: ["favorite"],
      });
    },
  });

  return {
    favorites: favoriteQuery.data ?? [],
    addToFavorite,
    removeFavorite,
    isFavorite: (lat: number, lon: number) => {
      return favorites.some((city) => city.lat === lat && city.lon === lon);
    },
  };
}
