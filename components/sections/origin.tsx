"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { LoopPulses, SagnacLoop } from "@/components/about/glyphs/sagnac-loop";
import { Formula } from "@/components/about/math";
import { ChapterMark } from "@/components/ui/chapter-mark";
import { about } from "@/lib/i18n/about";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

/** Origin. Where the name comes from, and the way into the long story (/about). */
export function Origin() {
  const { lang } = useLanguage();
  const copy = home[lang].teaser;
  const chapters = about[lang].chapters;
  const reduce = useReducedMotion();
  const rise = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-10% 0px" },
    transition: reduce ? { duration: 0 } : { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const, delay },
  });

  return (
    <section id="origin" className="scroll-mt-16 border-t border-paper/15 pb-24 pt-24 md:pb-36 md:pt-36">
      <div className="mx-auto grid max-w-[1320px] items-center gap-14 px-5 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="md:col-span-8">
          <ChapterMark index={4} />
          <motion.div {...rise()}>
            <Formula className="mt-10 text-xl text-accent md:text-2xl" />
          </motion.div>
          <motion.h2 {...rise(0.08)} className={cn("display mt-6 text-balance break-keep text-[2.3rem] md:text-[4.2rem]", lang === "zh" ? "!leading-[1.24]" : "!leading-[1.08]")}>
            {copy.title}
          </motion.h2>
          <motion.p {...rise(0.16)} className="mt-7 max-w-2xl text-[15px] leading-relaxed text-paper/70 md:mt-9 md:text-[17px]">
            {copy.body}
          </motion.p>
        </div>

        <motion.div {...rise(0.12)} className="relative mx-auto w-48 md:col-span-4 md:w-full md:max-w-[19rem]">
          <SagnacLoop className="text-paper/70" />
          <LoopPulses className="absolute inset-0 text-accent" />
        </motion.div>

        <motion.div {...rise(0.2)} className="md:col-span-12">
          <ol className="grid grid-cols-2 border-t border-paper/15 md:grid-cols-4">
            {chapters.map((chapter, i) => (
              <li key={chapter.marker} className={cn("relative border-b border-paper/15 py-6 md:border-b-0 md:pr-6", i % 2 === 1 && "pl-5 md:pl-0")}>
                <span className="absolute -top-px left-0 h-px w-8 bg-accent" />
                <span className="display block text-[2rem] tabular-nums md:text-[2.6rem]">{chapter.marker}</span>
                <span className="mt-2 block text-[13px] text-paper/55">{chapter.title}</span>
              </li>
            ))}
          </ol>
          <Link href="/about" className="btn-beam group mt-8 md:mt-10">
            {copy.cta}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
