"use client";

import { CHAPTERS } from "@/lib/chapters";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

/** The line that opens a chapter: its number, its name on the bench, and (in Chinese) its translation. */
export function ChapterMark({ index, className }: { index: number; className?: string }) {
  const { lang } = useLanguage();
  return (
    <p className={cn("label flex items-center gap-3 text-paper/55", className)}>
      <span className="text-accent">{String(index).padStart(2, "0")}</span>
      <span className="h-px w-8 bg-paper/30" />
      <span>{CHAPTERS[index].code}</span>
      {lang === "zh" && <span className="tracking-[0.4em] text-paper/80">{home.zh.chapters[index]}</span>}
    </p>
  );
}
