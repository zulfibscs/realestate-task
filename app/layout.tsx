import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";

import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";

import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Walton Dean Realty | Houston County Real Estate",
  description:
    "Strategic real estate guidance for buyers, sellers, and renters across Houston County, Georgia.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-[#FAFAF8] font-sans text-[#3D4F63]">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
