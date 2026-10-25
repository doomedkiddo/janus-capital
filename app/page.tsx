import { ContactProvider } from "@/components/contact-modal";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { PerformanceView } from "@/components/performance/performance-view";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { Hero } from "@/components/sections/hero";
import { Strategy } from "@/components/sections/strategy";
import { Team } from "@/components/sections/team";

export default function HomePage() {
  return (
    <ContactProvider>
      <Nav />
      <main>
        <Hero />
        <section id="performance" className="scroll-mt-16">
          <PerformanceView variant="home" />
        </section>
        <Strategy />
        <Team />
        <AboutTeaser />
      </main>
      <Footer />
    </ContactProvider>
  );
}
