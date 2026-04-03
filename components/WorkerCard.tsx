import Link from "next/link";
import { LocationIcon } from "@/components/Icons";
import type { Worker } from "@/types";

interface WorkerCardProps {
  worker: Worker;
}

export function WorkerCard({ worker }: WorkerCardProps) {
  return (
    <article className="group flex h-full flex-col rounded-[20px] border border-[#e0e0e0] bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:border-crimson hover:shadow-localjob">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-crimson px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white">
          {worker.skill}
        </span>
        <span className="flex items-center gap-2 text-xs font-medium text-[#6c6c6c]">
          <span
            className={`h-2.5 w-2.5 rounded-full ${
              worker.available ? "bg-emerald-500" : "bg-[#a8a8a8]"
            }`}
          />
          {worker.available ? "Available" : "Busy"}
        </span>
      </div>

      <h3 className="mt-5 text-lg font-bold text-ink">{worker.name}</h3>

      <p className="mt-3 flex items-center gap-2 text-sm text-[#6c6c6c]">
        <LocationIcon className="h-4 w-4 text-crimson" />
        <span>
          {worker.area}, {worker.city}
        </span>
      </p>

      <p className="mt-4 inline-flex w-fit rounded-full bg-[#f7f3ef] px-3 py-1 text-xs font-semibold text-ink">
        {worker.experience}
      </p>

      <p className="mt-4 line-clamp-2 text-sm leading-6 text-muted">
        {worker.bio || "Skilled local worker ready to take up nearby jobs."}
      </p>

      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
        <a href={`tel:${worker.phone}`} className="pill-button-primary px-5 py-2.5 text-xs sm:text-sm">
          Call Now
        </a>
        <Link href={`/find/${worker.id}`} className="text-sm font-medium text-ink hover:text-crimson">
          View Profile
        </Link>
      </div>
    </article>
  );
}
