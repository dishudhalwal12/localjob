export function TaglineSection() {
  return (
    <section className="section-shell bg-offwhite py-16 sm:py-20 lg:py-24">
      <div className="page-shell grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <div>
          <h2 className="display-heading text-[clamp(3rem,8vw,6.875rem)] text-ink">
            <span className="block">The Electrician ——</span>
            <span className="block">
              Is Already <span className="text-crimson">Near.</span>
            </span>
          </h2>
        </div>

        <div className="ml-auto flex w-full max-w-md flex-col gap-6">
          <div className="flex flex-wrap gap-3">
            {["SKILL", "AREA", "CONTACT"].map((label) => (
              <span
                key={label}
                className="rounded-full border border-black/15 px-4 py-2 text-xs font-semibold tracking-[0.18em] text-ink"
              >
                {label}
              </span>
            ))}
          </div>
          <p className="text-base leading-7 text-muted">
            Most skilled workers don&apos;t have an online presence. LocalJob gives them one —
            simple, free, and hyperlocal.
          </p>
        </div>
      </div>
    </section>
  );
}
