"use client";

import Image from "next/image";
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
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-bronze-400/70" />
            <span className="font-serif text-[11px] uppercase tracking-[0.3em] text-bronze-700">
              {copy.overline}
            </span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-bronze-400/70" />
          </div>
        </BlurFade>

        <div className="space-y-5 md:space-y-6">
          {copy.paragraphs.map((paragraph, index) => (
            <BlurFade key={index} delay={0.08 + index * 0.12}>
              <p className="font-serif text-lg leading-relaxed text-navy-800 md:text-2xl md:leading-[1.75]">
                {paragraph}
              </p>
            </BlurFade>
          ))}
        </div>

        <BlurFade delay={0.5}>
          <div className="relative mx-auto mt-12 flex h-24 w-24 items-center justify-center md:mt-16 md:h-28 md:w-28">
            <span
              aria-hidden
              className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,rgba(176,141,87,0)_0%,rgba(176,141,87,0.55)_28%,rgba(214,188,138,0.15)_58%,rgba(176,141,87,0)_100%)] animate-spin-slow"
              style={{
                mask: "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
                WebkitMask:
                  "radial-gradient(farthest-side, transparent calc(100% - 1.5px), #000 calc(100% - 1.5px))",
              }}
            />
            <span aria-hidden className="absolute inset-[13%] rounded-full border border-bronze-300/50" />
            <Image
              src="/mark.png"
              alt="Janus Capital"
              width={80}
              height={80}
              className="relative h-11 w-11 object-contain md:h-14 md:w-14"
            />
          </div>
        </BlurFade>

        <BlurFade delay={0.6}>
          <p className="mt-7 font-display text-lg font-bold tracking-tight text-navy-900 md:text-xl">
            {copy.signature}
          </p>
          <p className="mt-2 font-serif text-sm italic text-bronze-700 md:text-base">
            {copy.tagline}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
