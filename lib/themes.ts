// Colour schemes for the homepage. Every scheme fills the same semantic slots, so the sections and the charts never name a
// colour: dark blocks (ink), light blocks (paper), rules, one accent on dark and one on light, a loss colour, and a headline face.

export type ThemeColors = {
  ink: string; // section background, dark
  ink2: string; // card on a dark section
  ink3: string; // mid block (the Sagnac teaser), secondary text on light
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

const COLORS: ThemeColors = {
  ink: "#090d13", ink2: "#0f1620", ink3: "#102236", ink4: "#1d3b5c", inkSoft: "#aeb8c6", deep: "#05080c",
  paper: "#f3f5f8", paper2: "#ffffff", rule: "#dce2ea", rule2: "#c2cbd8", ruleFaint: "#e9edf2", wash: "#e0eaf5",
  accent: "#38c6ff", accent2: "#0a84e0", neg: "#e5484d", negSoft: "#fadadb", mute: "#667182",
};

export const THEMES: Theme[] = [
  {
    id: "dark",
    name: { en: "Dark", zh: "深色" },
    headline: { family: "serif", weight: 400, transform: "none", tracking: "-0.01em" },
    colors: COLORS,
  },
  {
    id: "light",
    name: { en: "Light", zh: "浅色" },
    headline: { family: "serif", weight: 400, transform: "none", tracking: "-0.01em" },
    colors: COLORS,
  },
];

export const DEFAULT_THEME = THEMES[0];

export const THEME_STORAGE_KEY = "sagnac-theme";

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
