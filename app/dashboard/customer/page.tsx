"use client";

import { useEffect, useState } from "react";
import { subscribeToAuth } from "@/lib/auth";
import { getCustomerBookings } from "@/lib/bookings";
import { getWorkerById } from "@/lib/workers";
import type { Booking, Worker } from "@/types";
import Link from "next/link";

export default function CustomerDashboard() {
  const [bookings, setBookings] = useState<(Booking & { worker?: Worker })[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const unsubscribe = subscribeToAuth(async (authUser) => {
      setUser(authUser);
      if (authUser) {
        try {
          const customerBookings = await getCustomerBookings(authUser.uid);
          
          // Fetch worker details for each booking
          const enrichedBookings = await Promise.all(
            customerBookings.map(async (b) => {
              try {
                const worker = await getWorkerById(b.workerId);
                return { ...b, worker: worker || undefined };
              } catch (e) {
                return { ...b, worker: undefined };
              }
            })
          );
          
          setBookings(enrichedBookings.sort((a, b) => {
            const timeA = a.createdAt?.toMillis() || 0;
            const timeB = b.createdAt?.toMillis() || 0;
            return timeB - timeA;
          }));
        } catch (error) {
          console.error("Dashboard error:", error);
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div className="p-10 text-center text-muted">Loading your dashboard...</div>;
  if (!user) return <div className="p-10 text-center">Please log in to view your dashboard.</div>;

  return (
    <div className="mx-auto max-w-4xl p-6">
      <header className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Bookings</h1>
          <p className="text-muted text-sm mt-1">Track and manage your service requests</p>
        </div>
        <Link href="/find" className="pill-button-primary">Find More Workers</Link>
      </header>

      <div className="space-y-4">
        {bookings.map((booking) => (
          <div key={booking.id} className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex gap-4">
              <div className="h-16 w-16 rounded-2xl bg-[#f7f3ef] flex items-center justify-center text-2xl">
                {booking.worker?.name?.charAt(0) || "W"}
              </div>
              <div>
                <h3 className="font-bold text-lg">{booking.worker?.name || "Service Worker"}</h3>
                <p className="text-sm text-crimson font-medium">{booking.worker?.skill}</p>
                <p className="text-xs text-muted mt-1">
                  {booking.date?.toDate().toLocaleDateString()} at {booking.timeSlot}
                </p>
              </div>
            </div>

            <div className="flex flex-row sm:flex-col justify-between sm:items-end">
              <div className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${
                booking.status === "completed" ? "bg-green-100 text-green-700" :
                booking.status === "cancelled" ? "bg-red-100 text-red-700" :
                "bg-blue-100 text-blue-700"
              }`}>
                {booking.status}
              </div>
              <div className="text-lg font-bold mt-auto">₹{booking.price}</div>
            </div>
          </div>
        ))}

        {bookings.length === 0 && (
          <div className="rounded-[32px] border border-dashed border-black/15 py-20 text-center">
            <p className="text-muted italic">You haven't booked any services yet.</p>
            <Link href="/find" className="mt-4 inline-block text-crimson font-bold hover:underline">
              Browse skilled workers near you
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
