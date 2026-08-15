import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden bg-[#102033]"
    >
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2200&h=1400&fit=crop"
          alt="Luxury home exterior with landscaped front entry"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="object-cover object-center"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,32,51,0.9)_0%,rgba(16,32,51,0.7)_46%,rgba(16,32,51,0.36)_100%)]"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(16,32,51,0.08)_0%,rgba(16,32,51,0.38)_100%)]"
        />
      </div>

      <div className="relative mx-auto grid min-h-[39rem] max-w-7xl items-center gap-10 px-4 py-16 sm:min-h-[44rem] sm:px-6 lg:min-h-[50rem] lg:grid-cols-[minmax(0,1fr)_25rem] lg:px-8">
        <div className="max-w-4xl text-white">
          <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#E8DCC4] backdrop-blur-sm sm:text-sm">
            Houston County Real Estate
          </p>
          <h1
            id="hero-heading"
            className="mt-6 max-w-4xl font-serif text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl"
          >
            A Better Way to
            <span className="block text-[#E8DCC4]">Buy and Sell a Home.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
            Local market guidance, disciplined negotiation, and polished listing
            presentation for buyers and sellers across Perry, Warner Robins,
            Bonaire, Kathleen, and Byron.
          </p>

          <div className="mt-9 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/listings"
              className="inline-flex min-h-12 items-center justify-center rounded-sm bg-[#E8DCC4] px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-[#102033] transition-colors hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Search Homes
            </Link>
            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-white/55 bg-white/10 px-7 py-3 text-sm font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm transition-colors hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
            >
              Sell With Strategy
            </Link>
          </div>

          <dl className="mt-12 grid max-w-2xl grid-cols-3 gap-5 border-t border-white/20 pt-6 text-white">
            <div>
              <dt className="font-serif text-3xl font-semibold">15+</dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-white/70">
                Active Listings
              </dd>
            </div>
            <div>
              <dt className="font-serif text-3xl font-semibold">5.0</dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-white/70">
                Client Rating
              </dd>
            </div>
            <div>
              <dt className="font-serif text-3xl font-semibold">478</dt>
              <dd className="mt-1 text-xs uppercase tracking-[0.18em] text-white/70">
                Local Network
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-sm border border-white/20 bg-white/95 p-5 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#8A8572]">
            Start Your Search
          </p>
          <h2 className="mt-3 font-serif text-2xl font-semibold text-[#102033]">
            Find the right Houston County home.
          </h2>
          <form action="/listings" className="mt-5 space-y-3">
            <label htmlFor="hero-location" className="sr-only">
              City, neighborhood, or ZIP
            </label>
            <input
              id="hero-location"
              name="location"
              type="search"
              placeholder="City, neighborhood, ZIP..."
              className="min-h-12 w-full rounded-sm border border-[#D9D0BC] px-4 text-sm text-[#102033] outline-none focus:border-[#102033]"
            />
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/listings"
                className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[#102033] px-4 text-sm font-semibold text-white"
              >
                Buy
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[#D9D0BC] px-4 text-sm font-semibold text-[#102033]"
              >
                Sell
              </Link>
            </div>
          </form>
          <div className="mt-5 border-t border-[#E8DCC4] pt-4">
            <p className="text-sm font-semibold text-[#102033]">
              Popular areas
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Perry", "Warner Robins", "Bonaire", "Kathleen"].map((area) => (
                <Link
                  key={area}
                  href="/listings"
                  className="rounded-full bg-[#F4F1EA] px-3 py-1.5 text-xs font-semibold text-[#3D4F63]"
                >
                  {area}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
