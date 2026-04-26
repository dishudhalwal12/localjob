"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { subscribeToAuth } from "@/lib/auth";
import { getUserProfile } from "@/lib/users";
import { getWorkerByUserId } from "@/lib/workers";
import type { UserRole, Worker } from "@/types";

interface UserContextType {
  role: UserRole | null;
  workerProfile: Worker | null;
  loading: boolean;
  userId: string | null;
  refreshWorker: () => Promise<void>;
}

const UserContext = createContext<UserContextType>({
  role: null,
  workerProfile: null,
  loading: true,
  userId: null,
  refreshWorker: async () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole | null>(null);
  const [workerProfile, setWorkerProfile] = useState<Worker | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchWorker = async (uid: string) => {
    try {
      const worker = await getWorkerByUserId(uid);
      setWorkerProfile(worker);
    } catch (e) {
      console.error("Worker fetch error:", e);
    }
  };

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (user) => {
      if (user) {
        setUserId(user.uid);
        const profile = await getUserProfile(user.uid);
        const userRole = profile?.role ?? "customer";
        setRole(userRole);
        
        if (userRole === "worker") {
          await fetchWorker(user.uid);
        }
      } else {
        setUserId(null);
        setRole(null);
        setWorkerProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshWorker = async () => {
    if (userId) await fetchWorker(userId);
  };

  return (
    <UserContext.Provider value={{ role, workerProfile, loading, userId, refreshWorker }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
