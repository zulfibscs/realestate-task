import Image from "next/image";
import Link from "next/link";

const guides = [
  {
    title: "Selling a Home?",
    description:
      "Browse a step-by-step seller's guide and learn how to position your property for the strongest possible outcome.",
    href: "/contact",
    cta: "Learn More",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=900&fit=crop",
  },
  {
    title: "Buying a Home?",
    description:
      "Explore a buyer's guide built to help you move with confidence, from first search to closing day.",
    href: "/listings",
    cta: "Learn More",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&h=900&fit=crop",
  },
] as const;

export default function ContactCTA() {
  return (
    <section aria-labelledby="guides-heading" className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#8A8572] sm:text-sm">
            Explore
          </p>
          <h2
            id="guides-heading"
            className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-[#6B86A6] sm:text-4xl lg:text-5xl"
          >
            Selling and Buying Guides
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {guides.map(({ title, description, href, cta, image }) => (
            <article
              key={title}
              className="group relative isolate overflow-hidden rounded-sm min-h-[20rem]"
            >
              <Image
                src={image}
                alt={title}
                fill
                loading="lazy"
                unoptimized
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1B2A41]/45" />
              <div className="relative flex h-full min-h-[20rem] flex-col items-center justify-center px-6 py-10 text-center text-white sm:px-10">
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#E8DCC4]">
                  Guide
                </p>
                <h3 className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide sm:text-4xl">
                  {title}
                </h3>
                <p className="mt-4 max-w-md text-sm leading-relaxed text-white/90 sm:text-base">
                  {description}
                </p>
                <Link
                  href={href}
                  className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors hover:bg-[#E8DCC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  {cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
