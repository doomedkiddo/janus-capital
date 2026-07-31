"use client";

import { motion } from "motion/react";
import { BarChart3, Check } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

export function Strategy() {
  const { lang } = useLanguage();
  const copy = home[lang].strategy;

  return (
    <section id="strategy" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-28">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-10 md:gap-16 lg:flex-row">
        <div className="space-y-6 md:space-y-8 lg:w-1/2">
          <BlurFade>
            <h2 className="text-center font-display text-3xl font-bold leading-tight tracking-tight text-slate-900 sm:text-4xl md:text-5xl lg:text-left">
              {copy.title1}
              <br />
              <span className="bg-gradient-to-r from-navy-600 to-blue-500 bg-clip-text text-transparent">
                {copy.title2}
              </span>
            </h2>
          </BlurFade>

          <BlurFade delay={0.08}>
            <p className="text-center text-sm leading-relaxed text-slate-500 md:text-lg lg:text-left">
              {copy.subtitle}
            </p>
          </BlurFade>

          <ul className="space-y-4 md:space-y-6">
            {copy.items.map((item, index) => (
              <BlurFade key={item.title} delay={0.06 + index * 0.04} as="li">
                <div className="group flex items-start gap-3 md:gap-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-navy-100 bg-navy-50 text-navy-600 transition-colors group-hover:border-navy-200 group-hover:bg-navy-100 md:mt-1 md:h-8 md:w-8">
                    <Check className="h-3 w-3 md:h-4 md:w-4" />
                  </span>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 md:text-lg">{item.title}</h4>
                    <p className="mt-0.5 text-xs leading-relaxed text-slate-500 md:text-sm">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </BlurFade>
            ))}
          </ul>
        </div>

        <div className="w-full lg:w-1/2">
          <BlurFade delay={0.1} direction="right">
            <div className="card relative overflow-hidden rounded-2xl p-3 md:rounded-3xl md:p-4">
              <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl border border-slate-100 bg-gradient-to-br from-slate-50 to-slate-100/60 md:rounded-2xl">
                <svg
                  aria-hidden
                  viewBox="0 0 400 200"
                  className="absolute inset-0 h-full w-full"
                  preserveAspectRatio="none"
                >
                  <defs>
                    <linearGradient id="strategy-area" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3D679D" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#3D679D" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                  {[44, 84, 124, 164].map((y) => (
                    <line
                      key={y}
                      x1="0"
                      y1={y}
                      x2="400"
                      y2={y}
                      stroke="#0F172A"
                      strokeOpacity="0.05"
                      strokeWidth="1"
                    />
                  ))}
                  <motion.path
                    d="M0 152 L48 134 L96 144 L144 98 L192 114 L240 68 L288 84 L336 44 L400 56 L400 200 L0 200 Z"
                    fill="url(#strategy-area)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.9 }}
                  />
                  <motion.path
                    d="M0 152 L48 134 L96 144 L144 98 L192 114 L240 68 L288 84 L336 44 L400 56"
                    fill="none"
                    stroke="#3D679D"
                    strokeWidth="1.8"
                    vectorEffect="non-scaling-stroke"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  />
                </svg>
                <motion.span
                  aria-hidden
                  initial={{ opacity: 0, scale: 0.6 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 1.7 }}
                  className="absolute right-[15%] top-[21%] h-2 w-2 rounded-full bg-navy-500 ring-4 ring-navy-500/15"
                />
                <div className="absolute left-3 top-3 flex items-center gap-2 text-[9px] font-semibold uppercase tracking-wider text-slate-400 md:left-5 md:top-5 md:text-[10px]">
                  <BarChart3 className="h-3.5 w-3.5 text-navy-400" />
                  PnL · 30D
                </div>
                <span className="absolute right-3 top-3 text-[9px] font-semibold uppercase tracking-wider text-slate-300 md:right-5 md:top-5 md:text-[10px]">
                  UTC · 4H
                </span>
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-lg border border-slate-200 bg-white/90 p-2 shadow-sm backdrop-blur md:bottom-6 md:left-6 md:right-6 md:rounded-xl md:p-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                      <span className="absolute inset-0 rounded-full bg-emerald-500 animate-pulse-ring" />
                      <span className="relative h-full w-full rounded-full bg-emerald-500" />
                    </span>
                    <span className="text-[8px] font-semibold uppercase tracking-wider text-slate-500 md:text-[10px]">
                      {copy.feed}
                    </span>
                  </div>
                  <span className="font-display text-[10px] font-semibold text-emerald-600 md:text-xs">
                    ETH/USDT +2.4%
                  </span>
                </div>
              </div>
              <BorderBeam duration={10} size={80} />
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
}
