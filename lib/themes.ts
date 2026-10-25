// Colour schemes for the homepage. Every scheme fills the same semantic slots, so the sections and the charts never name a
// colour: dark blocks (ink), light blocks (paper), rules, one accent on dark and one on light, a loss colour, and a headline face.

export type ThemeColors = {
  ink: string; // section background, dark
  ink2: string; // card on a dark section
  ink3: string; // mid block (the Janus teaser), secondary text on light
  ink4: string; // chart fill
  inkSoft: string; // body text on dark
  deep: string; // overlay behind the mobile menu
  paper: string; // page / light section background
  paper2: string; // card on a light section
  rule: string; // hairlines on light
  rule2: string; // stronger hairline
  ruleFaint: string; // chart day grid
  wash: string; // chart band / area
  accent: string; // overlines and dots on dark
  accent2: string; // overlines and highlights on light
  neg: string; // losses, drawdown
  negSoft: string; // drawdown fill
  mute: string; // secondary text on light
};

export type Theme = {
  id: string;
  name: { en: string; zh: string };
  colors: ThemeColors;
  headline: { family: "serif" | "sans"; weight: number; transform: "none" | "uppercase"; tracking: string };
};

export const THEMES: Theme[] = [
  {
    id: "evergreen",
    name: { en: "Evergreen", zh: "常青" },
    headline: { family: "serif", weight: 400, transform: "none", tracking: "-0.01em" },
    colors: {
      ink: "#0f211b", ink2: "#163329", ink3: "#1f4a3c", ink4: "#2f6652", inkSoft: "#b8c5bd", deep: "#0b1a15",
      paper: "#f4efe4", paper2: "#fbf8f1", rule: "#e6e0d2", rule2: "#cfc8b8", ruleFaint: "#efeadf", wash: "#dfe9e3",
      accent: "#d8bf8a", accent2: "#b48a3c", neg: "#a3375a", negSoft: "#f1d9e0", mute: "#7c827a",
    },
  },
  {
    // The 巴黎世家 scheme: black, white and grey only, bold uppercase sans headlines, one signal red for losses.
    id: "noir",
    name: { en: "Noir", zh: "黑白" },
    headline: { family: "sans", weight: 700, transform: "uppercase", tracking: "-0.03em" },
    colors: {
      ink: "#0a0a0a", ink2: "#181818", ink3: "#262626", ink4: "#4a4a4a", inkSoft: "#a6a6a6", deep: "#000000",
      paper: "#f1f1f1", paper2: "#ffffff", rule: "#d9d9d9", rule2: "#b8b8b8", ruleFaint: "#e8e8e8", wash: "#e2e2e2",
      accent: "#ffffff", accent2: "#0a0a0a", neg: "#e10600", negSoft: "#f8d3d0", mute: "#6b6b6b",
    },
  },
  {
    id: "oxblood",
    name: { en: "Oxblood", zh: "酒红" },
    headline: { family: "serif", weight: 400, transform: "none", tracking: "-0.01em" },
    colors: {
      ink: "#2b0d12", ink2: "#3a141a", ink3: "#561c25", ink4: "#7a2a35", inkSoft: "#d8b8bc", deep: "#1c080b",
      paper: "#f6efe6", paper2: "#fcf8f2", rule: "#e9ddd0", rule2: "#d2c2b2", ruleFaint: "#f0e7dc", wash: "#ecdcd4",
      accent: "#e3b86a", accent2: "#a67c2e", neg: "#e4572e", negSoft: "#f9dcd2", mute: "#857770",
    },
  },
  {
    id: "graphite",
    name: { en: "Graphite", zh: "石墨" },
    headline: { family: "sans", weight: 600, transform: "none", tracking: "-0.025em" },
    colors: {
      ink: "#121820", ink2: "#1a2230", ink3: "#253140", ink4: "#36475c", inkSoft: "#aeb8c4", deep: "#0b0f15",
      paper: "#f1efea", paper2: "#faf9f6", rule: "#dfdcd4", rule2: "#c6c2b8", ruleFaint: "#e8e5de", wash: "#e0e3e6",
      accent: "#f0b429", accent2: "#b7791f", neg: "#e2574c", negSoft: "#f6d9d5", mute: "#727a84",
    },
  },
];

export const DEFAULT_THEME = THEMES[0];

export const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return `${(n >> 16) & 255} ${(n >> 8) & 255} ${n & 255}`;
};

const kebab = (s: string) => s.replace(/([A-Z])/g, "-$1").toLowerCase();

/** CSS custom properties for a theme, as [name, value] pairs. */
export function themeVars(t: Theme): [string, string][] {
  const out: [string, string][] = (Object.keys(t.colors) as (keyof ThemeColors)[]).map((k) => [`--c-${kebab(k)}`, hexToRgb(t.colors[k])]);
  const serif = "var(--font-garamond), var(--font-noto-serif), Georgia, 'Songti SC', serif";
  const sans = "var(--font-inter), var(--font-noto-sans), system-ui, sans-serif";
  out.push(["--font-headline", t.headline.family === "serif" ? serif : sans]);
  out.push(["--headline-weight", String(t.headline.weight)]);
  out.push(["--headline-case", t.headline.transform]);
  out.push(["--headline-tracking", t.headline.tracking]);
  return out;
}

/** The chart palette (components/performance) of a theme. */
export const chartPalette = (t: Theme) => ({
  ink: t.colors.ink,
  forest: t.colors.ink3,
  forest2: t.colors.ink4,
  wash: t.colors.wash,
  paper: t.colors.paper2,
  rule: t.colors.rule,
  faint: t.colors.ruleFaint,
  mute: t.colors.mute,
  brass: t.colors.accent2,
  claret: t.colors.neg,
  claretWash: t.colors.negSoft,
});
