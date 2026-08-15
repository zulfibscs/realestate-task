import About from "@/components/sections/About";
import ContactCTA from "@/components/sections/ContactCTA";
import FeaturedProperties from "@/components/sections/FeaturedProperties";
import Hero from "@/components/sections/Hero";
import Services from "@/components/sections/Services";
import Stats from "@/components/sections/Stats";
import Testimonials from "@/components/sections/Testimonials";

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <About />
      <Services />
      <FeaturedProperties />
      <Testimonials />
      <ContactCTA />
    </main>
  );
}
