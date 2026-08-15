import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

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
    <main className="bg-[#FAFAF8]">
      <section
        aria-labelledby="contact-heading"
        className="relative isolate overflow-hidden bg-[#102033] py-16 text-white sm:py-20"
      >
        <Image
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&h=1000&fit=crop"
          alt="Welcoming home exterior with clean landscaping"
          fill
          priority
          unoptimized
          sizes="100vw"
          className="absolute inset-0 -z-20 object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgba(16,32,51,0.9),rgba(16,32,51,0.72),rgba(16,32,51,0.48))]" />

        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-end lg:px-8">
          <div>
            <p className="inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#E8DCC4] backdrop-blur-sm">
              Contact Walton Dean Realty
            </p>
            <h1
              id="contact-heading"
              className="mt-6 max-w-3xl font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              {showScheduleForm
                ? "Schedule Your Private Showing."
                : "Let us plan your next move."}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-white/90 sm:text-lg">
              Tell me where you are headed, what matters most, and how soon you
              want to move. You will get a clear, practical next step.
            </p>
          </div>

          <div className="rounded-sm border border-white/20 bg-white/95 p-5 text-[#102033] shadow-[0_22px_70px_rgba(0,0,0,0.24)]">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8A8572]">
              Direct Line
            </p>
            <a
              href="tel:+14783717069"
              className="mt-3 block font-serif text-3xl font-semibold text-[#102033] transition-colors hover:text-[#2E4A6B]"
            >
              (478) 371-7069
            </a>
            <p className="mt-3 text-sm leading-6 text-[#3D4F63]">
              Serving Perry, Warner Robins, Bonaire, Kathleen, Byron, and the
              surrounding Houston County market.
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[#E8DCC4]/70 bg-white py-6">
        <div className="mx-auto grid max-w-7xl gap-3 px-4 sm:grid-cols-3 sm:px-6 lg:px-8">
          {[
            ["Call", "(478) 371-7069", "tel:+14783717069"],
            ["Email", "william@waltondeanrealty.com", "mailto:william@waltondeanrealty.com"],
            ["Office", "331 Margie Dr, Warner Robins", "#office-details"],
          ].map(([label, value, href]) => (
            <a
              key={label}
              href={href}
              className="rounded-sm border border-[#E8DCC4]/70 bg-[#FAFAF8] px-4 py-4 transition-colors hover:border-[#C4A962] hover:bg-white"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8A8572]">
                {label}
              </p>
              <p className="mt-2 text-sm font-semibold text-[#102033]">
                {value}
              </p>
            </a>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8">
          <div>
            {showScheduleForm ? (
              <ScheduleViewingForm
                propertyId={selectedProperty.id}
                title={selectedProperty.title}
              />
            ) : (
              <ContactForm />
            )}
          </div>

          <aside id="office-details" className="space-y-5 lg:sticky lg:top-28 lg:h-fit">
            <div className="rounded-sm border border-[#E8DCC4]/70 bg-white p-6 shadow-[0_18px_60px_rgba(16,32,51,0.07)]">
              <h2 className="font-serif text-2xl font-semibold text-[#102033]">
                Office Details
              </h2>
              <address className="mt-5 space-y-3 text-sm not-italic leading-relaxed text-[#3D4F63]">
                <p>331 Margie Dr</p>
                <p>Warner Robins, GA 31088</p>
                <p>
                  <a
                    href="tel:+14783717069"
                    className="font-semibold text-[#102033] transition-colors hover:text-[#2E4A6B]"
                  >
                    (478) 371-7069
                  </a>
                </p>
                <p>
                  <a
                    href="mailto:william@waltondeanrealty.com"
                    className="font-semibold text-[#102033] transition-colors hover:text-[#2E4A6B]"
                  >
                    william@waltondeanrealty.com
                  </a>
                </p>
              </address>
            </div>

            <div className="rounded-sm bg-[#102033] p-6 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#E8DCC4]">
                What happens next
              </p>
              <ul className="mt-5 space-y-4 text-sm leading-6 text-white/86">
                <li>1. I review your goals and timeline.</li>
                <li>2. You receive a clear plan for buying or selling.</li>
                <li>3. We schedule the next step when you are ready.</li>
              </ul>
            </div>

            <div className="rounded-sm border border-[#E8DCC4]/70 bg-[#F7F4EC] p-6">
              <h2 className="font-serif text-2xl font-semibold text-[#102033]">
                Prefer to browse first?
              </h2>
              <p className="mt-3 text-sm leading-6 text-[#3D4F63]">
                View active homes and narrow the search before reaching out.
              </p>
              <Link
                href="/listings"
                className="mt-5 inline-flex min-h-11 items-center justify-center rounded-sm bg-[#102033] px-5 text-sm font-semibold uppercase tracking-[0.14em] text-white"
              >
                Search Homes
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
