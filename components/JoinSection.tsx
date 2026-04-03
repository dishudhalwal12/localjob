import Link from "next/link";

export function JoinSection() {
  return (
    <section className="section-shell bg-offwhite py-16 sm:py-20 lg:py-24">
      <div className="page-shell">
        <div className="mx-auto max-w-[700px] text-center">
          <p className="eyebrow">are you a worker?</p>
          <h2 className="display-heading mt-4 text-[clamp(3.4rem,7vw,5rem)] text-ink">
            List Yourself. Get Found.
          </h2>
          <p className="mt-5 text-base leading-7 text-muted">
            Add your name, skill, and area. People nearby will find you directly. Free, always.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link href="/list-yourself" className="pill-button-primary">
              List Yourself
            </Link>
            <Link href="#how-it-works" className="pill-button-secondary">
              See How It Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
