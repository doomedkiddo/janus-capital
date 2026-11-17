"use client";

import { useEffect, useState } from "react";
import { OmegaReadout, PhaseReadout } from "@/components/ui/readouts";
import { CHAPTERS } from "@/lib/chapters";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

/** Lettering in the page's two margins, as on the frame of an instrument: on the left where the light is along its
 *  path, on the right what the fringes read. Drawn in difference so it stays legible over whatever passes under it. */
export function Hud() {
  const { lang } = useLanguage();
  const [at, setAt] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const mid = window.innerHeight * 0.5;
      let cur = 0;
      CHAPTERS.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= mid) cur = i;
      });
      setAt(cur);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <>
      <div aria-hidden className="pointer-events-none fixed left-0 top-1/2 z-40 hidden w-10 -translate-y-1/2 flex-col items-center gap-4 text-white mix-blend-difference md:flex">
        <div className="flex flex-col items-center gap-2">
          {CHAPTERS.map((c, i) => (
            <span key={c.id} className={cn("w-px transition-all duration-500", i === at ? "h-7 bg-white" : "h-2.5 bg-white/35")} />
          ))}
        </div>
        <span className="label [writing-mode:vertical-rl]">
          {String(at).padStart(2, "0")} — {CHAPTERS[at].code}
          {lang === "zh" && <span className="mt-3 inline-block tracking-[0.5em]">{home.zh.chapters[at]}</span>}
        </span>
      </div>
      <div aria-hidden className="pointer-events-none fixed right-0 top-1/2 z-40 hidden w-10 -translate-y-1/2 flex-col items-center gap-6 text-white mix-blend-difference md:flex">
        <PhaseReadout className="label normal-case [text-orientation:sideways] [writing-mode:vertical-rl]" />
        <span className="h-10 w-px bg-white/35" />
        <OmegaReadout className="label normal-case [text-orientation:sideways] [writing-mode:vertical-rl]" />
      </div>
    </>
  );
}
