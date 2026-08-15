export type ListingType = "buy" | "rent";

export type PropertyType =
  | "House"
  | "Condo"
  | "Townhouse"
  | "Apartment"
  | "Villa"
  | "Residential"
  | "Co-op"
  | "Multi-family"
  | "Commercial"
  | "Manufactured"
  | "Land"
  | "Other";

export type ListingStatus = "Active" | "Pending" | "Sold";

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
  status?: ListingStatus;
  mlsNumber?: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  lotSizeAcres?: number;
  yearBuilt?: number;
  garageSpaces?: number;
  stories?: number;
  openHouse?: boolean;
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
  propertyTypes?: PropertyType[];
  statuses?: ListingStatus[];
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  minArea?: number;
  maxArea?: number;
  minLotSize?: number;
  maxLotSize?: number;
  minYearBuilt?: number;
  maxYearBuilt?: number;
  garageSpaces?: number;
  stories?: number;
  openHouse?: boolean;
  amenities?: string[];
  keyword?: string;
}
