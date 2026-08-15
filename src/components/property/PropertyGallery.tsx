"use client";

import Image from "next/image";
import { useState } from "react";

type PropertyGalleryProps = {
  images: string[];
  title: string;
};

/*
 * The gallery is the only interactive part of the detail page, so the client
 * boundary stays here instead of forcing the full property page into the browser.
 */
export default function PropertyGallery({ images, title }: PropertyGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <div className="overflow-hidden rounded-sm border border-[#E8DCC4]/60 bg-white">
      <div className="relative aspect-[16/10] bg-[#E8DCC4]/20">
        <Image
          src={activeImage}
          alt={title}
          fill
          priority
          unoptimized
          sizes="(max-width: 1024px) 100vw, 70vw"
          className="object-cover"
        />
      </div>

      <div className="grid grid-cols-3 gap-3 border-t border-[#E8DCC4]/40 p-3 sm:grid-cols-4">
        {images.map((image, index) => {
          const isActive = image === activeImage;

          return (
            <button
              key={`${title}-${image}`}
              type="button"
              aria-label={`Show ${title} image ${index + 1}`}
              aria-pressed={isActive}
              onClick={() => setActiveImage(image)}
              className={`relative aspect-[4/3] overflow-hidden rounded-sm bg-[#E8DCC4]/20 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962] ${
                isActive
                  ? "ring-2 ring-[#C4A962] ring-offset-2"
                  : "opacity-85 hover:opacity-100"
              }`}
            >
              <Image
                src={image}
                alt={`${title} thumbnail ${index + 1}`}
                fill
                unoptimized
                sizes="(max-width: 1024px) 33vw, 18vw"
                className="object-cover"
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
