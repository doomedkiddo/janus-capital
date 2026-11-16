import type { Metadata } from "next";
import { AboutNarrative } from "@/components/about/about-narrative";
import { ContactProvider } from "@/components/contact-modal";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";

export const metadata: Metadata = {
  alternates: { canonical: "/about/" },
  title: "于毫厘之差，见天地之转 | In the Smallest Difference, the Turning of the World — Sagnac Trading",
  description:
    "1913 年，萨尼亚克让两束光沿旋转闭环反向穿行，试图寻找假想中的以太。以太并不存在，那五十阿秒的时差却留了下来。In 1913, Georges Sagnac sent two beams of light around a rotating loop to look for the ether. There was no ether; the fifty-attosecond lag stayed.",
  openGraph: {
    title: "In the Smallest Difference, the Turning of the World — Sagnac Trading",
    description: "He set out to prove the ether. He measured rotation itself.",
    type: "article",
    images: ["/og.jpg?v=2"],
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
