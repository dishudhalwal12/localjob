import Link from "next/link";
import { PhoneIcon, ProfileIcon, SearchIcon, SparkleIcon } from "@/components/Icons";

const steps = [
  {
    step: "STEP 01",
    title: "Search by Area",
    description: "Type your colony or locality name. See who's available near you right now.",
    icon: SearchIcon,
  },
  {
    step: "STEP 02",
    title: "Browse Profiles",
    description:
      "Check the worker's skill, experience, and service area. No login needed to look.",
    icon: ProfileIcon,
  },
  {
    step: "STEP 03",
    title: "Call Directly",
    description:
      "Tap their number. Talk to them. No app cut, no booking fee — the job is yours to arrange.",
    icon: PhoneIcon,
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="section-shell dot-grid-bg bg-pitch py-16 text-white sm:py-20 lg:py-24"
    >
      <SparkleIcon className="sparkle absolute left-[8%] top-16 h-6 w-6 text-white/70" />
      <SparkleIcon className="sparkle absolute right-[10%] top-28 h-7 w-7 text-crimson" />
      <SparkleIcon className="sparkle absolute bottom-16 right-[18%] h-5 w-5 text-white/60" />

      <div className="page-shell">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">simple as that</p>
          <h2 className="display-heading mt-3 text-[clamp(4rem,8vw,5.6rem)] text-white">
            How It Works
          </h2>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {steps.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                key={item.step}
                className={`rounded-[24px] bg-white p-8 text-ink shadow-localjob transition-transform duration-300 ${
                  index === 1 ? "lg:-translate-y-6" : ""
                }`}
              >
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/40">
                  {item.step}
                </p>
                <Icon className="mt-8 h-14 w-14 text-ink" />
                <h3 className="mt-8 text-lg font-bold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
              </article>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link href="/find" className="pill-button-primary">
            Find a Worker Near You →
          </Link>
        </div>
      </div>
    </section>
  );
}
