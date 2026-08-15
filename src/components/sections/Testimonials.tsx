import Image from "next/image";
import Link from "next/link";

import { properties } from "@/data/properties";

const neighborhoods = [
  {
    title: "Explore Homes for Sale in Perry",
    description:
      "New construction, established homes, and a growing downtown make Perry one of Houston County's most balanced markets.",
    href: "/listings",
    image: properties.find((property) => property.location.startsWith("Perry"))?.images[0] ?? properties[0].images[0],
  },
  {
    title: "Explore Homes for Sale in Warner Robins",
    description:
      "The county's largest market, with strong demand, convenient commuting access, and a wide range of price points.",
    href: "/listings",
    image: properties.find((property) => property.location.startsWith("Warner Robins"))?.images[0] ?? properties[1].images[0],
  },
  {
    title: "Explore Homes for Sale in Bonaire",
    description:
      "Established neighborhoods, family-friendly amenities, and convenient access to schools and shopping.",
    href: "/listings",
    image: properties.find((property) => property.location.startsWith("Bonaire"))?.images[0] ?? properties[2].images[0],
  },
] as const;

export default function Testimonials() {
  return (
    <section
      aria-labelledby="neighborhoods-heading"
      className="bg-[#FAFAF8] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#8A8572] sm:text-sm">
            Areas of Expertise
          </p>
          <h2
            id="neighborhoods-heading"
            className="font-serif text-3xl font-semibold uppercase tracking-wide text-[#6B86A6] sm:text-4xl lg:text-5xl"
          >
            Proudly Serving Houston County
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {neighborhoods.map(({ title, description, href, image }) => (
            <li key={title}>
              <article className="group overflow-hidden rounded-sm bg-white shadow-[0_12px_40px_rgba(27,42,65,0.08)]">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image}
                    alt={title}
                    fill
                    loading="lazy"
                    unoptimized
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A41]/60 via-transparent to-transparent" />
                  <p className="absolute inset-x-4 bottom-4 text-center text-sm font-semibold uppercase tracking-[0.25em] text-white">
                    {title}
                  </p>
                </div>

                <div className="px-5 py-5 text-center">
                  <p className="text-sm leading-relaxed text-[#3D4F63]">
                    {description}
                  </p>
                  <Link
                    href={href}
                    className="mt-5 inline-flex min-h-11 items-center justify-center rounded-full bg-[#2E4A6B] px-5 py-3 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#3D4F63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
                  >
                    Read More
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
