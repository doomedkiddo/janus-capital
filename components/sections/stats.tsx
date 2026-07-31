"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

export function Stats() {
  const { lang } = useLanguage();
  const stats = home[lang].stats;

  return (
    <section id="about" className="scroll-mt-24 px-4 py-12 md:px-6 md:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-3 gap-3 md:gap-8">
        {stats.map((stat, index) => (
          <BlurFade key={stat.label} delay={index * 0.08}>
            <div className="card group relative h-full space-y-1 overflow-hidden rounded-xl p-4 md:space-y-2 md:rounded-2xl md:p-8">
              <span
                aria-hidden
                className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-navy-200 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              />
              <div className="font-display text-xl font-bold text-navy-600 sm:text-2xl md:text-4xl">
                {stat.ticker !== undefined ? (
                  <>
                    <NumberTicker value={stat.ticker} delay={index * 0.1} />
                    {stat.suffix}
                  </>
                ) : (
                  stat.value
                )}
              </div>
              <div className="text-[8px] font-semibold uppercase leading-tight tracking-wider text-slate-500 sm:text-[10px] md:text-xs">
                {stat.label}
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
