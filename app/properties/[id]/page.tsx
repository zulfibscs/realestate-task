import type { Metadata } from "next";
import { notFound } from "next/navigation";

import AgentCard from "@/components/property/AgentCard";
import PropertyGallery from "@/components/property/PropertyGallery";
import { properties } from "@/data/properties";
import { formatArea, formatPrice } from "@/lib/format";

type PropertyPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export function generateStaticParams() {
  return properties.map((property) => ({
    id: property.id,
  }));
}

export async function generateMetadata({
  params,
}: PropertyPageProps): Promise<Metadata> {
  const { id } = await params;
  const property = properties.find((item) => item.id === id);

  if (!property) {
    return {
      title: "Property Not Found | Walton Dean Realty",
    };
  }

  return {
    title: `${property.title} | Walton Dean Realty`,
    description: `${property.bedrooms} bed, ${property.bathrooms} bath ${property.propertyType.toLowerCase()} in ${property.location}.`,
  };
}

export default async function PropertyDetailsPage({
  params,
}: PropertyPageProps) {
  const { id } = await params;
  const property = properties.find((item) => item.id === id);

  if (!property) {
    notFound();
  }

  const listingLabel =
    property.listingType === "buy" ? "For Sale" : "For Rent";

  return (
    <main>
      <section className="border-b border-[#E8DCC4]/40 bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4A962]">
            Property Details
          </p>
          <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex rounded-sm bg-[#1B2A41] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                {listingLabel}
              </div>
              <h1 className="mt-4 font-serif text-3xl font-semibold text-[#1B2A41] sm:text-4xl">
                {property.title}
              </h1>
              <p className="mt-3 text-base text-[#3D4F63]">
                {property.location}
              </p>
            </div>
            <p className="font-serif text-3xl font-semibold text-[#1B2A41]">
              {formatPrice(property.price, property.listingType)}
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.75fr)] lg:px-8">
          <div>
            <PropertyGallery images={property.images} title={property.title} />

            <div className="mt-10 rounded-sm border border-[#E8DCC4]/60 bg-white p-6">
              <h2 className="font-serif text-2xl font-semibold text-[#1B2A41]">
                Overview
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-4 text-sm text-[#3D4F63] sm:grid-cols-4">
                <li>
                  <span className="block text-xs uppercase tracking-wide text-[#6B7280]">
                    Beds
                  </span>
                  <span className="mt-1 block text-base font-semibold text-[#1B2A41]">
                    {property.bedrooms}
                  </span>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wide text-[#6B7280]">
                    Baths
                  </span>
                  <span className="mt-1 block text-base font-semibold text-[#1B2A41]">
                    {property.bathrooms}
                  </span>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wide text-[#6B7280]">
                    Area
                  </span>
                  <span className="mt-1 block text-base font-semibold text-[#1B2A41]">
                    {formatArea(property.area)}
                  </span>
                </li>
                <li>
                  <span className="block text-xs uppercase tracking-wide text-[#6B7280]">
                    Type
                  </span>
                  <span className="mt-1 block text-base font-semibold text-[#1B2A41]">
                    {property.propertyType}
                  </span>
                </li>
              </ul>
            </div>

            <div className="mt-10 rounded-sm border border-[#E8DCC4]/60 bg-white p-6">
              <h2 className="font-serif text-2xl font-semibold text-[#1B2A41]">
                Description
              </h2>
              <p className="mt-4 leading-relaxed text-[#3D4F63]">
                {property.description}
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              <div className="rounded-sm border border-[#E8DCC4]/60 bg-white p-6">
                <h2 className="font-serif text-2xl font-semibold text-[#1B2A41]">
                  Features
                </h2>
                <ul className="mt-4 space-y-2 text-[#3D4F63]">
                  {property.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C4A962]" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-sm border border-[#E8DCC4]/60 bg-white p-6">
                <h2 className="font-serif text-2xl font-semibold text-[#1B2A41]">
                  Amenities
                </h2>
                <ul className="mt-4 space-y-2 text-[#3D4F63]">
                  {property.amenities.map((amenity) => (
                    <li key={amenity} className="flex items-start gap-2">
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[#C4A962]" />
                      <span>{amenity}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <AgentCard property={property} />
        </div>
      </section>
    </main>
  );
}
