import type { Metadata } from "next";
import { ContactProvider } from "@/components/contact-modal";
import { Footer } from "@/components/footer";
import { Nav } from "@/components/nav";
import { PerformanceView } from "@/components/performance/performance-view";

export const metadata: Metadata = {
  title: "实盘业绩 | Live Performance — Janus Capital",
  description:
    "Janus Capital 实盘账户业绩：净值、回撤、逐日收益、杠杆与换手。Live account record of Janus Capital: net value, drawdown, daily returns, leverage and turnover.",
  openGraph: {
    title: "Live Performance — Janus Capital",
    description: "Live account record, marked to market.",
    type: "website",
    images: ["/og.jpg"],
  },
};

export default function PerformancePage() {
  return (
    <ContactProvider>
      <Nav />
      <PerformanceView />
      <Footer />
    </ContactProvider>
  );
}
