"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, MenuIcon } from "@/components/Icons";

const navLinks = [
  { href: "/find", label: "Find Workers" },
  { href: "/list-yourself", label: "List Yourself" },
  { href: "/dashboard", label: "Dashboard" },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">
      <div className="page-shell flex h-[74px] items-center justify-between gap-6">
        <Link href="/" className="display-heading text-[1.75rem] text-ink">
          LocalJob<span className="text-crimson">.</span>
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative pb-1 text-sm font-medium ${
                  active ? "text-crimson" : "text-ink hover:text-crimson"
                }`}
              >
                {link.label}
                <span
                  className={`absolute inset-x-0 -bottom-0.5 h-0.5 rounded-full bg-crimson transition-opacity ${
                    active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setIsOpen((open) => !open)}
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-black/10 text-ink md:hidden"
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={`fixed inset-x-0 top-[74px] z-40 h-[calc(100vh-74px)] bg-pitch text-white transition-all duration-300 md:hidden ${
          isOpen ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-6 opacity-0"
        }`}
      >
        <div className="page-shell flex h-full flex-col justify-between py-10">
          <div className="space-y-5">
            {navLinks.map((link) => {
              const active = isActivePath(pathname, link.href);

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`display-heading block text-[3rem] ${
                    active ? "text-crimson" : "text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>

          <p className="max-w-xs text-sm text-white/65">
            Find nearby workers, list yourself for free, and manage your own profile without any
            middlemen.
          </p>
        </div>
      </div>
    </header>
  );
}
