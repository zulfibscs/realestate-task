const stats = [
  { value: "250+", label: "Properties Sold" },
  { value: "12+", label: "Years Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "15+", label: "Expert Agents" },
] as const;

export default function Stats() {
  return (
    <section aria-labelledby="stats-heading" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 id="stats-heading" className="sr-only">
          Company statistics
        </h2>
        {/*
         * Two columns on small screens keeps stat pairs readable; four columns at lg
         * presents a single trust row on desktop without excessive whitespace between items.
         */}
        <ul className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          {stats.map(({ value, label }) => (
            <li
              key={label}
              className="border-l-2 border-[#C4A962] pl-5 text-left"
            >
              <p className="font-serif text-3xl font-semibold text-[#1B2A41] sm:text-4xl">
                {value}
              </p>
              <p className="mt-2 text-sm font-medium uppercase tracking-wide text-[#6B7280]">
                {label}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
