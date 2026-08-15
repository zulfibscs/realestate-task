"use client";

import { useEffect, useRef, useState } from "react";

import type { ListingType, PropertyFilters, PropertyType } from "@/types/property";

type ViewMode = "list" | "map";

type PropertySearchProps = {
  filters: PropertyFilters;
  resultCount: number;
  viewMode: ViewMode;
  onFiltersChange: (filters: PropertyFilters) => void;
  onReset: () => void;
  onViewModeChange: (mode: ViewMode) => void;
};

type PopoverKey =
  | "type"
  | "price"
  | "property"
  | "beds"
  | "baths"
  | "all"
  | null;

const propertyTypes: Array<{ value: PropertyType; label: string; icon: string }> = [
  { value: "House", label: "Residential", icon: "⌂" },
  { value: "Townhouse", label: "Townhomes", icon: "▤" },
  { value: "Co-op", label: "Co-op", icon: "⌂" },
  { value: "Multi-family", label: "Multi-family", icon: "▥" },
  { value: "Condo", label: "Condos", icon: "▦" },
  { value: "Commercial", label: "Commercial", icon: "⌂" },
  { value: "Manufactured", label: "Manufactured", icon: "⌂" },
  { value: "Land", label: "Land", icon: "◱" },
  { value: "Other", label: "Other", icon: "⌂" },
];

const bedOptions = [
  { label: "Any", value: undefined },
  { label: "Studio", value: 0 },
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5+", value: 5 },
];

const bathOptions = [
  { label: "Any", value: undefined },
  { label: "1", value: 1 },
  { label: "1.5", value: 1.5 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "5+", value: 5 },
];

const buttonClass =
  "min-h-10 whitespace-nowrap rounded-md border border-[#E2E2E2] bg-white px-4 text-sm font-medium text-black shadow-sm transition-colors hover:bg-[#F8F8F8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black";

function parseNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) && value.trim() !== "" ? parsed : undefined;
}

function priceLabel(filters: PropertyFilters) {
  if (!filters.minPrice && !filters.maxPrice) return "Any price";
  return `$${filters.minPrice ?? "0"} - $${filters.maxPrice ?? "Any"}`;
}

function bedsLabel(filters: PropertyFilters) {
  if (filters.bedrooms === undefined) return "All beds";
  return filters.bedrooms >= 5 ? "5+ beds" : `${filters.bedrooms} beds`;
}

function bathsLabel(filters: PropertyFilters) {
  if (filters.bathrooms === undefined) return "All baths";
  return filters.bathrooms >= 5 ? "5+ baths" : `${filters.bathrooms} baths`;
}

function propertyLabel(filters: PropertyFilters) {
  const selected = filters.propertyTypes?.[0] ?? filters.propertyType;
  return selected
    ? propertyTypes.find((type) => type.value === selected)?.label ?? selected
    : "All property types";
}

export default function PropertySearch({
  filters,
  resultCount,
  viewMode,
  onFiltersChange,
  onReset,
  onViewModeChange,
}: PropertySearchProps) {
  const [openPopover, setOpenPopover] = useState<PopoverKey>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [saved, setSaved] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpenPopover(null);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenPopover(null);
        setMobileFiltersOpen(false);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileFiltersOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileFiltersOpen]);

  const selectedPropertyType = filters.propertyTypes?.[0] ?? filters.propertyType;

  const update = (next: PropertyFilters) => {
    onFiltersChange({ ...filters, ...next });
  };

  const popover = (() => {
    if (openPopover === "type") {
      return (
        <div className="absolute left-0 top-12 z-[120] w-72 overflow-hidden rounded-xl bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.16)]">
          {(["buy", "rent"] as ListingType[]).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => {
                update({ listingType: type });
                setOpenPopover(null);
              }}
              className={`flex min-h-12 w-full items-center justify-between rounded-lg px-4 text-left text-sm font-medium ${
                filters.listingType === type ? "bg-[#F3F3F3]" : "hover:bg-[#F8F8F8]"
              }`}
            >
              {type === "buy" ? "For sale" : "For rent"}
              {filters.listingType === type ? <span>✓</span> : null}
            </button>
          ))}
        </div>
      );
    }

    if (openPopover === "price") {
      return (
        <div className="absolute left-0 top-12 z-[120] w-[32rem] max-w-[calc(100vw-2rem)] rounded-xl bg-white p-4 shadow-[0_12px_40px_rgba(0,0,0,0.16)]">
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <input
              type="number"
              placeholder="No min"
              value={filters.minPrice ?? ""}
              onChange={(event) => update({ minPrice: parseNumber(event.target.value) })}
              className="min-h-12 rounded-lg border border-[#DADADA] px-4 text-sm outline-none focus:border-black"
            />
            <span className="text-sm text-[#777]">to</span>
            <input
              type="number"
              placeholder="No max"
              value={filters.maxPrice ?? ""}
              onChange={(event) => update({ maxPrice: parseNumber(event.target.value) })}
              className="min-h-12 rounded-lg border border-[#DADADA] px-4 text-sm outline-none focus:border-black"
            />
          </div>
          <input
            type="range"
            min={0}
            max={1000000}
            step={25000}
            value={filters.maxPrice ?? 1000000}
            onChange={(event) => update({ maxPrice: Number(event.target.value) })}
            aria-label="Maximum price"
            className="mt-5 w-full accent-black"
          />
        </div>
      );
    }

    if (openPopover === "property") {
      return (
        <div className="absolute left-0 top-12 z-[120] w-[25rem] max-w-[calc(100vw-2rem)] rounded-xl bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.16)]">
          <div className="grid grid-cols-3 gap-3">
            {propertyTypes.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => update({ propertyTypes: [type.value] })}
                className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-lg border text-sm ${
                  selectedPropertyType === type.value
                    ? "border-black bg-black text-white"
                    : "border-[#E2E2E2] bg-white hover:bg-[#F8F8F8]"
                }`}
              >
                <span className="text-lg">{type.icon}</span>
                {type.label}
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (openPopover === "beds" || openPopover === "baths") {
      const options = openPopover === "beds" ? bedOptions : bathOptions;
      const current = openPopover === "beds" ? filters.bedrooms : filters.bathrooms;

      return (
        <div className="absolute right-0 top-12 z-[120] flex gap-2 rounded-xl bg-white p-3 shadow-[0_12px_40px_rgba(0,0,0,0.16)]">
          {options.map((option) => (
            <button
              key={option.label}
              type="button"
              onClick={() =>
                update(
                  openPopover === "beds"
                    ? { bedrooms: option.value }
                    : { bathrooms: option.value }
                )
              }
              className={`min-h-11 min-w-12 rounded-lg px-4 text-sm font-semibold ${
                current === option.value
                  ? "bg-black text-white"
                  : "bg-[#F1F1F1] text-black hover:bg-[#E8E8E8]"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      );
    }

    if (openPopover === "all") {
      return (
        <div className="absolute right-0 top-12 z-[120] w-[42rem] max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl bg-white shadow-[0_16px_48px_rgba(0,0,0,0.18)]">
          <div className="flex items-center justify-between border-b border-[#E8E8E8] px-5 py-4">
            <h2 className="text-base font-semibold text-black">Filters</h2>
            <button
              type="button"
              aria-label="Close filters"
              onClick={() => setOpenPopover(null)}
              className="flex h-9 w-9 items-center justify-center rounded-full text-xl hover:bg-[#F5F5F5]"
            >
              x
            </button>
          </div>

          <div className="max-h-[65vh] overflow-y-auto px-5 py-5">
            <div className="rounded-full bg-[#F2F2F2] p-1">
              <div className="grid grid-cols-2">
                {(["buy", "rent"] as ListingType[]).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => update({ listingType: type })}
                    className={`min-h-10 rounded-full text-sm font-medium ${
                      filters.listingType === type ? "bg-white shadow-sm" : ""
                    }`}
                  >
                    {type === "buy" ? "For sale" : "For rent"}
                  </button>
                ))}
              </div>
            </div>

            <DesktopFilterSection title="Price">
              <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                <input
                  type="number"
                  placeholder="No min"
                  value={filters.minPrice ?? ""}
                  onChange={(event) =>
                    update({ minPrice: parseNumber(event.target.value) })
                  }
                  className="h-12 min-w-0 rounded-lg border border-[#DADADA] px-4 text-sm outline-none focus:border-black"
                />
                <span className="text-sm text-[#777]">to</span>
                <input
                  type="number"
                  placeholder="No max"
                  value={filters.maxPrice ?? ""}
                  onChange={(event) =>
                    update({ maxPrice: parseNumber(event.target.value) })
                  }
                  className="h-12 min-w-0 rounded-lg border border-[#DADADA] px-4 text-sm outline-none focus:border-black"
                />
              </div>
              <input
                type="range"
                min={0}
                max={1000000}
                step={25000}
                value={filters.maxPrice ?? 1000000}
                onChange={(event) =>
                  update({ maxPrice: Number(event.target.value) })
                }
                aria-label="Maximum price"
                className="mt-4 w-full accent-black"
              />
            </DesktopFilterSection>

            <DesktopFilterSection title="Property types">
              <div className="grid grid-cols-3 gap-3">
                {propertyTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => update({ propertyTypes: [type.value] })}
                    className={`flex min-h-20 flex-col items-center justify-center gap-2 rounded-lg border text-sm ${
                      selectedPropertyType === type.value
                        ? "border-black bg-black text-white"
                        : "border-[#E2E2E2] bg-white hover:bg-[#F8F8F8]"
                    }`}
                  >
                    <span className="text-lg">{type.icon}</span>
                    {type.label}
                  </button>
                ))}
              </div>
            </DesktopFilterSection>

            <DesktopFilterSection title="Bedrooms">
              <OptionRow
                options={bedOptions}
                current={filters.bedrooms}
                onSelect={(value) => update({ bedrooms: value })}
              />
            </DesktopFilterSection>

            <DesktopFilterSection title="Bathrooms">
              <OptionRow
                options={bathOptions}
                current={filters.bathrooms}
                onSelect={(value) => update({ bathrooms: value })}
              />
            </DesktopFilterSection>
          </div>

          <div className="flex items-center justify-between gap-3 border-t border-[#E8E8E8] bg-white px-5 py-4">
            <button
              type="button"
              onClick={() => {
                onReset();
                setOpenPopover(null);
              }}
              className="min-h-11 rounded-md border border-[#E2E2E2] px-4 text-sm font-semibold"
            >
              Reset filters
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setSaved(true)}
                className="min-h-11 rounded-md bg-[#F3F3F3] px-4 text-sm font-semibold"
              >
                Save search
              </button>
              <button
                type="button"
                onClick={() => setOpenPopover(null)}
                className="min-h-11 rounded-md bg-black px-5 text-sm font-semibold text-white"
              >
                See {resultCount} properties
              </button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  })();

  return (
    <div
      ref={rootRef}
      className="sticky top-[108px] z-[100] border-b border-[#E5E5E5] bg-[#F7F7F7]/98 px-4 py-3 shadow-sm backdrop-blur"
    >
      <div className="flex min-w-0 flex-col gap-3 xl:flex-row xl:items-center">
        <div className="relative min-w-0 flex-1 xl:max-w-[28rem]">
          <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-black">
            <svg aria-hidden="true" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M20 20l-4-4" />
            </svg>
          </span>
          <label htmlFor="listing-location" className="sr-only">
            City, neighborhood, ZIP code
          </label>
          <input
            id="listing-location"
            type="search"
            value={filters.location ?? ""}
            onChange={(event) => update({ location: event.target.value })}
            placeholder="City, neighborhood, ZIP code..."
            className="h-10 w-full rounded-md border border-[#E2E2E2] bg-white pl-10 pr-4 text-sm text-black shadow-sm outline-none placeholder:text-[#65717D] focus:border-black"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
          <div className="relative">
            <button type="button" onClick={() => setOpenPopover(openPopover === "type" ? null : "type")} className={buttonClass}>
              {filters.listingType === "rent" ? "For rent" : "For sale"}
            </button>
            {openPopover === "type" ? popover : null}
          </div>
          <div className="relative">
            <button type="button" onClick={() => setOpenPopover(openPopover === "price" ? null : "price")} className={buttonClass}>
              {priceLabel(filters)}
            </button>
            {openPopover === "price" ? popover : null}
          </div>
          <div className="relative">
            <button type="button" onClick={() => setOpenPopover(openPopover === "property" ? null : "property")} className={buttonClass}>
              {propertyLabel(filters)}
            </button>
            {openPopover === "property" ? popover : null}
          </div>
          <div className="relative">
            <button type="button" onClick={() => setOpenPopover(openPopover === "beds" ? null : "beds")} className={buttonClass}>
              {bedsLabel(filters)}
            </button>
            {openPopover === "beds" ? popover : null}
          </div>
          <div className="relative">
            <button type="button" onClick={() => setOpenPopover(openPopover === "baths" ? null : "baths")} className={buttonClass}>
              {bathsLabel(filters)}
            </button>
            {openPopover === "baths" ? popover : null}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden rounded-full bg-white p-1 shadow-sm sm:flex">
            {(["list", "map"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => onViewModeChange(mode)}
                className={`min-h-8 rounded-full px-4 text-sm font-semibold capitalize ${
                  viewMode === mode ? "bg-white shadow" : "text-black"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
          <div className="relative hidden md:block">
            <button
              type="button"
              onClick={() =>
                setOpenPopover(openPopover === "all" ? null : "all")
              }
              className={buttonClass}
            >
              All filters
            </button>
            {openPopover === "all" ? popover : null}
          </div>
          <button
            type="button"
            onClick={() => setMobileFiltersOpen(true)}
            className={`${buttonClass} md:hidden`}
          >
            All filters
          </button>
          <button
            type="button"
            onClick={() => setSaved((current) => !current)}
            className="min-h-10 whitespace-nowrap rounded-md bg-black px-4 text-sm font-semibold text-white shadow-sm"
          >
            {saved ? "Saved" : "Save search"}
          </button>
        </div>
      </div>

      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-[90] bg-white md:flex md:items-center md:justify-center md:bg-black/35 md:p-6">
          <section className="flex h-full w-full flex-col overflow-hidden bg-white md:max-h-[88vh] md:max-w-2xl md:rounded-xl">
            <div className="sticky top-0 flex h-14 items-center justify-center border-b border-[#E5E5E5] bg-white px-4">
              <h2 className="text-base font-semibold text-black">Filters</h2>
              <button
                type="button"
                aria-label="Close filters"
                onClick={() => setMobileFiltersOpen(false)}
                className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center text-2xl text-black"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-4 py-5">
              <div className="rounded-full bg-[#F2F2F2] p-1">
                <div className="grid grid-cols-2">
                  {(["buy", "rent"] as ListingType[]).map((type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => update({ listingType: type })}
                      className={`min-h-9 rounded-full text-sm font-medium ${
                        filters.listingType === type ? "bg-white shadow-sm" : ""
                      }`}
                    >
                      {type === "buy" ? "For sale" : "For rent"}
                    </button>
                  ))}
                </div>
              </div>

              <input
                type="search"
                placeholder="Search for a filter..."
                value={filters.keyword ?? ""}
                onChange={(event) => update({ keyword: event.target.value })}
                className="mt-6 h-11 w-full rounded-md border border-[#DADADA] px-4 text-sm outline-none focus:border-black"
              />

              <MobileSection title="Price">
                <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                  <input
                    type="number"
                    placeholder="No min"
                    value={filters.minPrice ?? ""}
                    onChange={(event) => update({ minPrice: parseNumber(event.target.value) })}
                    className="h-12 min-w-0 rounded-lg border border-[#DADADA] px-4 text-sm"
                  />
                  <span className="text-sm text-[#777]">to</span>
                  <input
                    type="number"
                    placeholder="No max"
                    value={filters.maxPrice ?? ""}
                    onChange={(event) => update({ maxPrice: parseNumber(event.target.value) })}
                    className="h-12 min-w-0 rounded-lg border border-[#DADADA] px-4 text-sm"
                  />
                </div>
                <input
                  type="range"
                  min={0}
                  max={1000000}
                  step={25000}
                  value={filters.maxPrice ?? 1000000}
                  onChange={(event) => update({ maxPrice: Number(event.target.value) })}
                  className="mt-4 w-full accent-black"
                />
              </MobileSection>

              <MobileSection title="Bedrooms">
                <OptionRow options={bedOptions} current={filters.bedrooms} onSelect={(value) => update({ bedrooms: value })} />
              </MobileSection>

              <MobileSection title="Bathrooms">
                <OptionRow options={bathOptions} current={filters.bathrooms} onSelect={(value) => update({ bathrooms: value })} />
              </MobileSection>
            </div>
            <div className="sticky bottom-0 grid grid-cols-[auto_1fr_1.2fr] gap-2 border-t border-[#E5E5E5] bg-white p-3">
              <button type="button" onClick={onReset} className="min-h-11 rounded-md border border-[#E2E2E2] px-3 text-sm font-semibold">
                Reset filters
              </button>
              <button type="button" onClick={() => setSaved(true)} className="min-h-11 rounded-md bg-[#F3F3F3] px-3 text-sm font-semibold">
                Save search
              </button>
              <button type="button" onClick={() => setMobileFiltersOpen(false)} className="min-h-11 rounded-md bg-black px-3 text-sm font-semibold text-white">
                See {resultCount} properties
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

function MobileSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 border-t border-[#E5E5E5] pt-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-black">{title}</h3>
        <span className="text-xl">⌄</span>
      </div>
      {children}
    </section>
  );
}

function DesktopFilterSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-6 border-t border-[#E5E5E5] pt-5 first:border-t-0 first:pt-0">
      <h3 className="mb-4 text-base font-semibold text-black">{title}</h3>
      {children}
    </section>
  );
}

function OptionRow({
  options,
  current,
  onSelect,
}: {
  options: Array<{ label: string; value?: number }>;
  current?: number;
  onSelect: (value?: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => (
        <button
          key={option.label}
          type="button"
          onClick={() => onSelect(option.value)}
          className={`min-h-10 min-w-12 rounded-lg px-4 text-sm font-semibold ${
            current === option.value ? "bg-black text-white" : "bg-[#F1F1F1] text-black"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
