"use client";

import { useEffect, useState } from "react";
import { subscribeToWorkers } from "@/lib/workers";
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
    const unsubscribe = subscribeToWorkers(
      (nextWorkers) => {
        setAllWorkers(nextWorkers);
        setLoading(false);
        setError(null);
      },
      (subscriptionError) => {
        setLoading(false);
        setError(subscriptionError.message);
      },
      limitCount,
    );

    return () => {
      unsubscribe();
    };
  }, [limitCount]);

  useEffect(() => {
    const normalizedSearch = debouncedSearch.trim().toLowerCase();

    const filteredWorkers = allWorkers.filter((worker) => {
      const matchesSkill = skill === "All" || worker.skill === skill;
      const matchesArea =
        !normalizedSearch || worker.area.toLowerCase().includes(normalizedSearch);

      return matchesSkill && matchesArea;
    });

    setWorkers(filteredWorkers);
  }, [allWorkers, debouncedSearch, skill]);

  return {
    workers,
    loading,
    error,
  };
}
