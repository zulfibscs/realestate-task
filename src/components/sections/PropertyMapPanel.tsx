"use client";

import { useState } from "react";

import type { Property } from "@/types/property";

type PropertyMapPanelProps = {
  properties: Property[];
};

type MapLayer = "map" | "satellite";

const markerPositions = [
  { top: "18%", left: "16%" },
  { top: "34%", left: "38%" },
  { top: "22%", left: "66%" },
  { top: "58%", left: "48%" },
  { top: "74%", left: "72%" },
] as const;

const mapUrl =
  "https://www.openstreetmap.org/export/embed.html?bbox=-84.905%2C33.57%2C-84.03%2C34.18&layer=mapnik&marker=33.9526%2C-84.5499";

export default function PropertyMapPanel({ properties }: PropertyMapPanelProps) {
  const [layer, setLayer] = useState<MapLayer>("map");
  const [zoomLevel, setZoomLevel] = useState(10);
  const visibleMarkers = properties.slice(0, markerPositions.length);

  return (
    <aside className="hidden min-w-0 lg:block">
      <div className="sticky top-[169px] h-[calc(100vh-169px)] overflow-hidden bg-[#E9EFEA]">
        {layer === "map" ? (
          <iframe
            title="Property search map"
            src={mapUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 bg-[#1F2B24]">
            <div
              className="absolute inset-0 bg-repeat opacity-95"
              style={{
                backgroundImage:
                  "url('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/10/405/271')",
                backgroundSize: "512px 512px",
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_22%,rgba(255,255,255,0.14),transparent_24%),radial-gradient(circle_at_70%_65%,rgba(255,255,255,0.1),transparent_28%)]" />
          </div>
        )}

        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0))]" />

        <div className="absolute left-4 top-4 z-10">
          <button
            type="button"
            className="inline-flex min-h-10 items-center gap-2 rounded-md bg-white px-4 text-sm font-semibold text-black shadow-sm"
          >
            <span aria-hidden="true">D</span>
            Draw
          </button>
        </div>

        <div className="absolute right-4 top-4 z-10 flex overflow-hidden rounded-md bg-white shadow-sm">
          {(["map", "satellite"] as const).map((mode) => (
            <button
              key={mode}
              type="button"
              aria-pressed={layer === mode}
              onClick={() => setLayer(mode)}
              className={`min-h-10 px-5 text-sm font-semibold capitalize text-black ${
                layer === mode ? "bg-white" : "bg-[#F2F2F2]"
              } ${mode === "satellite" ? "border-l border-[#E6E6E6]" : ""}`}
            >
              {mode}
            </button>
          ))}
        </div>

        <div className="absolute left-4 bottom-4 z-10 overflow-hidden rounded-md bg-white shadow-sm">
          <button
            type="button"
            aria-label="Zoom in"
            onClick={() => setZoomLevel((current) => Math.min(current + 1, 14))}
            className="block h-11 w-11 text-2xl font-light"
          >
            +
          </button>
          <button
            type="button"
            aria-label="Zoom out"
            onClick={() => setZoomLevel((current) => Math.max(current - 1, 7))}
            className="block h-11 w-11 border-t border-[#E6E6E6] text-2xl font-light"
          >
            -
          </button>
        </div>

        <div className="absolute left-16 bottom-4 z-10 rounded-md bg-white px-3 py-2 text-xs font-semibold text-black shadow-sm">
          Zoom {zoomLevel}
        </div>

        {visibleMarkers.map((property, index) => (
          <div
            key={property.id}
            className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
            style={markerPositions[index]}
          >
            <div className="rounded-full bg-white px-3 py-1 text-xs font-bold text-black shadow-md">
              {property.price >= 1000000
                ? `$${(property.price / 1000000).toFixed(1)}M`
                : `${Math.round(property.price / 1000)}K`}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
}
