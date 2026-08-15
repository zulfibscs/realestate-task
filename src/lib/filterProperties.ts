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

    if (
      filters.propertyTypes?.length &&
      !filters.propertyTypes.includes(property.propertyType)
    ) {
      return false;
    }

    if (
      filters.statuses?.length &&
      !filters.statuses.includes(property.status ?? "Active")
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

    if (filters.minArea !== undefined && property.area < filters.minArea) {
      return false;
    }

    if (filters.maxArea !== undefined && property.area > filters.maxArea) {
      return false;
    }

    if (
      filters.minLotSize !== undefined &&
      (property.lotSizeAcres ?? 0) < filters.minLotSize
    ) {
      return false;
    }

    if (
      filters.maxLotSize !== undefined &&
      (property.lotSizeAcres ?? 0) > filters.maxLotSize
    ) {
      return false;
    }

    if (
      filters.minYearBuilt !== undefined &&
      (property.yearBuilt ?? 0) < filters.minYearBuilt
    ) {
      return false;
    }

    if (
      filters.maxYearBuilt !== undefined &&
      (property.yearBuilt ?? new Date().getFullYear()) > filters.maxYearBuilt
    ) {
      return false;
    }

    if (
      filters.garageSpaces !== undefined &&
      (property.garageSpaces ?? 0) < filters.garageSpaces
    ) {
      return false;
    }

    if (
      filters.stories !== undefined &&
      (property.stories ?? 1) < filters.stories
    ) {
      return false;
    }

    if (filters.openHouse && !property.openHouse) {
      return false;
    }

    if (
      filters.amenities?.length &&
      !filters.amenities.every((amenity) =>
        property.amenities.some((propertyAmenity) =>
          propertyAmenity.toLowerCase().includes(amenity.toLowerCase())
        )
      )
    ) {
      return false;
    }

    if (filters.keyword) {
      const haystack = [
        property.title,
        property.location,
        property.propertyType,
        property.description,
        ...property.features,
        ...property.amenities,
      ]
        .join(" ")
        .toLowerCase();

      if (!haystack.includes(filters.keyword.toLowerCase())) {
        return false;
      }
    }

    return true;
  });
}
