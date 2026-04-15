"use client";

import { useEffect, useState } from "react";
import { getWorkers } from "@/lib/workers";
import type { Worker, WorkerSkillFilter } from "@/types";

interface UseWorkersOptions {
  search?: string;
  skill?: WorkerSkillFilter;
  limitCount?: number;
}

export function useWorkers({
  search = "",
  skill = "All",
  limitCount,
}: UseWorkersOptions = {}) {
  const [allWorkers, setAllWorkers] = useState<Worker[]>([]);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [search]);

  useEffect(() => {
    let active = true;

    setLoading(true);

    const loadWorkers = async () => {
      try {
        const nextWorkers = await getWorkers(limitCount, skill);

        if (!active) {
          return;
        }

        setAllWorkers(nextWorkers);
        setError(null);
      } catch (loadError) {
        if (!active) {
          return;
        }

        setAllWorkers([]);
        setError(loadError instanceof Error ? loadError.message : "Unable to load workers.");
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void loadWorkers();

    return () => {
      active = false;
    };
  }, [limitCount, skill]);

  useEffect(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    const filteredWorkers = allWorkers.filter((worker) => {
      const searchableArea = `${worker.area} ${worker.city}`.toLowerCase();
      const matchesArea = !normalizedSearch || searchableArea.includes(normalizedSearch);

      return matchesArea;
    });

    setWorkers(filteredWorkers);
  }, [allWorkers, debouncedSearch]);

  return {
    workers,
    loading,
    error,
  };
}
