import { Bench } from "@/components/bench";
import { ContactProvider } from "@/components/contact-modal";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { PerformanceView } from "@/components/performance/performance-view";
import { Depart } from "@/components/sections/depart";
import { Hero } from "@/components/sections/hero";
import { Loop } from "@/components/sections/loop";
import { Observers } from "@/components/sections/observers";
import { Origin } from "@/components/sections/origin";
import { ScrollProgress } from "@/components/ui/scroll-progress";

// The page follows the light through the instrument (lib/chapters.ts): source, readout, loop, observers, origin, depart.
export default function HomePage() {
  return (
    <ContactProvider>
      <Bench>
        <ScrollProgress />
        <Nav />
        <main>
          <Hero />
          <section id="performance" className="scroll-mt-16">
            <PerformanceView variant="home" />
          </section>
          <Loop />
          <Observers />
          <Origin />
          <Depart />
        </main>
        <Footer />
      </Bench>
    </ContactProvider>
  );
}
