"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

import { formatArea, formatPrice } from "@/lib/format";
import type { Property } from "@/types/property";

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [shareMessage, setShareMessage] = useState("");
  const mlsNumber = property.mlsNumber ?? property.id.toUpperCase();

  const handleShare = async () => {
    const path = `/properties/${property.id}`;
    const shareUrl =
      typeof window === "undefined"
        ? path
        : `${window.location.origin}${path}`;

    if (navigator.share) {
      await navigator.share({
        title: property.title,
        text: property.location,
        url: shareUrl,
      });
      return;
    }

    await navigator.clipboard?.writeText(shareUrl);
    setShareMessage("Link copied");
    window.setTimeout(() => setShareMessage(""), 1800);
  };

  return (
    <article className="group bg-white">
      <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-[#E8DCC4]/30">
        <Link
          href={`/properties/${property.id}`}
          className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
        >
          {/* Below-the-fold listing cards should stay cheap to render, so the image stays lazy-loaded even when the card is reused in grids. */}
          <Image
            src={property.images[0]}
            alt={property.title}
            fill
            loading="lazy"
            unoptimized
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </Link>
        <span className="absolute left-3 top-3 rounded-sm bg-[#1B2A41] px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-white">
          {property.status ?? "Active"}
        </span>
        <div className="absolute right-3 top-3 flex gap-2">
          <button
            type="button"
            aria-label={isSaved ? "Remove saved listing" : "Save listing"}
            aria-pressed={isSaved}
            onClick={() => setIsSaved((current) => !current)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-xl text-white shadow-sm transition-colors hover:bg-black"
          >
            {isSaved ? "♥" : "♡"}
          </button>
          <button
            type="button"
            aria-label="Share listing"
            onClick={handleShare}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-black/70 text-lg text-white shadow-sm transition-colors hover:bg-black"
          >
            ↗
          </button>
        </div>
        {shareMessage ? (
          <span className="absolute right-3 top-16 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#1B2A41] shadow-sm">
            {shareMessage}
          </span>
        ) : null}
      </div>

      <div className="pt-4">
        <Link
          href={`/properties/${property.id}`}
          className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-xl font-bold text-black">
              {formatPrice(property.price, property.listingType)}
            </p>
            <span
              aria-hidden="true"
              className="mt-1 text-xl leading-none text-black"
            >
              ...
            </span>
          </div>
          <p className="mt-2 text-base text-black">
            {property.bedrooms} bd · {property.bathrooms} ba ·{" "}
            {formatArea(property.area)}
          </p>
          <h3 className="mt-1 text-sm leading-6 text-black">
            {property.title}
          </h3>
          <p className="text-sm leading-6 text-black">{property.location}</p>
          <p className="mt-1 text-sm text-[#737373]">MLS®: {mlsNumber}</p>
        </Link>
      </div>
    </article>
  );
}
