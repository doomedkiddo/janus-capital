"use client";

import { useEffect, useRef, useState } from "react";
import { Palette } from "lucide-react";
import { useLanguage } from "@/lib/i18n/language-context";
import { useTheme } from "@/lib/theme-context";
import { THEMES } from "@/lib/themes";
import { cn } from "@/lib/utils";

/** Colour-scheme picker in the nav: a palette button and a short list, three swatches and a name per scheme. */
export function ThemeMenu() {
  const { lang } = useLanguage();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label={lang === "zh" ? "配色" : "Colour scheme"}
        aria-expanded={open}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-paper/25 text-paper/80 transition-colors hover:border-paper/60 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:h-9 md:w-9"
      >
        <Palette className="h-4 w-4" />
      </button>
      {open && (
        <div
          role="menu"
          className="absolute right-0 top-11 z-50 w-48 overflow-hidden rounded-2xl bg-paper-2 p-1.5 text-ink shadow-[0_18px_40px_-16px_rgba(0,0,0,0.45)] ring-1 ring-rule"
        >
          {THEMES.map((t) => (
            <button
              key={t.id}
              role="menuitemradio"
              aria-checked={t.id === theme.id}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors hover:bg-paper",
                t.id === theme.id && "bg-paper font-semibold",
              )}
            >
              <span className="flex overflow-hidden rounded-full ring-1 ring-black/10">
                {[t.colors.ink, t.colors.paper, t.colors.accent2].map((c, i) => (
                  <span key={i} className="h-4 w-3" style={{ background: c }} />
                ))}
              </span>
              {t.name[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
