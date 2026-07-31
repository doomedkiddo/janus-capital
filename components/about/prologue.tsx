"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { about } from "@/lib/i18n/about";
import { useLanguage } from "@/lib/i18n/language-context";

export function Prologue() {
  const { lang } = useLanguage();
  const copy = about[lang].prologue;

  return (
    <section className="relative px-5 py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <BlurFade>
          <div className="mb-8 flex items-center gap-3 md:mb-10">
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-bronze-700">
              {copy.overline}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-bronze-300/70 to-transparent" />
          </div>
        </BlurFade>

        {copy.paragraphs.map((paragraph, index) => (
          <BlurFade key={index} delay={0.08 + index * 0.1}>
            <p
              className={`text-[15px] leading-[1.95] text-slate-700 md:text-lg md:leading-[2.05] ${
                index === 0 ? "dropcap" : "mt-6 md:mt-7"
              }`}
            >
              {paragraph}
            </p>
          </BlurFade>
        ))}

        <BlurFade delay={0.34}>
          <p className="mt-10 font-serif text-xl text-navy-800 md:mt-12 md:text-2xl">
            {copy.nameLine}
          </p>
        </BlurFade>

        <BlurFade delay={0.42}>
          <div className="divider-bronze mt-10 md:mt-14" />
        </BlurFade>
      </div>
    </section>
  );
}
