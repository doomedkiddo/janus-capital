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
          "pointer-events-none absolute top-6 select-none font-serif text-[5.5rem] leading-none text-accent/[0.07] md:text-[10rem] md:text-accent/[0.08]",
          flip ? "right-2 md:right-8 lg:right-20" : "left-2 md:left-8 lg:left-28",
        )}
      >
        {chapter.marker}
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
                <span className="h-px w-8 bg-accent/60" />
                <span className="font-mono text-[10px] font-medium uppercase tracking-[0.24em] text-accent/85">
                  {chapter.overline}
                </span>
              </div>
            </BlurFade>

            <BlurFade delay={0.06}>
              <h2 className="mt-4 font-serif text-[2rem] leading-tight text-paper md:mt-5 md:text-[2.85rem]">
                {chapter.title}
              </h2>
            </BlurFade>

            <div className="mt-6 space-y-5 md:mt-8 md:space-y-6">
              {chapter.paragraphs.map((paragraph, pIndex) => (
                <BlurFade key={pIndex} delay={0.12 + pIndex * 0.09}>
                  <p className="text-[15px] leading-[1.95] text-paper/70 md:text-lg md:leading-[2.05]">
                    {paragraph}
                  </p>
                </BlurFade>
              ))}
            </div>

            <BlurFade delay={0.4}>
              <blockquote className="relative mt-9 border-l-2 border-accent/50 pl-5 md:mt-12 md:pl-7">
                <span
                  aria-hidden
                  className="absolute -left-[3px] top-0 h-2 w-2 -translate-x-1/2 rotate-45 border border-accent/80 bg-ink"
                />
                <p className="text-balance break-keep font-serif text-lg italic leading-relaxed text-paper/90 md:text-[1.4rem] md:leading-[1.7]">
                  {chapter.pull}
                </p>
              </blockquote>
            </BlurFade>
          </div>

          <div className={cn("flex justify-center lg:block", flip && "lg:order-1")}>
            <figure className="flex flex-col items-center lg:sticky lg:top-28">
              <div className="w-40 sm:w-48 lg:w-full">{glyph}</div>
              <figcaption className="mt-5 max-w-[16rem] text-center lg:mt-6">
                <span className="block font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-accent/75">
                  {chapter.figure}
                </span>
                <span className="mt-1.5 block whitespace-nowrap font-mono text-[10px] text-paper/40">{chapter.spec}</span>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
