import Link from "next/link";

import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#featured-properties-heading", label: "Portfolio" },
  { href: "/#neighborhoods-heading", label: "Neighborhoods" },
  { href: "/listings", label: "Home Search" },
  { href: "/contact", label: "Let's Connect" },
] as const;

export default function Header() {
  return (
    // The banner above the header is 44px tall, so the sticky header starts below it and keeps both bars visible.
    <header className="sticky top-11 z-50 border-b border-[#E8DCC4]/30 bg-[#1B2A41]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 font-serif text-lg font-semibold tracking-tight text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962] sm:text-xl"
        >
          <span>WD Realty</span>
          <span className="rounded-sm border border-[#E8DCC4]/50 px-1.5 py-0.5 text-[0.6rem] font-sans uppercase tracking-[0.2em] text-[#E8DCC4]">
            real
          </span>
        </Link>

        {/*
         * Navigation switches at the md breakpoint (768px): below that width, a horizontal
         * bar cannot fit logo, four links, and a CTA without crowding tap targets; above
         * it, a persistent inline nav is faster than an overlay for primary site sections.
         */}
        <nav
          aria-label="Main navigation"
          className="hidden items-center gap-8 md:flex"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className="text-sm font-medium uppercase tracking-wide text-[#E8DCC4] transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C4A962]"
            >
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <a
            href="tel:+14783717069"
            className="text-sm font-semibold text-white transition-colors hover:text-[#E8DCC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C4A962]"
          >
            (478) 371-7069
          </a>
          <div className="hidden items-center gap-2 xl:flex">
            <Link
              href="#"
              className="text-xs font-semibold uppercase tracking-wide text-[#E8DCC4] hover:text-white"
            >
              Login
            </Link>
            <span className="text-[#E8DCC4]/40">/</span>
            <Link
              href="#"
              className="text-xs font-semibold uppercase tracking-wide text-[#E8DCC4] hover:text-white"
            >
              Register
            </Link>
          </div>
          <Link
            href="/contact"
            className="rounded-sm bg-[#C4A962] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors hover:bg-[#E8DCC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Schedule a Viewing
          </Link>
        </div>

        <MobileNav navLinks={[...navLinks]} />
      </div>
    </header>
  );
}
