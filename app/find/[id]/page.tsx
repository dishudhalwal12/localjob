"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useAuth } from "@/hooks/useAuth";
import { BookingModal } from "@/components/BookingModal";
import { LocationIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { getWorkerById, incrementViewCount } from "@/lib/workers";
import type { Worker } from "@/types";
import { Timestamp } from "firebase/firestore";

import { ReviewForm } from "@/components/ReviewForm";
import { getWorkerReviews } from "@/lib/reviews";
import type { Review } from "@/types";

import { createOrGetChat } from "@/lib/chats";

export default function WorkerProfilePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const workerId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const { user } = useAuth();

  const handleChat = async () => {
    if (!user) {
      toast.error("Please log in to chat.");
      return;
    }

    if (!worker) return;

    try {
      const chatId = await createOrGetChat(user.uid, worker.userId);
      if (chatId) router.push(`/messages/${chatId}`);
    } catch (error) {
      toast.error("Failed to start chat.");
    }
  };
  const [worker, setWorker] = useState<Worker | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  useEffect(() => {
    let active = true;

    const loadData = async () => {
      if (!workerId) {
        setError("Worker not found.");
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const [nextWorker, workerReviews] = await Promise.all([
          getWorkerById(workerId),
          getWorkerReviews(workerId),
        ]);

        if (!active) return;

        if (!nextWorker) {
          setWorker(null);
          setError("Worker not found.");
          setLoading(false);
          return;
        }

        setWorker(nextWorker);
        setReviews(workerReviews);
        setError(null);
        setLoading(false);

        void incrementViewCount(workerId).catch(() => undefined);
      } catch (loadError) {
        if (!active) return;
        setWorker(null);
        setError(loadError instanceof Error ? loadError.message : "Unable to load this worker.");
        setLoading(false);
      }
    };

    void loadData();
    return () => { active = false; };
  }, [workerId]);

  const handleReviewSuccess = async () => {
    if (workerId) {
      const updatedReviews = await getWorkerReviews(workerId);
      setReviews(updatedReviews);
      const updatedWorker = await getWorkerById(workerId);
      if (updatedWorker) setWorker(updatedWorker);
    }
  };

  if (loading) {
    // ... same loading UI ...
    return (
      <div className="bg-offwhite">
        <section className="bg-pitch py-16 text-white">
          <div className="page-shell animate-pulse">
            <div className="h-16 w-72 rounded-xl bg-white/10" />
            <div className="mt-5 h-8 w-40 rounded-full bg-white/10" />
          </div>
        </section>
        <section className="-mt-8 pb-16">
          <div className="page-shell">
            <div className="mx-auto max-w-[600px] animate-pulse rounded-[28px] bg-white p-8 shadow-localjob">
              <div className="h-5 w-1/2 rounded-full bg-[#f0ece7]" />
              <div className="mt-4 h-6 w-28 rounded-full bg-[#f0ece7]" />
              <div className="mt-5 h-24 rounded-3xl bg-[#f0ece7]" />
              <div className="mt-4 h-5 w-40 rounded-full bg-[#f0ece7]" />
              <div className="mt-6 h-12 rounded-full bg-[#f0ece7]" />
              <div className="mt-4 h-12 rounded-full bg-[#f0ece7]" />
            </div>
          </div>
        </section>
      </div>
    );
  }

  if (!worker) {
    // ... same error UI ...
    return (
      <div className="bg-offwhite py-20">
        <div className="page-shell">
          <div className="mx-auto max-w-[600px] rounded-[24px] border border-black/10 bg-white px-6 py-12 text-center shadow-localjob">
            <h1 className="display-heading text-[3.2rem] text-ink">Worker Missing</h1>
            <p className="mt-4 text-sm leading-6 text-muted">
              {error ?? "We couldn't find that worker profile."}
            </p>
            <Link href="/find" className="mt-6 inline-block text-sm font-medium text-crimson">
              Back to workers →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const whatsappLink = `https://wa.me/91${worker.phone}`;

  return (
    <div className="bg-offwhite">
      <section className="bg-pitch py-16 text-white">
        <div className="page-shell">
          <Link href="/find" className="text-sm font-medium text-white/65 hover:text-crimson">
            ← Back to all workers
          </Link>
          <h1 className="display-heading mt-5 text-[clamp(4rem,10vw,7rem)] text-white">
            {worker.name}
          </h1>
          <span className="mt-5 inline-flex rounded-full bg-crimson px-4 py-2 text-sm font-semibold uppercase tracking-[0.14em] text-white">
            {worker.skill}
          </span>
        </div>
      </section>

      <section className="-mt-8 pb-16 sm:pb-20">
        <div className="page-shell">
          <div className="mx-auto max-w-[600px] rounded-[28px] bg-white p-7 shadow-localjob sm:p-8">
            <p className="flex items-center gap-2 text-sm text-[#6c6c6c]">
              <LocationIcon className="h-5 w-5 text-crimson" />
              <span>
                {worker.area}, {worker.city}
              </span>
            </p>

            <p className="mt-5 inline-flex rounded-full bg-[#f7f3ef] px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-ink">
              {worker.experience}
            </p>

            <div className="mt-5 flex items-center gap-1">
              <span className="text-sm font-bold text-ink">★ {worker.rating?.toFixed(1) || "New"}</span>
              <span className="text-xs text-muted">({worker.reviewCount || 0} reviews)</span>
              {worker.isVerified && (
                <span className="ml-2 rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-blue-700">
                  Verified
                </span>
              )}
            </div>

            <p className="mt-6 text-base leading-7 text-muted">
              {worker.bio || "Local skilled worker ready to take nearby jobs."}
            </p>

            {/* Packages Section */}
            {worker.packages && worker.packages.length > 0 && (
              <div className="mt-8">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-black/60">Service Packages</h3>
                <div className="space-y-3">
                  {worker.packages.map((pkg) => (
                    <div key={pkg.id} className="flex items-center justify-between rounded-2xl border border-black/5 bg-[#fcfbf9] p-4">
                      <div>
                        <h4 className="text-sm font-bold text-ink">{pkg.name}</h4>
                        <p className="text-xs text-muted">{pkg.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-crimson">₹{pkg.price}</div>
                        <button 
                          onClick={() => setIsBookingOpen(true)}
                          className="mt-1 text-[11px] font-bold uppercase text-crimson hover:underline"
                        >
                          Book
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <p className="mt-8 text-sm font-medium text-ink">
              {worker.available ? "Available for work" : "Currently busy"}
            </p>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <a
                href={`tel:${worker.phone}`}
                className="pill-button-primary flex items-center justify-center gap-2 text-xs"
              >
                <PhoneIcon className="h-4 w-4" />
                Call
              </a>
              <button
                onClick={handleChat}
                className="pill-button flex items-center justify-center gap-2 rounded-full border border-black/10 bg-white px-4 py-3 text-xs font-semibold text-ink transition hover:-translate-y-0.5 hover:bg-[#f7f3ef]"
              >
                Message
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                className="pill-button flex items-center justify-center gap-2 rounded-full border border-emerald-600 bg-white px-4 py-3 text-xs font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-50"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="mx-auto max-w-[600px] mt-8">
            <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
            
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="rounded-2xl border border-black/5 bg-white p-5 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold text-sm">{review.customerName}</p>
                      <div className="flex text-yellow-400 text-xs mt-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < review.rating ? "★" : "☆"}</span>
                        ))}
                      </div>
                    </div>
                    <span className="text-[10px] text-muted">
                      {review.createdAt instanceof Timestamp ? review.createdAt.toDate().toLocaleDateString() : "Just now"}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-muted leading-relaxed">{review.comment}</p>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-center text-muted italic py-10 rounded-3xl border border-dashed border-black/10">No reviews yet. Be the first!</p>
              )}
            </div>

            <ReviewForm workerId={workerId!} onSuccess={handleReviewSuccess} />
          </div>
        </div>
      </section>

      {isBookingOpen && (
        <BookingModal worker={worker} onClose={() => setIsBookingOpen(false)} />
      )}
    </div>
  );
}
