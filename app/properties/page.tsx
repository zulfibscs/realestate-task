import type { Metadata } from "next";

import PropertyListings from "@/components/sections/PropertyListings";
import { properties } from "@/data/properties";

export const metadata: Metadata = {
  title: "Properties | Walton Dean Realty",
  description:
    "Browse homes for sale and rent across Houston County, Georgia. Filter by location, price, beds, and more.",
};

export default function PropertiesPage() {
  return (
    <main>
      <PropertyListings properties={properties} />
    </main>
  );
}
