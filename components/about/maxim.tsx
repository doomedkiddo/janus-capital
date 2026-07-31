"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { about } from "@/lib/i18n/about";
import { useLanguage } from "@/lib/i18n/language-context";

const numerals = ["I", "II", "III"];

export function Maxim() {
  const { lang } = useLanguage();
  const copy = about[lang].maxim;

  return (
    <section className="relative overflow-hidden px-5 py-14 md:py-20 lg:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(176,141,87,0.10),transparent)] blur-2xl md:h-[38rem] md:w-[38rem]"
      />

      <div className="relative mx-auto max-w-3xl text-center">
        <BlurFade>
          <p className="inscription font-serif text-[11px] text-bronze-700 md:text-xs">
            {copy.lead}
          </p>
        </BlurFade>

        <BlurFade delay={0.06}>
          <h2 className="mt-4 font-serif text-2xl text-navy-800 md:text-4xl">{copy.overline}</h2>
        </BlurFade>

        <BlurFade delay={0.12}>
          <p className="mx-auto mt-4 max-w-xl text-sm text-slate-600 md:text-base">{copy.intro}</p>
        </BlurFade>

        <div className="mt-12 space-y-8 md:mt-16 md:space-y-10">
          {copy.items.map((item, index) => (
            <BlurFade key={item.title} delay={0.18 + index * 0.12}>
              <div className="relative mx-auto max-w-2xl">
                <span
                  aria-hidden
                  className="mb-3 block font-serif text-sm text-bronze-500/90"
                >
                  {numerals[index]}
                </span>
                <p className="font-serif text-xl italic leading-snug text-navy-800 md:text-[1.75rem]">
                  {item.title}
                </p>
                <p className="mx-auto mt-3 max-w-lg text-[13px] leading-relaxed text-slate-600 md:text-[15px]">
                  {item.desc}
                </p>
                {index < copy.items.length - 1 && (
                  <span className="mx-auto mt-8 block h-px w-16 bg-bronze-300/60 md:mt-10" />
                )}
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
