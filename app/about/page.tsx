import type { Metadata } from "next";
import { AboutNarrative } from "@/components/about/about-narrative";
import { ContactProvider } from "@/components/contact-modal";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  title: "立于一切开始之处 | At the Threshold of Every Beginning — Janus Capital",
  description:
    "雅努斯，罗马的守门之神。一张脸回望，一张脸前瞻。这是 Janus Capital 名字的来处，也是我们看待市场的方式。Janus, the Roman keeper of beginnings — the origin of our name and of how we read the market.",
  openGraph: {
    title: "At the Threshold of Every Beginning — Janus Capital",
    description: "Before every beginning, there is a door.",
    type: "article",
    images: ["/og.jpg"],
  },
};

export default function AboutPage() {
  return (
    <ContactProvider>
      <Nav />
      <AboutNarrative />
      <Footer />
    </ContactProvider>
  );
}
