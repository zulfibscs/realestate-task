import type { Metadata } from "next";

import About from "@/components/sections/About";
import ContactCTA from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: "About | Walton Dean Realty",
  description:
    "Learn more about Walton Dean Realty and the local approach behind the brand.",
};

export default function AboutPage() {
  return (
    <main>
      {/* Keep the /about nav target live so the global header/footer links do not land on a dead route. */}
      <section
        aria-labelledby="about-page-heading"
        className="border-b border-[#E8DCC4]/40 bg-white py-12 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4A962]">
            About
          </p>
          <h1
            id="about-page-heading"
            className="mt-3 font-serif text-3xl font-semibold text-[#1B2A41] sm:text-4xl"
          >
            A More Strategic Approach to Real Estate
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3D4F63]">
            Walton Dean Realty helps buyers and sellers across Houston County
            navigate the market with clarity, structure, and a process designed
            to deliver results.
          </p>
        </div>
      </section>

      <About />
      <ContactCTA />
    </main>
  );
}
