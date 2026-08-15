import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/properties", label: "Properties" },
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
              Follow Us
            </h2>
            <ul className="mt-4 flex flex-wrap gap-3">
              {socialLinks.map(({ href, label }) => (
                <li key={label}>
                  <a
                    href={href}
                    aria-label={label}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-sm border border-[#E8DCC4]/30 text-xs font-semibold uppercase transition-colors hover:border-[#C4A962] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
                  >
                    {label.slice(0, 2)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-[#E8DCC4]/20 pt-6 text-center text-sm text-[#E8DCC4]/70 sm:text-left">
          <p>&copy; {year} Walton Dean Realty. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
