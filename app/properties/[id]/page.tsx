import Image from "next/image";
import { notFound } from "next/navigation";

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
            <div className="overflow-hidden rounded-sm border border-[#E8DCC4]/60 bg-white">
              <div className="relative aspect-[16/10] bg-[#E8DCC4]/20">
                <Image
                  src={property.images[0]}
                  alt={property.title}
                  fill
                  priority
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 70vw"
                  className="object-cover"
                />
              </div>
              {property.images.length > 1 ? (
                <div className="grid grid-cols-3 gap-3 border-t border-[#E8DCC4]/40 p-3">
                  {property.images.slice(0, 3).map((image, index) => (
                    <div
                      key={`${property.id}-${image}`}
                      className="relative aspect-[4/3] overflow-hidden rounded-sm bg-[#E8DCC4]/20"
                    >
                      <Image
                        src={image}
                        alt={`${property.title} image ${index + 1}`}
                        fill
                        unoptimized
                        sizes="(max-width: 1024px) 33vw, 20vw"
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
              ) : null}
            </div>

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

          <aside className="h-fit rounded-sm border border-[#E8DCC4]/60 bg-white p-6 lg:sticky lg:top-24">
            <h2 className="font-serif text-2xl font-semibold text-[#1B2A41]">
              Contact Agent
            </h2>
            <div className="mt-5 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-full bg-[#E8DCC4]/40">
                <Image
                  src={property.agent.photo}
                  alt={property.agent.name}
                  fill
                  unoptimized
                  sizes="64px"
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-[#1B2A41]">
                  {property.agent.name}
                </p>
                <p className="text-sm text-[#6B7280]">Listing Agent</p>
              </div>
            </div>

            <dl className="mt-6 space-y-3 text-sm text-[#3D4F63]">
              <div>
                <dt className="font-semibold text-[#1B2A41]">Phone</dt>
                <dd className="mt-1">
                  <a
                    href={`tel:${property.agent.phone.replace(/[^0-9+]/g, "")}`}
                    className="transition-colors hover:text-[#1B2A41]"
                  >
                    {property.agent.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-[#1B2A41]">Email</dt>
                <dd className="mt-1">
                  <a
                    href={`mailto:${property.agent.email}`}
                    className="transition-colors hover:text-[#1B2A41]"
                  >
                    {property.agent.email}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-8 flex flex-col gap-3">
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm bg-[#C4A962] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors hover:bg-[#E8DCC4]"
              >
                Contact Agent
              </a>
              <a
                href="/contact"
                className="inline-flex items-center justify-center rounded-sm border border-[#E8DCC4]/80 bg-[#FAFAF8] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#3D4F63] transition-colors hover:border-[#C4A962]"
              >
                Schedule Viewing
              </a>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
