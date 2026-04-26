import { useEffect, useState } from "react";
import { getWorkers } from "@/lib/workers";
import type { Worker, WorkerSkillFilter } from "@/types";
import { calculateDistance, getCurrentLocation, type Coordinates } from "@/lib/geo";

interface UseWorkersOptions {
  search?: string;
  skill?: WorkerSkillFilter;
  limitCount?: number;
  sortByDistance?: boolean;
}

export function useWorkers({
  search = "",
  skill = "All",
  limitCount,
  sortByDistance = false,
}: UseWorkersOptions = {}) {
  const [allWorkers, setAllWorkers] = useState<Worker[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => window.clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (sortByDistance && !userLocation) {
      getCurrentLocation()
        .then(setUserLocation)
        .catch(() => setError("Permission denied for location."));
    }
  }, [sortByDistance, userLocation]);

  useEffect(() => {
    let active = true;
    setLoading(true);
    const loadWorkers = async () => {
      try {
        const nextWorkers = await getWorkers(limitCount, skill);
        if (!active) return;
        setAllWorkers(nextWorkers);
        setError(null);
      } catch (loadError) {
        if (!active) return;
        setAllWorkers([]);
        setError(loadError instanceof Error ? loadError.message : "Unable to load workers.");
      } finally {
        if (active) setLoading(false);
      }
    };
    void loadWorkers();
    return () => { active = false; };
  }, [limitCount, skill]);

  useEffect(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();
    let filtered = allWorkers.filter((worker) => {
      const searchableArea = `${worker.area} ${worker.city}`.toLowerCase();
      return !normalizedSearch || searchableArea.includes(normalizedSearch);
    });

    if (sortByDistance && userLocation) {
      filtered = [...filtered].sort((a, b) => {
        if (!a.location || !b.location) return 0;
        const distA = calculateDistance(userLocation, a.location);
        const distB = calculateDistance(userLocation, b.location);
        return distA - distB;
      });
    }

    setWorkers(filtered);
  }, [allWorkers, debouncedSearch, sortByDistance, userLocation]);

  return { workers, loading, error, userLocation };
}
