import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./useLocalStorage";

interface SearchHistoryItem {
  id: string;
  query: string;
  lat: number;
  lon: number;
  name: string;
  country: string;
  state?: string;
  searchedAt: number;
}

export function useSearchHistory() {
  const newQueryClient = useQueryClient();
  const [history, setHistory] = useLocalStorage<SearchHistoryItem[]>(
    "search-history",
    [] // This is correctly inferred as SearchHistoryItem[]
  );

  const historyQuery = useQuery({
    queryKey: ["search-history"],
    queryFn: () => history,
    initialData: history,
  });

  const addToHistory = useMutation({
    mutationFn: async (
      search: Omit<SearchHistoryItem, "id" | "searchedAt">
    ): Promise<SearchHistoryItem[]> => {
      const newSearch = {
        ...search,
        id: `${search.lat}-${search.lon}-${Date.now()}`,
        searchedAt: Date.now(),
      };
      const filteredHistory = history.filter(
        (item) => !(item.lat === search.lat && item.lon === search.lon)
      );
      const newHistory = [newSearch, ...filteredHistory].slice(0, 10);
      setHistory(newHistory);
      return newHistory; // Return the new history
    },
    onSuccess: (newHistory) => {
      newQueryClient.setQueryData(["search-history"], newHistory);
    },
  });

  const clearHistory = useMutation({
    mutationFn: async () => {
      setHistory([]);
      return [];
    },
    onSuccess: () => {
      newQueryClient.setQueryData(["search-history"], []);
    },
  });

  return {
    history: historyQuery.data ?? [],
    addToHistory,
    clearHistory,
  };
}
