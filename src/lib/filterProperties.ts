import type { Property, PropertyFilters } from "@/types/property";

/*
 * Filtering logic is isolated from any UI component so the same function can later
 * be swapped for an API call without touching the presentation layer.
 */

export function filterProperties(
  properties: Property[],
  filters: PropertyFilters
): Property[] {
  return properties.filter((property) => {
    if (filters.listingType && property.listingType !== filters.listingType) {
      return false;
    }

    if (
      filters.location &&
      !property.location.toLowerCase().includes(filters.location.toLowerCase())
    ) {
      return false;
    }

    if (
      filters.propertyType &&
      property.propertyType !== filters.propertyType
    ) {
      return false;
    }

    if (filters.minPrice !== undefined && property.price < filters.minPrice) {
      return false;
    }

    if (filters.maxPrice !== undefined && property.price > filters.maxPrice) {
      return false;
    }

    if (
      filters.bedrooms !== undefined &&
      property.bedrooms < filters.bedrooms
    ) {
      return false;
    }

    if (
      filters.bathrooms !== undefined &&
      property.bathrooms < filters.bathrooms
    ) {
      return false;
    }

    return true;
  });
}
