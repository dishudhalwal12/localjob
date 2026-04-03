import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t-2 border-crimson bg-pitch py-8 text-white">
      <div className="page-shell flex flex-col gap-4 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p>© LocalJob 2025</p>
          <p className="mt-1">Built for India&apos;s informal workforce</p>
        </div>

        <div className="flex flex-wrap gap-4 sm:justify-end">
          <Link href="/find" className="hover:text-crimson">
            Find Workers
          </Link>
          <Link href="/list-yourself" className="hover:text-crimson">
            List Yourself
          </Link>
          <Link href="/dashboard" className="hover:text-crimson">
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
