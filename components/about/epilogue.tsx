"use client";

import { Logo } from "@/components/logo";
import { BlurFade } from "@/components/ui/blur-fade";
import { about } from "@/lib/i18n/about";
import { useLanguage } from "@/lib/i18n/language-context";

export function Epilogue() {
  const { lang } = useLanguage();
  const copy = about[lang].epilogue;

  return (
    <section className="relative px-5 py-14 md:py-20">
      <div className="mx-auto max-w-2xl text-center">
        <BlurFade>
          <div className="mx-auto mb-10 flex items-center justify-center gap-3 md:mb-14">
            <span className="h-px w-10 bg-paper/30" />
            <span className="label text-accent">{copy.overline}</span>
            <span className="h-px w-10 bg-paper/30" />
          </div>
        </BlurFade>

        <div className="space-y-5 md:space-y-6">
          {copy.paragraphs.map((paragraph, index) => (
            <BlurFade key={index} delay={0.08 + index * 0.12}>
              <p className="display text-balance md:break-keep text-[1.5rem] !leading-[1.5] text-paper md:text-[2.1rem]">
                {paragraph}
              </p>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.5}>
          <div className="reg relative mx-auto mt-12 flex h-24 w-24 items-center justify-center md:mt-16 md:h-28 md:w-28">
            <Logo variant="mark" className="relative h-11 w-11 md:h-14 md:w-14" />
          </div>
        </BlurFade>

        <BlurFade delay={0.6}>
          <div className="mt-7 flex justify-center" title={copy.signature}>
            <Logo variant="wordmark" className="h-7 w-auto md:h-8" />
          </div>
          <p className="mt-4 text-[13px] text-accent md:text-[14px]">
            {copy.tagline}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
