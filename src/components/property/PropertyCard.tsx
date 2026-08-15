import Image from "next/image";
import Link from "next/link";

import { formatArea, formatPrice } from "@/lib/format";
import type { Property } from "@/types/property";

type PropertyCardProps = {
  property: Property;
};

function BedIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2v9a2 2 0 002 2z"
      />
    </svg>
  );
}

function BathIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 12h16M4 12v4a2 2 0 002 2h12a2 2 0 002-2v-4M8 12V8a2 2 0 012-2h4a2 2 0 012 2v4"
      />
    </svg>
  );
}

function AreaIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
      />
    </svg>
  );
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const listingLabel = property.listingType === "buy" ? "For Sale" : "For Rent";

  return (
    <article className="group overflow-hidden rounded-sm border border-[#E8DCC4]/60 bg-white transition-shadow hover:shadow-md">
      <Link
        href={`/properties/${property.id}`}
        className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-[#E8DCC4]/30">
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <span className="absolute left-3 top-3 rounded-sm bg-[#1B2A41] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
            {listingLabel}
          </span>
        </div>

        <div className="p-5">
          <p className="font-serif text-2xl font-semibold text-[#1B2A41]">
            {formatPrice(property.price, property.listingType)}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[#2C2C2C]">
            {property.title}
          </h3>
          <p className="mt-1 text-sm text-[#6B7280]">{property.location}</p>

          <ul className="mt-4 flex flex-wrap gap-4 text-sm text-[#3D4F63]">
            <li className="flex items-center gap-1.5">
              <BedIcon />
              <span>
                {property.bedrooms} {property.bedrooms === 1 ? "Bed" : "Beds"}
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <BathIcon />
              <span>
                {property.bathrooms}{" "}
                {property.bathrooms === 1 ? "Bath" : "Baths"}
              </span>
            </li>
            <li className="flex items-center gap-1.5">
              <AreaIcon />
              <span>{formatArea(property.area)}</span>
            </li>
          </ul>

          <span className="mt-5 inline-flex text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors group-hover:text-[#C4A962]">
            View Details
          </span>
        </div>
      </Link>
    </article>
  );
}
