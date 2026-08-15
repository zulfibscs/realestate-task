export default function About() {
  return (
    <section
      aria-labelledby="about-heading"
      className="bg-[#FAFAF8] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4A962]">
            About Us
          </p>
          <h2
            id="about-heading"
            className="mt-3 font-serif text-3xl font-semibold text-[#1B2A41] sm:text-4xl"
          >
            A More Strategic Approach to Real Estate
          </h2>
          <p className="mt-6 text-base leading-relaxed text-[#3D4F63] sm:text-lg">
            Walton Dean Realty helps buyers and sellers across Houston County
            navigate the market with clarity, structure, and a process designed
            to deliver results. Whether you are purchasing your first home,
            listing a property, or exploring rental options, our team combines
            local expertise with disciplined execution to guide every step of
            your journey.
          </p>
          <p className="mt-4 text-base leading-relaxed text-[#3D4F63] sm:text-lg">
            We believe real estate should feel personal, not transactional —
            built on proactive communication, data-driven decisions, and a
            standard of service our clients can rely on from first showing to
            closing day.
          </p>
        </div>
      </div>
    </section>
  );
}
