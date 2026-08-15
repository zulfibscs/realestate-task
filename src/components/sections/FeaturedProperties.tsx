import Link from "next/link";

import PropertyCard from "@/components/property/PropertyCard";
import { properties } from "@/data/properties";

type FeaturedPropertiesProps = {
  limit?: number;
};

export default function FeaturedProperties({
  limit = 3,
}: FeaturedPropertiesProps) {
  const featured = properties.filter((property) => property.featured).slice(0, limit);

  return (
    <section
      aria-labelledby="featured-properties-heading"
      className="bg-[#FAFAF8] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 text-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#8A8572] sm:text-sm">
              Active Listings in the Area
            </p>
            <h2
              id="featured-properties-heading"
              className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide text-[#6B86A6] sm:text-4xl lg:text-5xl"
            >
              Featured Properties
            </h2>
          </div>
          <Link
            href="/listings"
            className="inline-flex min-h-11 items-center justify-center rounded-sm bg-[#102033] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#3D4F63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
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
