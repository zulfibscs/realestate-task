import Link from "next/link";

import PropertyCard from "@/components/property/PropertyCard";
import { properties } from "@/data/properties";

export default function FeaturedProperties() {
  const featured = properties.filter((property) => property.featured);

  return (
    <section
      aria-labelledby="featured-properties-heading"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4A962]">
              Featured Listings
            </p>
            <h2
              id="featured-properties-heading"
              className="mt-3 font-serif text-3xl font-semibold text-[#1B2A41] sm:text-4xl"
            >
              Explore Our Top Properties
            </h2>
          </div>
          <Link
            href="/properties"
            className="text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors hover:text-[#C4A962] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
          >
            View All Properties
          </Link>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((property) => (
            <li key={property.id}>
              <PropertyCard property={property} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
