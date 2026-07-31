"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import type { AboutChapter } from "@/lib/i18n/types";
import { cn } from "@/lib/utils";

type ChapterProps = {
  chapter: AboutChapter;
  glyph: React.ReactNode;
  index: number;
};

export function Chapter({ chapter, glyph, index }: ChapterProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [26, -26]);
  const flip = index % 2 === 1;

  return (
    <section
      ref={ref}
      id={`chapter-${index + 1}`}
      className="relative scroll-mt-24 px-5 py-12 md:py-16 lg:py-20"
    >
      <motion.span
        aria-hidden
        style={reduce ? undefined : { y }}
        className={cn(
          "pointer-events-none absolute top-6 select-none font-serif text-[7rem] leading-none text-bronze-500/[0.07] md:text-[13rem] md:text-bronze-500/[0.09]",
          flip ? "right-2 md:right-8 lg:right-20" : "left-2 md:left-8 lg:left-28",
        )}
      >
        {chapter.numeral}
      </motion.span>

      <div className="relative mx-auto max-w-5xl">
        <div
          className={cn(
            "grid gap-10 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14",
            flip && "lg:grid-cols-[15rem_minmax(0,1fr)]",
          )}
        >
          <div className={cn("max-w-2xl", flip && "lg:order-2")}>
            <BlurFade>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-bronze-400/70" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.26em] text-bronze-700/85">
                  {chapter.overline}
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={0.06}>
              <h2 className="mt-4 font-serif text-[2rem] leading-tight text-navy-800 md:mt-5 md:text-[2.85rem]">
                {chapter.title}
              </h2>
            </BlurFade>

            <div className="mt-6 space-y-5 md:mt-8 md:space-y-6">
              {chapter.paragraphs.map((paragraph, pIndex) => (
                <BlurFade key={pIndex} delay={0.12 + pIndex * 0.09}>
                  <p className="text-[15px] leading-[1.95] text-slate-700 md:text-lg md:leading-[2.05]">
                    {paragraph}
                  </p>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.4}>
              <blockquote className="relative mt-9 border-l-2 border-bronze-400/70 pl-5 md:mt-12 md:pl-7">
                <span
                  aria-hidden
                  className="absolute -left-[3px] top-0 h-2 w-2 -translate-x-1/2 rotate-45 border border-bronze-500/80 bg-marble-100"
                />
                <p className="font-serif text-lg italic leading-relaxed text-navy-700 md:text-[1.4rem] md:leading-[1.7]">
                  {chapter.pull}
                </p>
              </blockquote>
            </BlurFade>
          </div>

          <div className={cn("flex justify-center lg:block", flip && "lg:order-1")}>
            <div className="w-40 sm:w-48 lg:sticky lg:top-28 lg:w-full">{glyph}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
