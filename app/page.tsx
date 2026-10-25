import { ContactProvider } from "@/components/contact-modal";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { PerformanceView } from "@/components/performance/performance-view";
import { AboutTeaser } from "@/components/sections/about-teaser";
import { Hero } from "@/components/sections/hero";
import { Infrastructure } from "@/components/sections/infrastructure";
import { Overview } from "@/components/sections/overview";
import { Stats } from "@/components/sections/stats";
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
        <Stats />
        <div className="mx-auto max-w-6xl px-4 md:px-6">
          <div className="divider" />
        </div>
        <Overview />
        <Team />
        <AboutTeaser />
        <Strategy />
        <Infrastructure />
      </main>
      <Footer />
    </ContactProvider>
  );
}
