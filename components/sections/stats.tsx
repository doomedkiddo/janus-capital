"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { DotPattern } from "@/components/ui/patterns";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

export function Stats() {
  const { lang } = useLanguage();
  const stats = home[lang].stats;

  return (
    <section id="about" className="scroll-mt-24 px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <BlurFade>
          <div className="card relative overflow-hidden rounded-2xl md:rounded-3xl">
            <DotPattern
              width={20}
              height={20}
              className="fill-navy-300/35 [mask-image:radial-gradient(34%_90%_at_88%_10%,#000,transparent)]"
            />
            <div className="relative grid grid-cols-3 divide-x divide-slate-200/80">
              {stats.map((stat, index) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-center gap-1.5 px-2 py-6 text-center md:gap-2.5 md:py-10"
                >
                  <div className="font-display text-2xl font-bold tabular-nums text-navy-600 sm:text-3xl md:text-5xl">
                    {stat.ticker !== undefined ? (
                      <>
                        <NumberTicker value={stat.ticker} delay={index * 0.1} />
                        <span className="ml-0.5 text-sm font-semibold text-navy-400 sm:text-base md:text-2xl">
                          {stat.suffix}
                        </span>
                      </>
                    ) : (
                      stat.value
                    )}
                  </div>
                  <span aria-hidden className="h-0.5 w-6 rounded-full bg-bronze-400/70" />
                  <div className="text-[8px] font-semibold uppercase leading-tight tracking-wider text-slate-500 sm:text-[10px] md:text-xs">
                    {stat.label}
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
