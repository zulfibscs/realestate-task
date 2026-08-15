const services = [
  {
    title: "Buying",
    description:
      "Identify the right opportunities, compete effectively, and navigate inspections and financing with a clear strategy.",
  },
  {
    title: "Selling",
    description:
      "Strategic pricing, professional marketing, and high-quality presentation to maximize value and drive strong offers.",
  },
  {
    title: "Renting",
    description:
      "Find rental properties that match your lifestyle and budget, with guidance on leases, neighborhoods, and timing.",
  },
  {
    title: "Consulting",
    description:
      "Get expert advice on market trends, investment potential, and long-term planning before you make your next move.",
  },
] as const;

export default function Services() {
  return (
    <section
      aria-labelledby="services-heading"
      className="bg-white py-16 sm:py-20"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#C4A962]">
            Our Services
          </p>
          <h2
            id="services-heading"
            className="mt-3 font-serif text-3xl font-semibold text-[#1B2A41] sm:text-4xl"
          >
            How We Help You Succeed
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, description }) => (
            <li
              key={title}
              className="rounded-sm border border-[#E8DCC4]/60 bg-[#FAFAF8] p-6 transition-shadow hover:shadow-md"
            >
              <h3 className="font-serif text-xl font-semibold text-[#1B2A41]">
                {title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[#3D4F63]">
                {description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
