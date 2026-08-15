const testimonials = [
  {
    quote:
      "William made the home-buying process exciting and stress-free. He was responsive, knowledgeable, and always advocated for our best interests.",
    name: "Carmen D.",
    role: "First-time buyer",
  },
  {
    quote:
      "From listing to closing, the team delivered a seamless selling experience. Professional marketing and clear communication every step of the way.",
    name: "Jeff P.",
    role: "Home seller",
  },
  {
    quote:
      "We searched for nearly a year and never felt rushed. Patient, dedicated, and genuinely enjoyable to work with throughout the entire process.",
    name: "Travis P.",
    role: "Relocating family",
  },
] as const;

export default function Testimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="bg-[#FAFAF8] py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4A962]">
            Testimonials
          </p>
          <h2
            id="testimonials-heading"
            className="mt-3 font-serif text-3xl font-semibold text-[#1B2A41] sm:text-4xl"
          >
            What Our Clients Say
          </h2>
        </div>

        {/*
         * Cards stack on mobile for readable quote length; md switches to two columns
         * so longer testimonials do not stretch into a single ultra-wide block on tablets.
         */}
        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ quote, name, role }) => (
            <li
              key={name}
              className="flex flex-col rounded-sm border border-[#E8DCC4]/60 bg-white p-6"
            >
              <blockquote className="flex flex-1 flex-col">
                <p className="text-base leading-relaxed text-[#3D4F63]">
                  &ldquo;{quote}&rdquo;
                </p>
                <footer className="mt-6 border-t border-[#E8DCC4]/40 pt-4">
                  <cite className="not-italic">
                    <span className="block font-semibold text-[#1B2A41]">
                      {name}
                    </span>
                    <span className="mt-1 block text-sm text-[#6B7280]">
                      {role}
                    </span>
                  </cite>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
