import type { Metadata } from "next";
import { Bench } from "@/components/bench";
import { ContactProvider } from "@/components/contact-modal";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { PerformanceView } from "@/components/performance/performance-view";
import { ScrollProgress } from "@/components/ui/scroll-progress";

export const metadata: Metadata = {
  alternates: { canonical: "/performance/" },
  title: "实盘业绩 | Live Performance — Sagnac Trading",
  description:
    "Sagnac Trading 实盘做市账户的合并净值：净值、回撤与逐日收益，每日同步。Combined net value of Sagnac Trading's live market-making accounts: net value, drawdown and daily returns, synchronised daily.",
  openGraph: {
    title: "Live Performance — Sagnac Trading",
    description: "Live account record, marked to market.",
    type: "website",
    images: ["/og.jpg?v=2"],
  },
};

export default function PerformancePage() {
  return (
    <ContactProvider>
      <Bench hud={false}>
        <ScrollProgress />
        <Nav />
        <main>
          <PerformanceView />
        </main>
        <Footer />
      </Bench>
    </ContactProvider>
  );
}
