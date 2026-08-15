import type { Metadata } from "next";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import SiteBanner from "@/components/layout/SiteBanner";

import "./globals.css";

export const metadata: Metadata = {
  title: "Walton Dean Realty | Houston County Real Estate",
  description:
    "Strategic real estate guidance for buyers, sellers, and renters across Houston County, Georgia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-[#FAFAF8] font-sans text-[#3D4F63]">
        <SiteBanner />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
