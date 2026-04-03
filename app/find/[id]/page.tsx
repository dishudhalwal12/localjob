"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { LocationIcon, PhoneIcon, WhatsAppIcon } from "@/components/Icons";
import { getWorkerById, incrementViewCount } from "@/lib/workers";
import type { Worker } from "@/types";

export default function WorkerProfilePage() {
  const params = useParams<{ id: string }>();
  const workerId = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const [worker, setWorker] = useState<Worker | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const loadWorker = async () => {
      if (!workerId) {
        setError("Worker not found.");
        setLoading(false);
        return;
      }

      setLoading(true);

      try {
        const nextWorker = await getWorkerById(workerId);

        if (!active) {
          return;
        }

        if (!nextWorker) {
          setWorker(null);
          setError("Worker not found.");
          setLoading(false);
          return;
        }

        setWorker(nextWorker);
        setError(null);
        setLoading(false);

        void incrementViewCount(workerId).catch(() => undefined);
      } catch (loadError) {
        if (!active) {
          return;
        }

        setWorker(null);
        setError(loadError instanceof Error ? loadError.message : "Unable to load this worker.");
        setLoading(false);
      }
    };

    void loadWorker();

    return () => {
      active = false;
    };
  }, [workerId]);

  if (loading) {
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

            <p className="mt-6 text-base leading-7 text-muted">
              {worker.bio || "Local skilled worker ready to take nearby jobs."}
            </p>

            <p className="mt-6 text-sm font-medium text-ink">
              {worker.available ? "Available for work" : "Currently busy"}
            </p>

            <a
              href={`tel:${worker.phone}`}
              className="pill-button-primary mt-8 flex w-full items-center justify-center gap-2"
            >
              <PhoneIcon className="h-4 w-4" />
              Call Now
            </a>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="pill-button mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-emerald-600 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 transition hover:-translate-y-0.5 hover:bg-emerald-50"
            >
              <WhatsAppIcon className="h-4 w-4" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
