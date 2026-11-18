"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { about } from "@/lib/i18n/about";
import { useLanguage } from "@/lib/i18n/language-context";

export function Prologue() {
  const { lang } = useLanguage();
  const copy = about[lang].prologue;

  return (
    <section className="relative px-5 py-14 md:px-10 md:py-20 lg:py-24">
      <div className="mx-auto max-w-2xl">
        <BlurFade>
          <div className="mb-8 flex items-center gap-3 md:mb-10">
            <span className="font-mono text-[10.5px] text-accent">00</span>
            <span className="h-px w-8 bg-paper/30" />
            <span className="label text-paper/60">{copy.overline}</span>
          </div>
        </BlurFade>

        {copy.paragraphs.map((paragraph, index) => (
          <BlurFade key={index} delay={0.08 + index * 0.1}>
            <p
              className={`text-[14px] leading-[1.95] text-paper/70 md:text-[15.5px] md:leading-[2] ${
                index === 0 ? "dropcap" : "mt-6 md:mt-7"
              }`}
            >
              {paragraph}
            </p>
          </BlurFade>
        ))}

        <BlurFade delay={0.34}>
          <p className="display mt-10 text-balance md:break-keep text-[1.6rem] !leading-[1.4] text-paper md:mt-12 md:text-[2rem]">
            {copy.closing}
          </p>
        </BlurFade>

        <BlurFade delay={0.42}>
          <div className="mt-10 h-px bg-paper/15 md:mt-14" />
        </BlurFade>
      </div>
    </section>
  );
}
