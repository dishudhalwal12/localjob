"use client";

import { AuthPanel } from "@/components/AuthPanel";
import { useUserRole } from "@/hooks/useUserRole";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LoginPage() {
  const { role, loading } = useUserRole();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role) {
      router.push(role === "worker" ? "/dashboard" : "/find");
    }
  }, [role, loading, router]);

  if (loading) return null;

  return (
    <div className="bg-offwhite min-h-[calc(100vh-74px)] flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <AuthPanel onSuccess={() => {
          // onSuccess will be handled by the useEffect redirect
        }} />
      </div>
    </div>
  );
}
