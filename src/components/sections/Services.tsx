import Image from "next/image";
import Link from "next/link";

export default function Services() {
  return (
    <section
      aria-labelledby="services-heading"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center">
          <div className="relative overflow-hidden rounded-sm bg-[#E8DCC4]/20">
            <div className="relative aspect-[4/5]">
              <Image
                src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=1200&h=1400&fit=crop"
                alt="William Walton-Dean portrait"
                fill
                loading="lazy"
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-[#2E4A6B] px-6 py-5 text-white sm:px-8">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E8DCC4]">
                Meet
              </p>
              <p className="mt-2 font-serif text-2xl uppercase tracking-wide sm:text-3xl">
                William Walton-Dean
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#8A8572] sm:text-sm">
              Ready When You Are
            </p>
            <h2
              id="services-heading"
              className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-[#6B86A6] sm:text-4xl lg:text-5xl"
            >
              A Process Built Around Your Goals
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#3D4F63] sm:text-lg">
              From finding the perfect neighborhood to negotiating the best sale
              price, I combine deep knowledge of the Warner Robins market with a
              commitment to clear communication and disciplined execution.
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#3D4F63] sm:text-lg">
              Whether you&apos;re buying, selling, or planning your next move, I
              provide a structured plan that keeps the process focused on your
              outcome.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Link
                href="/about"
                className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[#102033] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#3D4F63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
              >
                Learn More About My Approach
              </Link>
              <Link
                href="/contact"
                className="inline-flex min-h-11 items-center justify-center rounded-sm border border-[#E8DCC4]/80 bg-[#FAFAF8] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#3D4F63] transition-colors hover:border-[#C4A962] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
              >
                Let&apos;s Connect
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
