"use client";

import { useMemo, useState } from "react";

import PropertyCard from "@/components/property/PropertyCard";
import PropertySearch from "@/components/property/PropertySearch";
import { filterProperties } from "@/lib/filterProperties";
import type { Property, PropertyFilters } from "@/types/property";

type PropertyListingsProps = {
  properties: Property[];
};

/*
 * The search component owns the filter inputs, while this listing view applies
 * the shared filter utility and renders results. That separation keeps the
 * controls reusable and makes a future API-backed data source easier to adopt.
 */
export default function PropertyListings({
  properties,
}: PropertyListingsProps) {
  const [appliedFilters, setAppliedFilters] = useState<PropertyFilters>({});

  const results = useMemo(
    () => filterProperties(properties, appliedFilters),
    [properties, appliedFilters]
  );

  return (
    <div>
      <PropertySearch
        onSearch={setAppliedFilters}
        onReset={() => setAppliedFilters({})}
      />

      <p className="mt-8 text-sm font-medium text-[#3D4F63]">
        Showing {results.length} of {properties.length} properties
      </p>

      {results.length === 0 ? (
        <div className="mt-8 rounded-sm border border-dashed border-[#E8DCC4] bg-white px-6 py-12 text-center">
          <p className="font-serif text-xl font-semibold text-[#1B2A41]">
            No properties match your filters
          </p>
          <p className="mt-2 text-sm text-[#6B7280]">
            Try adjusting your search criteria or reset filters to see all
            listings.
          </p>
        </div>
      ) : (
        <ul className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((property) => (
            <li key={property.id}>
              <PropertyCard property={property} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
