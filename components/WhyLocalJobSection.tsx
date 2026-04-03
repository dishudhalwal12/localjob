import { SparkleIcon } from "@/components/Icons";

const reasons = [
  {
    title: "Workers keep 100%",
    copy: "Unlike Urban Company or similar apps, LocalJob charges nothing. Zero.",
  },
  {
    title: "No onboarding needed",
    copy: "No documents, no verification forms. Add your name, skill, area, and number. Done.",
  },
  {
    title: "Real people near you",
    copy: "Not workers from across town. Someone in your colony, your sector, your street.",
  },
];

export function WhyLocalJobSection() {
  return (
    <section className="section-shell bg-crimson py-16 text-white sm:py-20 lg:py-24">
      <SparkleIcon className="sparkle absolute left-[7%] top-12 h-6 w-6 text-white/75" />
      <SparkleIcon className="sparkle absolute right-[12%] top-28 h-8 w-8 text-white" />

      <div className="page-shell grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div>
          <h2 className="display-heading text-[clamp(3.8rem,7vw,5.4rem)] leading-[0.86] text-white">
            <span className="block">No Cuts.</span>
            <span className="block">No Fees.</span>
            <span className="block">Just Work.</span>
          </h2>
        </div>

        <div className="space-y-8">
          {reasons.map((reason) => (
            <div key={reason.title} className="border-l-2 border-white pl-5">
              <h3 className="text-xl font-semibold">{reason.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-7 text-white/80">{reason.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
