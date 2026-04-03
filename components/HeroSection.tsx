import Link from "next/link";
import { SparkleIcon, ToolsIcon } from "@/components/Icons";

export function HeroSection() {
  return (
    <section className="section-shell bg-offwhite py-12 sm:py-16 lg:py-24">
      <div className="page-shell grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
        <div className="relative">
          <SparkleIcon className="sparkle absolute -left-2 top-2 h-7 w-7 text-ink" />
          <p className="eyebrow mb-4 pl-5 sm:mb-6">the electrician next door</p>
          <h1 className="display-heading text-[clamp(4.5rem,11vw,8.125rem)] text-ink">
            <span className="block">Find Local</span>
            <span className="block">
              Workers<span className="text-crimson">.</span>
            </span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted">
            No app fees. No middlemen. Just skilled people near you.
          </p>

          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <Link href="/find" className="pill-button-primary">
              Find a Worker
            </Link>
            <Link href="/list-yourself" className="text-sm font-medium text-ink hover:text-crimson">
              or list yourself →
            </Link>
          </div>
        </div>

        <div className="relative">
          <SparkleIcon className="sparkle absolute -right-2 top-2 h-8 w-8 text-crimson" />
          <SparkleIcon className="sparkle absolute bottom-8 left-6 h-5 w-5 text-ink" />
          <div className="grid grid-cols-2 gap-4 md:gap-5">
            <div className="rounded-[24px] bg-ink px-6 py-7 text-white shadow-localjob md:translate-y-3">
              <p className="display-heading text-[3.3rem] leading-none">2,400+</p>
              <p className="mt-2 text-sm text-white/55">Workers Listed</p>
            </div>

            <div className="flex min-h-[170px] items-center justify-center rounded-[24px] bg-crimson p-6 text-white shadow-localjob md:-translate-y-5">
              <ToolsIcon className="h-20 w-20" />
            </div>

            <div className="rounded-[24px] border border-black/10 bg-[#faf8f4] px-5 py-6 text-sm leading-6 text-ink shadow-localjob md:-translate-y-4">
              Find by area or skill — no sign-up needed
            </div>

            <div className="rounded-[24px] bg-ink px-6 py-7 text-white shadow-localjob md:translate-y-4">
              <p className="display-heading text-[3.3rem] leading-none">14</p>
              <p className="mt-2 text-sm text-white/55">Skill Categories</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
