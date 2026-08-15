import Image from "next/image";
import Link from "next/link";

const pillars = [
  {
    title: "Buy with a plan, not guesswork",
    description:
      "Buying in Houston County requires more than browsing listings. We help you narrow the right neighborhoods, evaluate value, and move forward with a clear strategy.",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=900&fit=crop",
    href: "/listings",
    cta: "Start Your Home Search",
  },
  {
    title: "Positioned to sell, not just listed",
    description:
      "From pricing and presentation to marketing and negotiation, we structure every listing to create demand and protect your bottom line.",
    image:
      "https://images.unsplash.com/photo-1560185007-5f0bb1866cab?w=1200&h=900&fit=crop",
    href: "/contact",
    cta: "Get Your Home Value",
  },
  {
    title: "A process that delivers results",
    description:
      "Clear communication, data-driven recommendations, and a disciplined workflow keep the experience calm and efficient from first showing to closing day.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&h=900&fit=crop",
    href: "/contact",
    cta: "Schedule a Consultation",
  },
] as const;

export default function About() {
  return (
    <section
      aria-labelledby="about-heading"
            className="bg-[#F7F4EC] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#8A8572] sm:text-sm">
            Your Next Chapter Awaits
          </p>
          <h2
            id="about-heading"
            className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-[#6B86A6] sm:text-4xl lg:text-5xl"
          >
            A More Strategic Approach to Real Estate
          </h2>
          <p className="mt-4 text-base leading-relaxed text-[#3D4F63] sm:text-lg">
            I help buyers and sellers across Houston County navigate the market
            with clarity, structure, and a process designed to deliver results.
          </p>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {pillars.map(({ title, description, image, href, cta }) => (
            <li key={title} className="flex flex-col">
              <article className="flex h-full flex-col">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#E8DCC4]/30">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    loading="lazy"
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                <div className="flex flex-1 flex-col px-4 pt-5 text-center">
                  <h3 className="font-serif text-xl font-semibold text-[#102033] sm:text-2xl">
                    {title}
                  </h3>
                  <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#3D4F63]">
                    {description}
                  </p>
                  <div className="mt-6">
                    <Link
                      href={href}
                      className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[#102033] px-6 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-[#2E4A6B] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
                    >
                      {cta}
                    </Link>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
