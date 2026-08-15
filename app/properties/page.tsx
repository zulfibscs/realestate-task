import type { Metadata } from "next";

import PropertyListings from "@/components/sections/PropertyListings";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "Properties | Walton Dean Realty",
  description:
    "Browse homes for sale and rent across Houston County, Georgia. Filter by location, price, beds, and more.",
};

export default function PropertiesPage() {
  return (
    <main>
      <section
        aria-labelledby="properties-heading"
        className="border-b border-[#E8DCC4]/40 bg-white py-12 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4A962]">
            Listings
          </p>
          <h1
            id="properties-heading"
            className="mt-3 font-serif text-3xl font-semibold text-[#1B2A41] sm:text-4xl"
          >
            Find Your Perfect Property
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3D4F63]">
            Search available homes for sale and rent across Perry, Warner
            Robins, Bonaire, Kathleen, Byron, and surrounding areas.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <PropertyListings properties={properties} />
        </div>
      </section>
    </main>
  );
}
