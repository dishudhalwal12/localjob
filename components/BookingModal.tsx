"use client";

import { useEffect, useState } from "react";
import type { Worker, Package } from "@/types";
import { createBooking } from "@/lib/bookings";
import toast from "react-hot-toast";
import { subscribeToAuth } from "@/lib/auth";
import { AuthPanel } from "@/components/AuthPanel";

interface BookingModalProps {
  worker: Worker;
  onClose: () => void;
}

export function BookingModal({ worker, onClose }: BookingModalProps) {
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(
    worker.packages && worker.packages.length > 0 ? worker.packages[0] : null
  );
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("10:00 AM");
  const [address, setAddress] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const timeSlots = ["09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"];

  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleBooking = async () => {
    if (!date) {
      toast.error("Please select a date.");
      return;
    }

    if (!address.trim()) {
      toast.error("Please provide a service address.");
      return;
    }

    if (!currentUser) {
      toast.error("Please log in to book.");
      return;
    }

    setSubmitting(true);
    try {
      await createBooking({
        workerId: worker.userId,
        customerId: currentUser.uid,
        packageId: selectedPackage?.id,
        date: new Date(date),
        timeSlot,
        price: selectedPackage?.price || 0,
        address: address.trim(),
      });
      toast.success("Booking requested successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to create booking.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-[28px] bg-white p-8 shadow-2xl overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">
            {!currentUser ? "Log in to book" : `Book ${worker.name}`}
          </h2>
          <button onClick={onClose} className="text-muted hover:text-ink text-xl">✕</button>
        </div>

        {authLoading ? (
          <div className="py-20 text-center text-muted">Loading...</div>
        ) : !currentUser ? (
          <div className="mt-4">
            <AuthPanel onSuccess={() => toast.success("Signed in! You can now book.")} />
          </div>
        ) : (
          <div className="mt-6 space-y-6">
            {worker.packages && worker.packages.length > 0 && (
              <div>
                <label className="mb-2 block text-xs font-bold uppercase text-black/50">Select Package</label>
                <div className="space-y-2">
                  {worker.packages.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedPackage(pkg)}
                      className={`w-full rounded-xl border p-3 text-left transition ${
                        selectedPackage?.id === pkg.id ? "border-crimson bg-crimson/5 ring-1 ring-crimson" : "border-black/10 hover:border-black/20"
                      }`}
                    >
                      <div className="flex justify-between font-bold text-sm">
                        <span>{pkg.name}</span>
                        <span>₹{pkg.price}</span>
                      </div>
                      <p className="text-xs text-muted mt-1">{pkg.description}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-xs font-bold uppercase text-black/50">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-xl border border-black/10 p-3 text-sm outline-none focus:border-crimson"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs font-bold uppercase text-black/50">Time Slot</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full rounded-xl border border-black/10 p-3 text-sm outline-none focus:border-crimson"
                >
                  {timeSlots.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="mb-2 block text-xs font-bold uppercase text-black/50">Service Address</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter complete address where service is required"
                rows={2}
                className="w-full rounded-xl border border-black/10 p-3 text-sm outline-none focus:border-crimson"
              />
            </div>

            <button
              onClick={handleBooking}
              disabled={submitting}
              className="pill-button-primary w-full justify-center py-4"
            >
              {submitting ? "Processing..." : `Confirm Booking • ₹${selectedPackage?.price || 0}`}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
