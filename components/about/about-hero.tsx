"use client";

import { useEffect } from "react";
import { ArrowDown } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { Formula } from "@/components/about/math";
import { bus, nodeAngle, useStageAnchor } from "@/components/stage/bus";
import { ShiftText } from "@/components/ui/shift-text";
import { about } from "@/lib/i18n/about";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** The story's opening: the stage's ring, one node for each of the four dated chapters (the chapter nav moves the
 *  point where the two pulses meet as the story is read), and beside it the title, the formula and its source. */
export function AboutHero() {
  const { lang } = useLanguage();
  const copy = about[lang].hero;
  const chapters = about[lang].chapters;
  const n = chapters.length;
  const ring = useStageAnchor("loop");
  const reduce = useReducedMotion();

  useEffect(() => {
    bus.count = n;
    bus.node = 0;
    return () => void (bus.node = 0);
  }, [n]);

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.9, ease: EASE, delay },
  });

  return (
    <section className="relative flex min-h-[calc(100svh-4rem)] items-center md:min-h-[calc(100svh-5rem)]">
      <div className="mx-auto grid w-full max-w-[1320px] items-center gap-y-14 px-5 py-14 md:grid-cols-12 md:gap-x-10 md:px-10">
        <div className="md:col-span-6">
          <motion.p {...rise(0.05)} className="label flex items-center gap-3 text-accent">
            <span className="h-px w-8 bg-accent/60" />
            Sagnac Trading
          </motion.p>
          <h1 className={cn("display mt-7 text-balance md:break-keep md:mt-9", lang === "zh" ? "text-[2.9rem] md:text-[4.4rem]" : "text-[2.4rem] md:text-[3.6rem]")}>
            <ShiftText inView={false} delay={0.15} className="!whitespace-normal" label={copy.title}>
              {copy.title}
            </ShiftText>
          </h1>
          <motion.p {...rise(0.5)} className="mt-6 max-w-md text-[14px] leading-relaxed text-paper/65 md:mt-8 md:text-[15px]">
            {copy.lede}
          </motion.p>
          <motion.div {...rise(0.65)} className="mt-10 border-t border-paper/15 pt-6 md:mt-14">
            <Formula className="text-xl text-accent md:text-2xl" />
            <p className="label mt-4 !leading-relaxed text-paper/45">{copy.source}</p>
          </motion.div>
          <motion.a {...rise(0.8)} href="#chapter-1" className="label mt-10 inline-flex items-center gap-2 text-paper/50 transition-colors hover:text-paper">
            {copy.scroll}
            <ArrowDown className="h-3.5 w-3.5 animate-float" />
          </motion.a>
        </div>

        <div className="md:col-span-6">
          <div ref={ring} className="relative mx-auto aspect-square w-[min(68vw,42svh)] md:w-[min(34vw,60svh)]">
            {chapters.map((c, k) => {
              const a = nodeAngle(k, n);
              return (
                <a
                  key={c.marker}
                  href={`#chapter-${k + 1}`}
                  className="absolute -translate-x-1/2 -translate-y-1/2 p-2 font-mono text-[11px] tabular-nums text-paper/50 transition-colors hover:text-accent"
                  style={{
                    left: `calc(50% + ${(Math.cos(a) * 50).toFixed(3)}% + ${(Math.cos(a) * 40).toFixed(1)}px)`,
                    top: `calc(50% + ${(Math.sin(a) * 50).toFixed(3)}% + ${(Math.sin(a) * 40).toFixed(1)}px)`,
                  }}
                >
                  {c.marker}
                </a>
              );
            })}
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="display text-[min(14vw,9svh)] tracking-[0.12em] !leading-none md:text-[min(6.5vw,10svh)]">Ω</span>
              <span className="label mt-3 normal-case text-paper/40">Δt = 4AΩ / c²</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
