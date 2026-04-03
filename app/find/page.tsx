"use client";

import { useState } from "react";
import Link from "next/link";
import { SearchBar } from "@/components/SearchBar";
import { SkillFilter } from "@/components/SkillFilter";
import { WorkerCard } from "@/components/WorkerCard";
import { useWorkers } from "@/hooks/useWorkers";
import type { WorkerSkillFilter } from "@/types";

function WorkerCardSkeleton() {
  return (
    <div className="animate-pulse rounded-[20px] border border-[#e0e0e0] bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="h-7 w-28 rounded-full bg-[#f0ece7]" />
        <div className="h-4 w-16 rounded-full bg-[#f0ece7]" />
      </div>
      <div className="mt-6 h-6 w-1/2 rounded-full bg-[#f0ece7]" />
      <div className="mt-4 h-4 w-2/3 rounded-full bg-[#f0ece7]" />
      <div className="mt-4 h-6 w-24 rounded-full bg-[#f0ece7]" />
      <div className="mt-4 h-14 rounded-2xl bg-[#f0ece7]" />
      <div className="mt-6 flex items-center justify-between">
        <div className="h-11 w-28 rounded-full bg-[#f0ece7]" />
        <div className="h-4 w-20 rounded-full bg-[#f0ece7]" />
      </div>
    </div>
  );
}

export default function FindWorkersPage() {
  const [search, setSearch] = useState("");
  const [skill, setSkill] = useState<WorkerSkillFilter>("All");
  const { workers, loading, error } = useWorkers({ search, skill });

  return (
    <div className="bg-offwhite">
      <section className="bg-pitch py-14 text-white sm:py-16">
        <div className="page-shell">
          <h1 className="display-heading text-[clamp(3.8rem,9vw,6.5rem)] text-white">
            Find a Worker
          </h1>
          <p className="mt-3 text-base text-white/70">
            Search by area or pick a skill below.
          </p>
        </div>
      </section>

      <section className="sticky top-[74px] z-30 border-b border-black/10 bg-white">
        <div className="page-shell flex flex-col gap-4 py-4 lg:flex-row lg:items-center">
          <div className="lg:max-w-md lg:flex-1">
            <SearchBar value={search} onChange={setSearch} />
          </div>
          <div className="lg:flex-[1.5]">
            <SkillFilter value={skill} onChange={setSkill} />
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 lg:py-16">
        <div className="page-shell">
          {loading ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {Array.from({ length: 6 }).map((_, index) => (
                <WorkerCardSkeleton key={index} />
              ))}
            </div>
          ) : workers.length ? (
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {workers.map((worker) => (
                <WorkerCard key={worker.id} worker={worker} />
              ))}
            </div>
          ) : (
            <div className="rounded-[24px] border border-black/10 bg-white px-6 py-16 text-center shadow-localjob">
              <p className="text-xl font-semibold text-ink">No workers found in this area yet.</p>
              <p className="mt-3 text-sm leading-6 text-muted">
                {error ?? "Be the first nearby worker people can discover on LocalJob."}
              </p>
              <Link href="/list-yourself" className="mt-5 inline-block text-sm font-medium text-crimson">
                List yourself →
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
