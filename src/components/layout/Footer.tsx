import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/#featured-properties-heading", label: "Portfolio" },
  { href: "/#neighborhoods-heading", label: "Neighborhoods" },
  { href: "/listings", label: "Home Search" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

const socialLinks = [
  { href: "#", label: "Facebook" },
  { href: "#", label: "Instagram" },
  { href: "#", label: "LinkedIn" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-[#E8DCC4]/30 bg-[#1B2A41] text-[#E8DCC4]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 grid gap-3 border-b border-[#E8DCC4]/20 pb-8 sm:grid-cols-3">
          {["WD Realty", "real", "Equal Housing"].map((label) => (
            <div
              key={label}
              className="flex min-h-16 items-center justify-center rounded-sm border border-[#E8DCC4]/25 bg-white/5 px-4 text-center text-sm font-semibold uppercase tracking-[0.2em] text-white"
            >
              {label}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-serif text-xl font-semibold text-white">
              Walton Dean Realty
            </p>
            <p className="mt-3 text-sm leading-relaxed text-[#E8DCC4]/90">
              Strategic real estate guidance for buyers and sellers across
              Houston County, Georgia.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Quick Links
            </h2>
            <ul className="mt-4 space-y-2">
              {quickLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Contact
            </h2>
            <address className="mt-4 space-y-2 text-sm not-italic leading-relaxed">
              <p>331 Margie Dr</p>
              <p>Warner Robins, GA 31088</p>
              <p>
                <a
                  href="tel:+14783717069"
                  className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
                >
                  (478) 371-7069
                </a>
              </p>
              <p>
                <a
                  href="mailto:william@waltondeanrealty.com"
                  className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
                >
                  william@waltondeanrealty.com
                </a>
              </p>
            </address>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-white">
              Reviews
            </h2>
            <div className="mt-4 rounded-sm border border-[#E8DCC4]/25 bg-white/5 p-4">
              <p className="font-serif text-2xl font-semibold text-white">
                5.0 Stars
              </p>
              <p className="mt-1 text-sm text-[#E8DCC4]/85">
                Client-rated local guidance for Houston County buyers and
                sellers.
              </p>
            </div>
            <ul className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-sm border border-[#E8DCC4]/30 text-xs font-semibold uppercase transition-colors hover:border-[#C4A962] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
                  >
                    {label.slice(0, 2)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#E8DCC4]/20 pt-6 text-sm leading-relaxed text-[#E8DCC4]/70">
          <p>
            Information is deemed reliable but not guaranteed. Mock listing data
            is provided for demonstration purposes only and is not an offer of
            brokerage services or MLS representation.
          </p>
          <p className="mt-4">
            &copy; {year} Walton Dean Realty. All rights reserved. Powered by a
            Next.js property search experience. Equal Housing Opportunity.
          </p>
        </div>
      </div>
    </footer>
  );
}
