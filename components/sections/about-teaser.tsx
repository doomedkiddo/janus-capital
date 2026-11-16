"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LoopPulses, SagnacLoop } from "@/components/about/glyphs/sagnac-loop";
import { Formula } from "@/components/about/math";
import { BlurFade } from "@/components/ui/blur-fade";
import { about } from "@/lib/i18n/about";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

export function AboutTeaser() {
  const { lang } = useLanguage();
  const copy = home[lang].teaser;
  const chapters = about[lang].chapters;

  return (
    <section className="ink-surface bg-ink-3 px-4 py-20 text-paper md:px-6 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
        <div>
          <BlurFade>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent md:text-xs">{copy.overline}</p>
          </BlurFade>
          <BlurFade delay={0.06}>
            <Formula className="mt-5 text-lg text-paper/60 md:text-xl" />
          </BlurFade>
          <BlurFade delay={0.1}>
            <h2
              className={cn(
                "mt-4 text-balance break-keep headline text-4xl sm:text-5xl md:text-6xl",
                lang === "zh" ? "leading-[1.22]" : "leading-[1.1]",
              )}
            >
              {copy.title}
            </h2>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-paper/75 md:text-lg">{copy.body}</p>
          </BlurFade>
          <BlurFade delay={0.22}>
            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-paper/60 md:text-sm">
              {chapters.map((chapter) => (
                <span key={chapter.marker} className="flex items-center gap-1.5">
                  <span className="font-serif text-accent">{chapter.marker}</span>
                  {chapter.title}
                </span>
              ))}
            </div>
          </BlurFade>
          <BlurFade delay={0.28}>
            <Link
              href="/about"
              className="group mt-9 inline-flex items-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:text-base"
            >
              {copy.cta}
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </BlurFade>
        </div>

        <BlurFade delay={0.12} className="relative mx-auto w-44 sm:w-56 md:w-full md:max-w-[20rem]">
          <SagnacLoop className="text-accent/80" />
          <LoopPulses className="absolute inset-0 text-accent" />
        </BlurFade>
      </div>
    </section>
  );
}
