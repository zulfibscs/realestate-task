"use client";

import { useState } from "react";

import type {
  ListingType,
  PropertyFilters,
  PropertyType,
} from "@/types/property";

type PropertySearchProps = {
  onSearch: (filters: PropertyFilters) => void;
  onReset: () => void;
};

type SearchFormState = {
  listingType: ListingType | "";
  location: string;
  propertyType: PropertyType | "";
  minPrice: string;
  maxPrice: string;
  bedrooms: string;
  bathrooms: string;
};

const initialFormState: SearchFormState = {
  listingType: "",
  location: "",
  propertyType: "",
  minPrice: "",
  maxPrice: "",
  bedrooms: "",
  bathrooms: "",
};

const propertyTypes: PropertyType[] = [
  "House",
  "Condo",
  "Townhouse",
  "Apartment",
  "Villa",
];

const bedroomOptions = ["1", "2", "3", "4", "5"];
const bathroomOptions = ["1", "1.5", "2", "2.5", "3", "3.5", "4"];

function parseOptionalNumber(value: string): number | undefined {
  if (value.trim() === "") {
    return undefined;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : undefined;
}

function formStateToFilters(form: SearchFormState): PropertyFilters {
  return {
    listingType: form.listingType || undefined,
    location: form.location.trim() || undefined,
    propertyType: form.propertyType || undefined,
    minPrice: parseOptionalNumber(form.minPrice),
    maxPrice: parseOptionalNumber(form.maxPrice),
    bedrooms: parseOptionalNumber(form.bedrooms),
    bathrooms: parseOptionalNumber(form.bathrooms),
  };
}

const fieldClassName =
  "w-full rounded-sm border border-[#E8DCC4]/80 bg-white px-3 py-2.5 text-sm text-[#2C2C2C] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]";

const labelClassName =
  "mb-1.5 block text-sm font-medium text-[#1B2A41]";

/*
 * PropertySearch owns only the interactive controls, while the parent listing
 * view decides how filtered properties are presented. That keeps the search UI
 * reusable and makes it easy to swap in API-backed data later.
 */
export default function PropertySearch({
  onSearch,
  onReset,
}: PropertySearchProps) {
  const [formState, setFormState] = useState<SearchFormState>(initialFormState);

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch(formStateToFilters(formState));
  };

  const handleReset = () => {
    setFormState(initialFormState);
    onReset();
  };

  const updateField = <K extends keyof SearchFormState>(
    key: K,
    value: SearchFormState[K]
  ) => {
    setFormState((current) => ({ ...current, [key]: value }));
  };

  return (
    <div>
      <form
        onSubmit={handleSearch}
        className="rounded-sm border border-[#E8DCC4]/60 bg-white p-6"
      >
        <fieldset>
          <legend className="sr-only">Property search filters</legend>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
            <div className="md:col-span-2 lg:col-span-4">
              <span className={labelClassName}>Listing Type</span>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    { value: "", label: "All" },
                    { value: "buy", label: "Buy" },
                    { value: "rent", label: "Rent" },
                  ] as const
                ).map(({ value, label }) => (
                  <button
                    key={label}
                    type="button"
                    aria-pressed={formState.listingType === value}
                    onClick={() => updateField("listingType", value)}
                    className={`rounded-sm px-4 py-2 text-sm font-semibold uppercase tracking-wide transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962] ${
                      formState.listingType === value
                        ? "bg-[#1B2A41] text-white"
                        : "border border-[#E8DCC4]/80 bg-[#FAFAF8] text-[#3D4F63] hover:border-[#C4A962]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="location" className={labelClassName}>
                Location
              </label>
              <input
                id="location"
                type="text"
                value={formState.location}
                onChange={(event) => updateField("location", event.target.value)}
                placeholder="e.g. Perry, GA"
                className={fieldClassName}
              />
            </div>

            <div>
              <label htmlFor="propertyType" className={labelClassName}>
                Property Type
              </label>
              <select
                id="propertyType"
                value={formState.propertyType}
                onChange={(event) =>
                  updateField(
                    "propertyType",
                    event.target.value as PropertyType | ""
                  )
                }
                className={fieldClassName}
              >
                <option value="">All types</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="minPrice" className={labelClassName}>
                Min Price
              </label>
              <input
                id="minPrice"
                type="number"
                min={0}
                value={formState.minPrice}
                onChange={(event) => updateField("minPrice", event.target.value)}
                placeholder="Min"
                className={fieldClassName}
              />
            </div>

            <div>
              <label htmlFor="maxPrice" className={labelClassName}>
                Max Price
              </label>
              <input
                id="maxPrice"
                type="number"
                min={0}
                value={formState.maxPrice}
                onChange={(event) => updateField("maxPrice", event.target.value)}
                placeholder="Max"
                className={fieldClassName}
              />
            </div>

            <div>
              <label htmlFor="bedrooms" className={labelClassName}>
                Bedrooms
              </label>
              <select
                id="bedrooms"
                value={formState.bedrooms}
                onChange={(event) => updateField("bedrooms", event.target.value)}
                className={fieldClassName}
              >
                <option value="">Any</option>
                {bedroomOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}+
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="bathrooms" className={labelClassName}>
                Bathrooms
              </label>
              <select
                id="bathrooms"
                value={formState.bathrooms}
                onChange={(event) => updateField("bathrooms", event.target.value)}
                className={fieldClassName}
              >
                <option value="">Any</option>
                {bathroomOptions.map((value) => (
                  <option key={value} value={value}>
                    {value}+
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="rounded-sm bg-[#C4A962] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors hover:bg-[#E8DCC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A41]"
          >
            Search
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="rounded-sm border border-[#E8DCC4]/80 bg-[#FAFAF8] px-6 py-2.5 text-sm font-semibold uppercase tracking-wide text-[#3D4F63] transition-colors hover:border-[#C4A962] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
          >
            Reset Filters
          </button>
        </div>
      </form>
    </div>
  );
}
