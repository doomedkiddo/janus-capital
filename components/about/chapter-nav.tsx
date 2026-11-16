"use client";

import { useEffect, useState } from "react";
import { about } from "@/lib/i18n/about";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

export function ChapterNav() {
  const { lang } = useLanguage();
  const chapters = about[lang].chapters;
  const label = about[lang].nav.chapterLabel;
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const first = document.getElementById("chapter-1");
      if (!first) return;
      setVisible(first.getBoundingClientRect().top < window.innerHeight * 0.6);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = chapters
      .map((_, index) => document.getElementById(`chapter-${index + 1}`))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = sections.indexOf(visible.target as HTMLElement);
        if (index >= 0) setActive(index);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.05, 0.3, 0.6] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [chapters]);

  return (
    <nav
      aria-label={label}
      className={cn(
        "fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-3 transition-all duration-500 lg:flex xl:right-10",
        visible ? "translate-x-0 opacity-100" : "pointer-events-none translate-x-2 opacity-0",
      )}
    >
      {chapters.map((chapter, index) => (
        <a
          key={chapter.marker}
          href={`#chapter-${index + 1}`}
          className="group flex items-center gap-2.5"
        >
          <span
            className={cn(
              "whitespace-nowrap font-serif text-[11px] tracking-wide transition-all duration-300",
              active === index
                ? "text-accent opacity-100"
                : "text-paper/40 opacity-0 group-hover:opacity-100",
            )}
          >
            {chapter.title}
          </span>
          <span
            className={cn(
              "font-serif text-xs transition-colors duration-300",
              active === index ? "text-accent" : "text-paper/25 group-hover:text-accent/70",
            )}
          >
            {chapter.marker}
          </span>
          <span
            className={cn(
              "h-px transition-all duration-300",
              active === index
                ? "w-6 bg-accent"
                : "w-3 bg-paper/20 group-hover:w-5 group-hover:bg-accent/60",
            )}
          />
        </a>
      ))}
    </nav>
  );
}
