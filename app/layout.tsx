import type { Metadata } from "next";
import { EB_Garamond, Inter, JetBrains_Mono, Jost, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import { LanguageProvider } from "@/lib/i18n/language-context";
import { ThemeProvider } from "@/lib/theme-context";
import { THEMES, THEME_STORAGE_KEY } from "@/lib/themes";
import { cn } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "greek"],
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
  subsets: ["latin", "greek"],
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

// the face of the wordmark (logo/README.txt): display type on the homepage
const jost = Jost({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-jost",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "greek"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sagnac.ai"),
  title: "Sagnac Trading | Systematic Crypto Trading",
  description:
    "Sagnac Trading — systematic crypto trading uniting Rust ultra-low-latency execution with mathematical and machine-learning directional alpha across horizons.",
  icons: {
    icon: [
      { url: "/favicon.svg?v=2", type: "image/svg+xml" },
      { url: "/favicon-32.png?v=2", sizes: "32x32", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png?v=2",
  },
  alternates: { canonical: "/" },
  openGraph: {
    title: "Sagnac Trading | Systematic Crypto Trading",
    description: "In the smallest difference, the turning of the world.",
    type: "website",
    images: ["/og.jpg?v=2"],
  },
};

const themeBoot = `try{var t=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)});if(${JSON.stringify(THEMES.map((t) => t.id))}.indexOf(t)>=0)document.documentElement.dataset.theme=t}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="zh-CN"
      suppressHydrationWarning
      className={cn(
        inter.variable,
        notoSansSC.variable,
        ebGaramond.variable,
        notoSerifSC.variable,
        jetbrainsMono.variable,
        jost.variable,
      )}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBoot }} />
      </head>
      <body>
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
