import Link from "next/link";

export default function SiteBanner() {
  return (
    <div className="sticky top-0 z-[60] border-b border-[#C4A962]/30 bg-[#C4A962] text-[#1B2A41]">
      <div className="mx-auto flex h-11 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <p className="truncate text-xs font-semibold uppercase tracking-wide sm:text-sm">
          Now scheduling showings across Houston County
        </p>
        <Link
          href="/contact"
          className="shrink-0 rounded-sm bg-[#1B2A41] px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#3D4F63] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A41]"
        >
          Contact Us
        </Link>
      </div>
    </div>
  );
}
