import Link from "next/link";

export default function NotFound() {
  return (
    <main>
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4A962]">
            404
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold text-[#1B2A41] sm:text-5xl">
            This Property Could Not Be Found
          </h1>
          <p className="mt-5 text-base leading-relaxed text-[#3D4F63]">
            The page may have moved, or the listing may no longer be available.
            You can return home or continue browsing active properties.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-sm bg-[#C4A962] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors hover:bg-[#E8DCC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A41]"
            >
              Back Home
            </Link>
            <Link
              href="/properties"
              className="inline-flex items-center justify-center rounded-sm border border-[#E8DCC4]/80 bg-[#FAFAF8] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#3D4F63] transition-colors hover:border-[#C4A962] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
            >
              Browse Properties
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
