import Link from "next/link";

export default function ContactCTA() {
  return (
    <section aria-labelledby="contact-cta-heading" className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-sm bg-[#1B2A41] px-6 py-12 text-center sm:px-12 sm:py-16">
          <h2
            id="contact-cta-heading"
            className="font-serif text-3xl font-semibold text-white sm:text-4xl"
          >
            Ready to Take the Next Step?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[#E8DCC4] sm:text-lg">
            Whether you are buying, selling, or renting, our team is here to
            provide clear guidance and a process built around your goals.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-sm bg-[#C4A962] px-8 py-3 text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors hover:bg-[#E8DCC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
