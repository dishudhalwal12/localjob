"use client";

import { useEffect, useState } from "react";
import { subscribeToDemoAuth, type DemoUser } from "@/lib/demo-auth";

export function useDemoAuth() {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToDemoAuth((nextUser) => {
      setUser(nextUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
  };
}
