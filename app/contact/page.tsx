import type { Metadata } from "next";

import ScheduleViewingForm from "@/components/property/ScheduleViewingForm";
import ContactForm from "@/components/sections/ContactForm";
import { properties } from "@/data/properties";

type ContactPageProps = {
  searchParams: Promise<{
    property?: string;
    intent?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Contact | Walton Dean Realty",
  description:
    "Contact Walton Dean Realty to ask a question, connect with an agent, or schedule a property viewing.",
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { property: propertyId, intent } = await searchParams;
  const selectedProperty = properties.find((property) => property.id === propertyId);
  const showScheduleForm = intent === "schedule-viewing" && selectedProperty;

  return (
    <main>
      <section
        aria-labelledby="contact-heading"
        className="border-b border-[#E8DCC4]/40 bg-white py-12 sm:py-16"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4A962]">
            Contact
          </p>
          <h1
            id="contact-heading"
            className="mt-3 font-serif text-3xl font-semibold text-[#1B2A41] sm:text-4xl"
          >
            {showScheduleForm ? "Schedule a Viewing" : "Connect With an Agent"}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#3D4F63]">
            Share a few details and our team will follow up with clear next
            steps.
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-8">
          {showScheduleForm ? (
            <ScheduleViewingForm
              propertyId={selectedProperty.id}
              title={selectedProperty.title}
            />
          ) : (
            <ContactForm />
          )}

          <aside className="h-fit rounded-sm border border-[#E8DCC4]/60 bg-white p-6">
            <h2 className="font-serif text-2xl font-semibold text-[#1B2A41]">
              Office Details
            </h2>
            <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-[#3D4F63]">
              <p>331 Margie Dr</p>
              <p>Warner Robins, GA 31088</p>
              <p>
                <a
                  href="tel:+14783717069"
                  className="transition-colors hover:text-[#1B2A41] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
                >
                  (478) 371-7069
                </a>
              </p>
              <p>
                <a
                  href="mailto:william@waltondeanrealty.com"
                  className="transition-colors hover:text-[#1B2A41] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
                >
                  william@waltondeanrealty.com
                </a>
              </p>
            </address>
          </aside>
        </div>
      </section>
    </main>
  );
}
