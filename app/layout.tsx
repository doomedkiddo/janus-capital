import type { Metadata } from "next";
import { EB_Garamond, Inter, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { ThemeProvider } from "@/lib/theme-context";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: [],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans",
  display: "swap",
  preload: false,
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-garamond",
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  subsets: [],
  weight: ["400", "600"],
  variable: "--font-noto-serif",
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://januscapital.ai"),
  title: "Janus Capital | Systematic Crypto Trading",
  description:
    "Janus Capital is a systematic crypto trading firm — market making, statistical arbitrage and AI-driven research across CeFi and DeFi venues.",
  icons: { icon: "/mark.png" },
  openGraph: {
    title: "Janus Capital | Systematic Crypto Trading",
    description: "At the threshold of every beginning.",
    type: "website",
    images: ["/og.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      className={cn(
        inter.variable,
        notoSansSC.variable,
        ebGaramond.variable,
        notoSerifSC.variable,
      )}
    >
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
