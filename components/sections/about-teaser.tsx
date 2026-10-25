"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TwoFaces } from "@/components/about/glyphs/two-faces";
import { BlurFade } from "@/components/ui/blur-fade";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

const numerals = ["I", "II", "III", "IV", "V"];

export function AboutTeaser() {
  const { lang } = useLanguage();
  const copy = home[lang].teaser;

  return (
    <section className="bg-pine-700 px-4 py-20 text-ivory-100 md:px-6 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div>
          <BlurFade>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-brass-300 md:text-xs">{copy.overline}</p>
          </BlurFade>
          <BlurFade delay={0.06}>
            <p className="inscription mt-5 font-serif text-xs text-ivory-100/60 md:text-sm">{copy.latin}</p>
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2 className="mt-4 font-serif text-4xl leading-[1.1] sm:text-5xl md:text-6xl">{copy.title}</h2>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory-100/75 md:text-lg">{copy.body}</p>
          </BlurFade>
          <BlurFade delay={0.22}>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-ivory-100/60 md:text-sm">
              {copy.chapters.map((chapter, index) => (
                <span key={chapter} className="flex items-center gap-1.5">
                  <span className="font-serif text-brass-300">{numerals[index]}</span>
                  {chapter}
                </span>
              ))}
            </div>
          </BlurFade>
          <BlurFade delay={0.28}>
            <Link
              href="/about"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-ivory-100 px-7 py-3.5 text-sm font-semibold text-pine-900 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-300/60 md:text-base"
            >
              {copy.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </BlurFade>
        </div>

        <BlurFade delay={0.12} className="mx-auto w-44 sm:w-56 md:w-full md:max-w-[20rem]">
          <TwoFaces className="text-brass-300/80" />
        </BlurFade>
      </div>
    </section>
  );
}
