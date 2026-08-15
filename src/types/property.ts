export type ListingType = "buy" | "rent";

export type PropertyType =
  | "House"
  | "Condo"
  | "Townhouse"
  | "Apartment"
  | "Villa";

export interface PropertyAgent {
  name: string;
  phone: string;
  email: string;
  photo: string;
}

export interface Property {
  id: string;
  title: string;
  price: number;
  listingType: ListingType;
  location: string;
  propertyType: PropertyType;
  bedrooms: number;
  bathrooms: number;
  area: number;
  description: string;
  features: string[];
  amenities: string[];
  images: string[];
  agent: PropertyAgent;
  featured: boolean;
}

export interface PropertyFilters {
  listingType?: ListingType;
  location?: string;
  propertyType?: PropertyType;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
}
