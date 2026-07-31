"use client";

import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { GridPattern } from "@/components/ui/patterns";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

const lanes = [
  { label: "Signal", value: "1.4M / s", width: "82%", color: "bg-navy-500" },
  { label: "Execution", value: "9.6K / s", width: "61%", color: "bg-navy-400" },
  { label: "Risk", value: "120K / s", width: "44%", color: "bg-navy-300" },
];

export function Infrastructure() {
  const { lang } = useLanguage();
  const copy = home[lang].infrastructure;

  return (
    <section id="infrastructure" className="relative scroll-mt-24 overflow-hidden px-4 py-16 md:px-6 md:py-28">
      <GridPattern
        width={64}
        height={64}
        className="[mask-image:radial-gradient(40%_52%_at_74%_46%,#000_6%,transparent_100%)] stroke-slate-300/25"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-8 md:gap-12 lg:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6 md:space-y-8">
          <BlurFade>
            <h2 className="text-center font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-left">
              {copy.title1}{" "}
              <span className="bg-gradient-to-r from-navy-600 to-blue-500 bg-clip-text text-transparent">
                {copy.title2}
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={0.08}>
            <p className="max-w-2xl text-center text-sm text-slate-500 md:text-base lg:text-left">
              {copy.subtitle}
            </p>
          </BlurFade>

          <div className="grid grid-cols-3 gap-3 md:gap-4">
            {copy.stats.map((stat, index) => (
              <BlurFade key={stat.label} delay={0.14 + index * 0.06}>
                <div className="card h-full rounded-xl p-3 text-center md:p-5">
                  <div className="font-display text-lg font-bold text-navy-600 sm:text-xl md:text-2xl">
                    {stat.ticker !== undefined ? (
                      <>
                        <NumberTicker value={stat.ticker} delay={index * 0.1} />
                        {stat.suffix}
                      </>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <div className="mt-1 text-[8px] uppercase leading-tight tracking-wider text-slate-500 sm:text-[10px] md:mt-2 md:text-xs">
                    {stat.label}
                  </div>
                </div>
              </BlurFade>
            ))}
          </div>

          <BlurFade delay={0.32}>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3">
                <span className="h-px w-6 bg-slate-300" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                  {copy.regionsLabel}
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                {copy.regions.map((region) => (
                  <span
                    key={region}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white/70 px-2.5 py-1.5 text-[11px] font-medium text-slate-600 backdrop-blur md:text-xs"
                  >
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    {region}
                  </span>
                ))}
              </div>
            </div>
          </BlurFade>
        </div>

        <BlurFade delay={0.1} direction="right">
          <div className="card space-y-4 rounded-2xl p-5 md:space-y-6 md:p-8">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 md:text-xs">
              {copy.pipeline}
            </div>
            <div className="space-y-3 md:space-y-5">
              {copy.steps.map((step, index) => (
                <BlurFade key={step} delay={0.16 + index * 0.08}>
                  <div className="flex items-center gap-3 md:gap-4">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-navy-100 bg-navy-50 font-display text-xs font-semibold text-navy-600 md:h-8 md:w-8 md:text-sm">
                      {index + 1}
                    </span>
                    <span className="text-xs text-slate-700 md:text-base">{step}</span>
                  </div>
                </BlurFade>
              ))}
            </div>
            <div className="mt-6 space-y-3 rounded-xl border border-slate-200 bg-slate-50/80 p-4 md:mt-8 md:space-y-4 md:p-5">
              {lanes.map((lane, index) => (
                <div key={lane.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-[9px] font-semibold uppercase tracking-wider text-slate-500 md:text-[10px]">
                    <span>{lane.label}</span>
                    <span className="tabular-nums text-slate-400">{lane.value}</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-slate-200/80">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: lane.width }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{
                        duration: 1.1,
                        delay: 0.2 + index * 0.14,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className={`h-full rounded-full ${lane.color}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
