"use client";

import { useEffect, useState } from "react";
import { getWorkers, updateWorkerApprovalStatus } from "@/lib/workers";
import type { Worker } from "@/types";
import { useUserRole } from "@/hooks/useUserRole";
import toast from "react-hot-toast";

export default function AdminPage() {
  const { role, loading: roleLoading } = useUserRole();
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role === "admin") {
      fetchPendingWorkers();
    }
  }, [role]);

  const fetchPendingWorkers = async () => {
    try {
      // Fetch all workers (including unapproved ones)
      const allWorkers = await getWorkers(undefined, "All", true);
      setWorkers(allWorkers);
    } catch (error) {
      toast.error("Failed to fetch workers.");
    } finally {
      setLoading(false);
    }
  };

  const handleApproval = async (id: string, status: "approved" | "rejected") => {
    try {
      await updateWorkerApprovalStatus(id, status);
      toast.success(`Worker ${status} successfully.`);
      fetchPendingWorkers();
    } catch (error) {
      toast.error("Failed to update status.");
    }
  };

  if (roleLoading) return <div className="p-10 text-center">Checking permissions...</div>;
  if (role !== "admin") return <div className="p-10 text-center">Unauthorized. Admins only.</div>;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <h1 className="mb-8 text-3xl font-bold">Admin Dashboard</h1>
      
      <div className="rounded-2xl border border-black/10 bg-white shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#f7f3ef] text-sm font-semibold text-black/60">
              <th className="p-4">Name</th>
              <th className="p-4">Skill</th>
              <th className="p-4">City</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {workers.map((worker) => (
              <tr key={worker.id} className="text-sm">
                <td className="p-4 font-medium">{worker.name}</td>
                <td className="p-4">{worker.skill}</td>
                <td className="p-4">{worker.city}</td>
                <td className="p-4">
                  <span className={`rounded-full px-2 py-1 text-xs font-semibold ${
                    worker.approvalStatus === "approved" ? "bg-green-100 text-green-700" :
                    worker.approvalStatus === "rejected" ? "bg-red-100 text-red-700" :
                    "bg-yellow-100 text-yellow-700"
                  }`}>
                    {worker.approvalStatus}
                  </span>
                </td>
                <td className="p-4 text-right space-x-2">
                  {worker.approvalStatus !== "approved" && (
                    <button 
                      onClick={() => handleApproval(worker.id, "approved")}
                      className="text-green-600 hover:underline"
                    >
                      Approve
                    </button>
                  )}
                  {worker.approvalStatus !== "rejected" && (
                    <button 
                      onClick={() => handleApproval(worker.id, "rejected")}
                      className="text-red-600 hover:underline"
                    >
                      Reject
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {workers.length === 0 && !loading && (
              <tr>
                <td colSpan={5} className="p-10 text-center text-muted">No workers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
