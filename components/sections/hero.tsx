"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, ChevronDown, Download } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { Marquee } from "@/components/ui/marquee";
import { GridPattern } from "@/components/ui/patterns";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

export function Hero() {
  const { lang } = useLanguage();
  const copy = home[lang].hero;
  const reduce = useReducedMotion();
  const tickerItems = copy.ticker.split(" • ");

  return (
    <section className="relative flex min-h-[86vh] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-slate-50 via-white to-white px-4 pb-14 pt-20 md:min-h-[90vh] md:px-6 md:pb-16 md:pt-24">
      <GridPattern
        width={56}
        height={56}
        className="[mask-image:radial-gradient(42%_42%_at_50%_36%,#000_8%,transparent_100%)] stroke-slate-300/40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[-14rem] h-[30rem] w-[46rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(46,76,127,0.10),transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent"
      />

      <div className="relative w-full max-w-4xl space-y-5 text-center md:space-y-7">
        <BlurFade delay={0.05}>
          <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-navy-200/80 bg-navy-50/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-navy-700 backdrop-blur md:px-4 md:py-1.5 md:text-xs">
            <span className="relative flex h-2 w-2 items-center justify-center">
              <span className="absolute h-2 w-2 rounded-full bg-navy-500 animate-pulse-ring" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-navy-600" />
            </span>
            <span className="line-clamp-1">{copy.tagline}</span>
          </div>
        </BlurFade>

        <BlurFade delay={0.14}>
          <div className="mx-auto flex flex-col items-center">
            <div className="relative flex items-center justify-center">
              <span
                aria-hidden
                className="absolute h-[190%] w-[190%] rounded-full bg-[radial-gradient(closest-side,rgba(255,255,255,0.95),rgba(255,255,255,0))]"
              />
              <Image
                src="/mark.png"
                alt="Janus Capital"
                width={128}
                height={128}
                priority
                className="relative h-14 w-14 object-contain sm:h-16 sm:w-16 md:h-[4.5rem] md:w-[4.5rem]"
              />
            </div>
            <span
              aria-hidden
              className="mt-4 h-8 w-px bg-gradient-to-b from-bronze-400/70 to-transparent md:mt-5 md:h-10"
            />
          </div>
        </BlurFade>

        <motion.h1
          initial={reduce ? undefined : { opacity: 0, letterSpacing: "0.14em", filter: "blur(8px)" }}
          animate={reduce ? undefined : { opacity: 1, letterSpacing: "-0.015em", filter: "blur(0px)" }}
          transition={{ delay: 0.22, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl font-extrabold leading-[1.08] text-slate-900 sm:text-4xl md:text-6xl lg:text-[4.25rem]"
        >
          {copy.title1}
          <br />
          <span className="bg-gradient-to-r from-navy-700 via-navy-600 to-blue-500 bg-clip-text text-transparent">
            {copy.title2}
          </span>
        </motion.h1>

        <BlurFade delay={0.4}>
          <div className="mx-auto flex max-w-xl items-center gap-4">
            <span className="h-px flex-1 bg-gradient-to-r from-transparent to-bronze-300/70" />
            <span className="inscription shrink-0 font-serif text-[10px] text-bronze-600 md:text-xs">
              {copy.inscription}
            </span>
            <span className="h-px flex-1 bg-gradient-to-l from-transparent to-bronze-300/70" />
          </div>
        </BlurFade>

        {copy.subtitle ? (
          <BlurFade delay={0.46}>
            <p className="mx-auto max-w-2xl px-4 text-base leading-relaxed text-slate-600 md:text-xl">
              {copy.subtitle}
            </p>
          </BlurFade>
        ) : null}

        <BlurFade delay={0.52}>
          <div className="flex flex-col items-center justify-center gap-3 px-4 pt-1 sm:flex-row md:gap-4">
            <a
              href="#strategy"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-700 hover:shadow-[0_14px_32px_-12px_rgba(46,76,127,0.7)] sm:w-auto md:px-10 md:py-4 md:text-base"
            >
              {copy.ctaPrimary}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <button
              type="button"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-6 py-3.5 text-sm font-semibold text-slate-700 backdrop-blur transition-all hover:border-slate-400 hover:bg-white sm:w-auto md:px-10 md:py-4 md:text-base"
            >
              {copy.ctaSecondary}
              <Download className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </button>
          </div>
        </BlurFade>

        <BlurFade delay={0.62}>
          <div className="ticker-mask pt-3 md:pt-5">
            <Marquee duration="42s" gap="2.5rem" pauseOnHover>
              {tickerItems.map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2.5 whitespace-nowrap text-[10px] uppercase tracking-[0.24em] text-slate-400 md:text-xs"
                >
                  <span className="h-1 w-1 rounded-full bg-slate-300" />
                  {item}
                </span>
              ))}
            </Marquee>
          </div>
        </BlurFade>
      </div>

      <a
        href="#about"
        className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 text-[9px] uppercase tracking-[0.28em] text-slate-400 transition-colors hover:text-navy-600 md:flex"
      >
        {copy.scroll}
        <ChevronDown className="h-3.5 w-3.5 animate-float" />
      </a>
    </section>
  );
}
