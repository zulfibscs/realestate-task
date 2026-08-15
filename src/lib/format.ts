import type { ListingType } from "@/types/property";

export function formatPrice(price: number, listingType: ListingType): string {
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);

  return listingType === "rent" ? `${formatted}/mo` : formatted;
}

export function formatArea(area: number): string {
  return `${area.toLocaleString("en-US")} sqft`;
}
