import Link from "next/link";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative flex min-h-[32rem] items-center overflow-hidden sm:min-h-[36rem] lg:min-h-[42rem]"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop)",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#1B2A41]/90 via-[#1B2A41]/75 to-[#1B2A41]/50"
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4A962]">
            Houston County Real Estate
          </p>
          <h1
            id="hero-heading"
            className="mt-4 font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
          >
            Find Your Next Home with Confidence
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-[#E8DCC4] sm:text-xl">
            Strategic guidance for buyers, sellers, and renters across Perry,
            Warner Robins, and surrounding communities.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-sm bg-[#C4A962] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors hover:bg-[#E8DCC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Browse Properties
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-sm border border-[#E8DCC4]/60 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
            >
              Contact an Agent
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
