"use client";

import { Moon, Sun } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { useTheme } from "@/lib/theme-context";
import { THEMES } from "@/lib/themes";

export function ThemeToggle() {
  const { lang } = useLanguage();
  const { theme, setTheme } = useTheme();
  const next = THEMES.find((t) => t.id !== theme.id) ?? theme;
  const Icon = theme.id === "light" ? Moon : Sun;
  const label = lang === "zh" ? `切换到${next.name.zh}` : `Switch to ${next.name.en.toLowerCase()}`;

  return (
    <button
      onClick={() => setTheme(next.id)}
      aria-label={label}
      title={label}
      className="flex h-9 w-9 items-center justify-center border border-paper/25 text-paper/80 transition-colors hover:border-paper/70 hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
    >
      <Icon className="h-4 w-4" />
    </button>
  );
}
