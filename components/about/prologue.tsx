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
            <span className="font-serif text-xs uppercase tracking-[0.3em] text-accent">
              {copy.overline}
            </span>
            <span className="h-px flex-1 bg-gradient-to-r from-accent/40 to-transparent" />
          </div>
        </BlurFade>

        {copy.paragraphs.map((paragraph, index) => (
          <BlurFade key={index} delay={0.08 + index * 0.1}>
            <p
              className={`text-[15px] leading-[1.95] text-paper/70 md:text-lg md:leading-[2.05] ${
                index === 0 ? "dropcap" : "mt-6 md:mt-7"
              }`}
            >
              {paragraph}
            </p>
          </BlurFade>
        ))}

        <BlurFade delay={0.34}>
          <p className="mt-10 text-balance break-keep font-serif text-xl text-paper md:mt-12 md:text-2xl">
            {copy.closing}
          </p>
        </BlurFade>

        <BlurFade delay={0.42}>
          <div className="divider-accent mt-10 md:mt-14" />
        </BlurFade>
      </div>
    </section>
  );
}
