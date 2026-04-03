"use client";

import Link from "next/link";
import { useWorkers } from "@/hooks/useWorkers";

function GridSkeleton() {
  return (
    <div className="grid auto-rows-[minmax(220px,auto)] gap-5 md:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={index}
          className={`animate-pulse rounded-[24px] border border-white/10 bg-white/5 p-6 ${
            index === 0 ? "md:row-span-2" : ""
          }`}
        >
          <div className="h-5 w-28 rounded-full bg-white/10" />
          <div className="mt-8 h-12 w-3/4 rounded-xl bg-white/10" />
          <div className="mt-4 h-4 w-1/2 rounded-full bg-white/10" />
          <div className="mt-3 h-4 w-2/3 rounded-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}

export function WorkerGridSection() {
  const { workers, loading, error } = useWorkers({ limitCount: 6 });

  return (
    <section className="section-shell bg-pitch py-16 text-white sm:py-20 lg:py-24">
      <div className="page-shell">
        <div className="flex items-end justify-between gap-6">
          <h2 className="display-heading text-[clamp(3rem,6vw,4rem)] text-white">
            Recently Listed
          </h2>
        </div>

        <div className="mt-10">
          {loading ? (
            <GridSkeleton />
          ) : workers.length ? (
            <div className="grid auto-rows-[minmax(220px,auto)] gap-5 md:grid-cols-2 xl:grid-cols-3">
              {workers.map((worker, index) => (
                <article
                  key={worker.id}
                  className={`group flex flex-col rounded-[20px] border border-white/10 bg-ink p-6 text-white transition-all duration-300 hover:scale-[1.02] hover:border-crimson ${
                    index === 0 ? "md:row-span-2" : ""
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full bg-crimson px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
                      {worker.skill}
                    </span>
                    <span className="text-xs uppercase tracking-[0.18em] text-white/50">
                      {worker.available ? "Available now" : "Busy"}
                    </span>
                  </div>

                  <div className="mt-6 flex flex-1 flex-col">
                    <h3
                      className={`display-heading ${
                        index === 0 ? "text-[3rem] leading-[0.9]" : "text-[2rem]"
                      }`}
                    >
                      {worker.name}
                    </h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.16em] text-white/60">
                      {worker.area}, {worker.city}
                    </p>
                    <p className="mt-4 text-sm leading-6 text-white/72">
                      {worker.bio || "Local skilled worker ready to help nearby."}
                    </p>
                    <div className="mt-auto pt-6">
                      <p className="text-sm text-white/60">{worker.experience}</p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <a href={`tel:${worker.phone}`} className="pill-outline-dark">
                          Contact
                        </a>
                        <Link
                          href={`/find/${worker.id}`}
                          className="pill-button rounded-full border border-white/20 px-5 py-3 text-sm text-white hover:border-crimson hover:text-crimson"
                        >
                          View Profile
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-white/10 bg-white/5 px-6 py-12 text-center">
              <p className="text-lg font-medium text-white">
                {error ?? "No workers have been listed yet."}
              </p>
              <Link href="/list-yourself" className="mt-4 inline-block text-sm text-white/70 hover:text-crimson">
                List yourself and become the first nearby profile →
              </Link>
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <Link href="/find" className="pill-button-primary">
            See All Workers →
          </Link>
        </div>
      </div>
    </section>
  );
}
