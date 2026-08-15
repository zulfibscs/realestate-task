import Link from "next/link";

import MobileNav from "./MobileNav";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E8DCC4]/30 bg-[#1B2A41]/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="font-serif text-lg font-semibold tracking-tight text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962] sm:text-xl"
        >
          Walton Dean Realty
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

        <div className="hidden items-center md:flex">
          <Link
            href="/contact"
            className="rounded-sm bg-[#C4A962] px-5 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors hover:bg-[#E8DCC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Schedule a Viewing
          </Link>
        </div>

        <MobileNav navLinks={[...navLinks]} />
      </div>
    </header>
  );
}
