"use client";

import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useContact } from "@/components/contact-modal";
import { useStageAnchor } from "@/components/stage/bus";
import { PhaseReadout } from "@/components/ui/readouts";
import { ShiftText } from "@/components/ui/shift-text";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";
import { performance } from "@/lib/i18n/performance";
import { pct, utc } from "@/lib/performance";
import { useRecord } from "@/lib/use-record";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Source. The motto above, and under it the stage's first figure: a field of fringes across the whole window in which
 *  the name is written by displacement alone. Below the figure, what the instrument reads today. */
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
      <div className="mx-auto flex w-full max-w-[1320px] flex-1 flex-col justify-end px-5 pb-5 pt-4 md:px-10 md:pb-5">
        <motion.p {...rise(0.1)} className="label flex items-center gap-3 text-accent">
          <span className="h-px w-8 bg-accent/60" />
          {copy.tagline}
        </motion.p>

        <h1
          className={cn(
            "display mt-5 md:mt-6",
            lang === "zh"
              ? "text-[13.5vw] md:text-[min(7.6vw,11vh)] md:portrait:text-[11.5vw] 2xl:text-[min(7rem,11vh)]"
              : "text-[6.4vw] md:text-[min(5.9vw,9.2vh)] md:portrait:text-[6.6vw] 2xl:text-[min(5.5rem,9.2vh)]",
          )}
        >
          {copy.lines.map((line, i) => (
            <ShiftText key={line} inView={false} delay={0.3 + i * 0.14} className="block w-fit">
              {line}
            </ShiftText>
          ))}
        </h1>

        <motion.div {...rise(0.75)} className="mt-5 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <p className="font-serif text-lg italic text-paper/70 md:text-[1.35rem]">{copy.lede}</p>
          <div className="md:max-w-md md:text-right">
            <p className="label flex flex-wrap items-center gap-x-4 gap-y-2 text-paper/50 md:justify-end">
              <span className="whitespace-nowrap">{copy.fig}</span>
              <PhaseReadout className="whitespace-nowrap normal-case text-accent" />
            </p>
            <p className="mt-2.5 text-[12px] leading-relaxed text-paper/45">{copy.caption}</p>
          </div>
        </motion.div>
      </div>

      <div ref={anchor} data-stage-figure className="h-[clamp(200px,29svh,330px)] w-full shrink-0 portrait:h-[clamp(240px,34svh,470px)]" />

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
