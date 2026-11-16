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
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent/60" />
            <span className="font-serif text-[11px] uppercase tracking-[0.3em] text-accent">
              {copy.overline}
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent/60" />
          </div>
        </BlurFade>

        <div className="space-y-5 md:space-y-6">
          {copy.paragraphs.map((paragraph, index) => (
            <BlurFade key={index} delay={0.08 + index * 0.12}>
              <p className="text-balance break-keep font-serif text-lg leading-relaxed text-paper md:text-2xl md:leading-[1.75]">
                {paragraph}
              </p>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.5}>
          <div className="relative mx-auto mt-12 flex h-24 w-24 items-center justify-center md:mt-16 md:h-28 md:w-28">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgb(var(--c-accent)/0)_0%,rgb(var(--c-accent)/0.6)_28%,rgb(var(--c-paper)/0.12)_58%,rgb(var(--c-accent)/0)_100%)] animate-spin-slow"
              style={{
                mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
              }}
            />
            <span aria-hidden className="absolute inset-[13%] rounded-full border border-paper/15" />
            <Logo variant="mark" className="relative h-11 w-11 md:h-14 md:w-14" />
          </div>
        </BlurFade>

        <BlurFade delay={0.6}>
          <div className="mt-7 flex justify-center" title={copy.signature}>
            <Logo variant="wordmark" className="h-7 w-auto md:h-8" />
          </div>
          <p className="mt-3 font-serif text-sm italic text-accent md:text-base">
            {copy.tagline}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
