"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Gate } from "@/components/about/glyphs/gate";
import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/patterns";
import { about } from "@/lib/i18n/about";
import { useLanguage } from "@/lib/i18n/language-context";

export function AboutHero() {
  const { lang } = useLanguage();
  const copy = about[lang].hero;
  const reduce = useReducedMotion();

  return (
    <section className="marble-surface marble-veined relative flex min-h-[100svh] items-center justify-center overflow-hidden px-5 pb-24 pt-24 md:pb-28 md:pt-28">
      <DotPattern
        width={26}
        height={26}
        className="[mask-image:radial-gradient(52%_46%_at_50%_46%,#000_10%,transparent_100%)] fill-bronze-400/25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-[52%] opacity-[0.07] md:h-[40rem] md:w-[40rem]"
      >
        <Gate className="text-bronze-700" />
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-marble-100 to-transparent"
      />

      <div className="relative z-[1] flex w-full max-w-3xl flex-col items-center text-center">
        <BlurFade delay={0.05}>
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-bronze-700/80">
            <span className="h-px w-6 bg-bronze-400/60" />
            Janus Capital
            <span className="h-px w-6 bg-bronze-400/60" />
          </div>
        </BlurFade>

        <motion.h1
          initial={{ opacity: 0, letterSpacing: "0.42em", filter: "blur(10px)" }}
          animate={{ opacity: 1, letterSpacing: "0.14em", filter: "blur(0px)" }}
          transition={
            reduce ? { duration: 0 } : { delay: 0.18, duration: 1.5, ease: [0.22, 1, 0.36, 1] }
          }
          className="mt-7 pl-[0.14em] font-serif text-[3.25rem] font-normal leading-none text-navy-800 sm:text-7xl md:mt-9 md:text-[6.5rem]"
        >
          {copy.wordmark}
        </motion.h1>

        <BlurFade delay={0.5}>
          <div className="mt-7 flex items-center gap-3 md:mt-9">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-bronze-400/80 md:w-24" />
            <span className="h-1.5 w-1.5 rotate-45 border border-bronze-500/80" />
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-bronze-400/80 md:w-24" />
          </div>
        </BlurFade>

        <BlurFade delay={0.58}>
          <p className="inscription mt-6 font-serif text-xs text-bronze-700 md:mt-7 md:text-sm">
            {copy.latin}
          </p>
        </BlurFade>

        <BlurFade delay={0.64}>
          <p className="mt-2.5 max-w-md text-[11px] leading-relaxed text-slate-500 md:text-xs">
            {copy.latinSource}
          </p>
        </BlurFade>

        <BlurFade delay={0.72}>
          <h2 className="mt-9 font-serif text-2xl leading-snug text-navy-800 sm:text-3xl md:mt-12 md:text-[2.5rem]">
            {copy.title}
          </h2>
        </BlurFade>

        <BlurFade delay={0.8}>
          <p className="mt-4 text-sm text-slate-600 md:mt-5 md:text-base">{copy.lede}</p>
        </BlurFade>
      </div>

      <div className="absolute bottom-8 left-1/2 z-[1] flex -translate-x-1/2 flex-col items-center gap-1.5 text-[9px] uppercase tracking-[0.3em] text-bronze-700/70">
        {copy.scroll}
        <ChevronDown className="h-3.5 w-3.5 animate-float" />
      </div>
    </section>
  );
}
