"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useContact } from "@/components/contact-modal";
import { useStageAnchor } from "@/components/stage/bus";
import { PhaseReadout } from "@/components/ui/readouts";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";
import { performance } from "@/lib/i18n/performance";
import { pct, utc } from "@/lib/performance";
import { useRecord } from "@/lib/use-record";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Source. The stage's first figure fills the screen: a field of fringes across the whole window in which the name is
 *  written by displacement alone. Below the figure, what the instrument reads today. */
export function Hero() {
  const { lang } = useLanguage();
  const copy = home[lang].hero;
  const perf = performance[lang];
  const { open } = useContact();
  const rec = useRecord();
  const anchor = useStageAnchor("word");
  const reduce = useReducedMotion();
  const live = rec && rec !== "error" ? rec : null;

  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: reduce ? { duration: 0 } : { duration: 0.9, ease: EASE, delay },
  });

  const stats = [
    { label: perf.kpi.cum, value: live ? pct(live.kpi.cum_return) : "—", accent: true },
    { label: perf.kpi.sharpe[0], value: live?.kpi.sharpe?.toFixed(2) ?? "—" },
    { label: perf.kpi.dd[0], value: live ? pct(live.kpi.max_dd) : "—" },
  ];

  return (
    <section id="top" className="relative flex min-h-[calc(100svh-4rem)] flex-col md:min-h-[calc(100svh-5rem)]">
      <h1 className="sr-only">Sagnac Trading</h1>
      <motion.div
        {...rise(0.1)}
        className="mx-auto flex w-full max-w-[1320px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-5 pt-8 md:px-10 md:pt-10"
      >
        <p className="label flex items-center gap-3 text-accent">
          <span className="h-px w-8 bg-accent/60" />
          {copy.tagline}
        </p>
        <p className="label flex flex-wrap items-center gap-x-4 gap-y-2 text-paper/50">
          <span className="whitespace-nowrap">{copy.fig}</span>
          <PhaseReadout className="whitespace-nowrap normal-case text-accent" />
        </p>
      </motion.div>

      {/* the name, written in the fringes by the stage: the hero is this figure */}
      <div ref={anchor} data-stage-figure className="mt-6 min-h-[260px] w-full flex-1 md:mt-8" />

      <div className="mx-auto w-full max-w-[1320px] px-5 md:px-10">
        <motion.div {...rise(1.5)} className="flex flex-col gap-6 py-6 md:flex-row md:items-end md:justify-between md:py-6">
          <a href="#performance" className="group flex items-end gap-6 md:gap-10">
            {stats.map((s) => (
              <span key={s.label} className="flex flex-col gap-2">
                <span className="label text-paper/45">{s.label}</span>
                <span className={cn("display text-[1.7rem] tabular-nums leading-none md:text-[2.1rem]", s.accent && "text-accent")}>{s.value}</span>
              </span>
            ))}
            <span className="hidden flex-col gap-2 lg:flex">
              <span className="label flex items-center gap-2 text-paper/45">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {copy.live}
              </span>
              <span className="font-mono text-[13px] tabular-nums leading-none text-paper/70">
                {live ? `${utc(live.since, "ymd")} → ${utc(live.asof, "ymd")}` : "—"}
              </span>
            </span>
          </a>

          <div className="flex gap-3">
            <a href="#performance" className="btn-beam btn-beam--solid flex-1 md:flex-none">
              {copy.ctaPrimary}
              <ArrowDown className="h-4 w-4" />
            </a>
            <button type="button" onClick={open} className="btn-beam flex-1 md:flex-none">
              {copy.ctaSecondary}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
