"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { DEFAULT_THEME, THEMES, chartPalette, themeVars, type Theme } from "./themes";

const STORAGE_KEY = "janus-theme";

type ThemeContextValue = { theme: Theme; setTheme: (id: string) => void };

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [id, setId] = useState(DEFAULT_THEME.id);
  const theme = THEMES.find((t) => t.id === id) ?? DEFAULT_THEME;

  useEffect(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored && THEMES.some((t) => t.id === stored)) setId(stored);
  }, []);

  // globals.css carries the default scheme on :root for the first paint; the others are applied here.
  useEffect(() => {
    const root = document.documentElement;
    for (const [k, v] of themeVars(theme)) root.style.setProperty(k, v);
    root.dataset.theme = theme.id;
  }, [theme]);

  const setTheme = useCallback((next: string) => {
    setId(next);
    window.localStorage.setItem(STORAGE_KEY, next);
  }, []);

  const value = useMemo(() => ({ theme, setTheme }), [theme, setTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}

export function useChartPalette() {
  return chartPalette(useTheme().theme);
}
