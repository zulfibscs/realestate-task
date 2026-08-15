import Image from "next/image";
import Link from "next/link";

import ContactAgentModal from "@/components/property/ContactAgentModal";
import type { Property } from "@/types/property";

type AgentCardProps = {
  property: Property;
};

export default function AgentCard({ property }: AgentCardProps) {
  const phoneHref = `tel:${property.agent.phone.replace(/[^0-9+]/g, "")}`;
  const scheduleHref = `/contact?property=${property.id}&intent=schedule-viewing`;

  return (
    <aside className="h-fit rounded-sm border border-[#E8DCC4]/60 bg-white p-6 lg:sticky lg:top-24">
      <h2 className="font-serif text-2xl font-semibold text-[#1B2A41]">
        Contact Agent
      </h2>

      <div className="mt-5 flex items-center gap-4">
        <div className="relative h-16 w-16 overflow-hidden rounded-full bg-[#E8DCC4]/40">
          {/* The agent portrait is informational rather than critical, so it can defer loading without affecting the page layout. */}
          <Image
            src={property.agent.photo}
            alt={property.agent.name}
            fill
            loading="lazy"
            unoptimized
            sizes="64px"
            className="object-cover"
          />
        </div>
        <div>
          <p className="font-semibold text-[#1B2A41]">{property.agent.name}</p>
          <p className="text-sm text-[#6B7280]">Listing Agent</p>
        </div>
      </div>

      <dl className="mt-6 space-y-3 text-sm text-[#3D4F63]">
        <div>
          <dt className="font-semibold text-[#1B2A41]">Phone</dt>
          <dd className="mt-1">
            <a
              href={phoneHref}
              className="transition-colors hover:text-[#1B2A41] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
            >
              {property.agent.phone}
            </a>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-[#1B2A41]">Email</dt>
          <dd className="mt-1">
            <a
              href={`mailto:${property.agent.email}`}
              className="transition-colors hover:text-[#1B2A41] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
            >
              {property.agent.email}
            </a>
          </dd>
        </div>
      </dl>

      <div className="mt-8 flex flex-col gap-3">
        <ContactAgentModal property={property} />
        <Link
          href={scheduleHref}
          className="inline-flex items-center justify-center rounded-sm border border-[#E8DCC4]/80 bg-[#FAFAF8] px-5 py-3 text-sm font-semibold uppercase tracking-wide text-[#3D4F63] transition-colors hover:border-[#C4A962] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
        >
          Schedule Viewing
        </Link>
      </div>
    </aside>
  );
}
