import { useState, useEffect } from "react";
import { subscribeToAuth } from "@/lib/auth";
import { getUserProfile } from "@/lib/users";
import type { UserRole } from "@/types";

export function useUserRole() {
  const [role, setRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (user) => {
      if (user) {
        const profile = await getUserProfile(user.uid);
        setRole(profile?.role ?? "customer");
      } else {
        setRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { role, loading };
}
