"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import PropertyCard from "@/components/property/PropertyCard";
import PropertySearch from "@/components/property/PropertySearch";
import { filterProperties } from "@/lib/filterProperties";
import type { Property, PropertyFilters } from "@/types/property";
import PropertyMapPanel from "./PropertyMapPanel";

type PropertyListingsProps = {
  properties: Property[];
};

type SortOrder = "newest" | "oldest" | "price-desc" | "price-asc" | "sqft";
type ViewMode = "list" | "map";

const sortOptions: Array<{ value: SortOrder; label: string }> = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "price-desc", label: "Price (high to low)" },
  { value: "price-asc", label: "Price (low to high)" },
  { value: "sqft", label: "Square feet" },
];

/*
 * The search component owns the filter inputs, while this listing view applies
 * the shared filter utility and renders results. That separation keeps the
 * controls reusable and makes a future API-backed data source easier to adopt.
 */
export default function PropertyListings({
  properties,
}: PropertyListingsProps) {
  const [appliedFilters, setAppliedFilters] = useState<PropertyFilters>({});
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  const [viewMode, setViewMode] = useState<ViewMode>("map");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const results = useMemo(
    () => filterProperties(properties, appliedFilters),
    [properties, appliedFilters]
  );

  const sortedResults = useMemo(() => {
    const ordered = [...results];

    if (sortOrder === "price-desc") {
      ordered.sort((left, right) => right.price - left.price);
    } else if (sortOrder === "price-asc") {
      ordered.sort((left, right) => left.price - right.price);
    } else if (sortOrder === "oldest") {
      ordered.reverse();
    } else if (sortOrder === "sqft") {
      ordered.sort((left, right) => right.area - left.area);
    }

    return ordered;
  }, [results, sortOrder]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!sortRef.current?.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsSortOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  const selectedSortLabel =
    sortOptions.find((option) => option.value === sortOrder)?.label ?? "Newest";

  return (
    <div className="bg-white text-black">
      <PropertySearch
        filters={appliedFilters}
        resultCount={sortedResults.length}
        viewMode={viewMode}
        onFiltersChange={setAppliedFilters}
        onReset={() => {
          setAppliedFilters({});
        }}
        onViewModeChange={setViewMode}
      />

      <div
        className={`min-h-[calc(100vh-170px)] ${
          viewMode === "map"
            ? "lg:grid lg:grid-cols-[minmax(24rem,28.5rem)_minmax(0,1fr)]"
            : "block"
        }`}
      >
        <section
          aria-labelledby="listing-results-heading"
          className={`min-w-0 bg-white ${
            viewMode === "map"
              ? "border-r border-[#E1E1E1] lg:max-h-[calc(100vh-170px)] lg:overflow-y-auto"
              : ""
          }`}
        >
          <div className="sticky top-0 z-30 flex items-start justify-between gap-4 border-b border-[#EFEFEF] bg-white px-4 py-5">
            <div>
              <h1
                id="listing-results-heading"
                className="text-xl font-bold leading-tight text-black"
              >
                Real Estate &amp; Homes for Sale
              </h1>
              <p className="mt-1 text-sm text-[#6F6F6F]">
                {sortedResults.length} result
                {sortedResults.length === 1 ? "" : "s"}
              </p>
            </div>

            <div ref={sortRef} className="relative shrink-0">
              <button
                type="button"
                onClick={() => setIsSortOpen((open) => !open)}
                className="inline-flex min-h-10 items-center gap-2 rounded-md px-2 text-sm font-semibold text-black hover:bg-[#F5F5F5] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                {selectedSortLabel}
                <span aria-hidden="true">⌄</span>
              </button>
              {isSortOpen ? (
                <div className="absolute right-0 top-12 z-30 w-64 rounded-xl bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.16)]">
                  {sortOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => {
                        setSortOrder(option.value);
                        setIsSortOpen(false);
                      }}
                      className={`flex min-h-12 w-full items-center justify-between rounded-lg px-4 text-left text-sm ${
                        sortOrder === option.value
                          ? "bg-[#F3F3F3] font-semibold"
                          : "hover:bg-[#F8F8F8]"
                      }`}
                    >
                      {option.label}
                      {sortOrder === option.value ? <span>✓</span> : null}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          {sortedResults.length === 0 ? (
            <div className="mx-4 rounded-xl border border-dashed border-[#DADADA] bg-white px-6 py-12 text-center">
              <p className="text-lg font-semibold text-black">
                No properties match your filters
              </p>
              <p className="mt-2 text-sm text-[#6F6F6F]">
                Try adjusting your search criteria.
              </p>
            </div>
          ) : (
            <ul
              className={`grid gap-6 px-4 pb-8 ${
                viewMode === "map"
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
              }`}
            >
              {sortedResults.map((property) => (
                <li key={property.id}>
                  <PropertyCard property={property} />
                </li>
              ))}
            </ul>
          )}
        </section>

        {viewMode === "map" ? (
          <PropertyMapPanel properties={sortedResults} />
        ) : null}
      </div>
    </div>
  );
}
