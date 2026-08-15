export default function Stats() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-sm bg-[#1B2A41] px-6 py-14 text-center sm:px-12 sm:py-20">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[linear-gradient(180deg,rgba(27,42,65,0.12),rgba(27,42,65,0.7))]"
          />
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600&h=1000&fit=crop')] bg-cover bg-center opacity-45" />

          <div className="relative mx-auto max-w-3xl text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.4em] text-[#E8DCC4] sm:text-sm">
              Thinking About Selling?
            </p>
            <h2 className="mt-4 font-serif text-3xl font-semibold uppercase tracking-wide sm:text-4xl lg:text-5xl">
              How Much Is Your Home Worth?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
              Get a quick starting point for your property&apos;s value, then
              connect with us for a strategy that reflects the local market,
              recent sales, and your goals.
            </p>

            <form
              className="mx-auto mt-8 flex max-w-3xl flex-col gap-3 rounded-full bg-white p-2 shadow-[0_20px_50px_rgba(0,0,0,0.22)] sm:flex-row sm:items-center"
              action="/contact"
            >
              <label htmlFor="valuation-address" className="sr-only">
                Enter your home address
              </label>
              <input
                id="valuation-address"
                name="address"
                type="text"
                placeholder="Enter your home address..."
                className="min-h-11 flex-1 rounded-full border-0 px-5 py-3 text-sm text-[#2C2C2C] placeholder:text-[#9CA3AF] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C4A962]"
              />
              <button
                type="submit"
                className="min-h-11 rounded-full bg-[#C4A962] px-6 py-3 text-sm font-semibold uppercase tracking-wide text-[#1B2A41] transition-colors hover:bg-[#E8DCC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1B2A41]"
              >
                Get a Free Home Valuation
              </button>
            </form>

            <div className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs font-semibold uppercase tracking-[0.25em] text-[#E8DCC4] sm:text-sm">
              <span>Instant property valuation</span>
              <span>Expert advice</span>
              <span>Sell for more</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
