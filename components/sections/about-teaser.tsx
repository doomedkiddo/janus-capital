"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { TwoFaces } from "@/components/about/glyphs/two-faces";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

const numerals = ["I", "II", "III", "IV", "V"];

export function AboutTeaser() {
  const { lang } = useLanguage();
  const copy = home[lang].teaser;

  return (
    <section className="bg-slate-50 px-4 pb-16 md:px-6 md:pb-28">
      <div className="mx-auto max-w-6xl">
        <BlurFade>
          <div className="marble-surface marble-veined relative overflow-hidden rounded-2xl border border-bronze-200/70 md:rounded-3xl">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-3 rounded-xl border border-bronze-300/35 md:inset-5 md:rounded-2xl"
            />

            <div className="relative z-[1] grid items-center gap-8 p-7 sm:p-10 md:grid-cols-[1.35fr_1fr] md:gap-12 md:p-14">
              <div className="space-y-5">
                <div className="flex items-center gap-3">
                  <span className="h-px w-8 bg-bronze-400/70" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-bronze-700 md:text-[11px]">
                    {copy.overline}
                  </span>
                </div>

                <p className="inscription font-serif text-[11px] text-bronze-600/90 md:text-xs">
                  {copy.latin}
                </p>

                <h2 className="font-serif text-2xl leading-snug text-navy-800 sm:text-3xl md:text-[2.6rem] md:leading-[1.2]">
                  {copy.title}
                </h2>

                <p className="max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                  {copy.body}
                </p>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 pt-1">
                  {copy.chapters.map((chapter, index) => (
                    <span
                      key={chapter}
                      className="flex items-center gap-1.5 text-[11px] text-slate-500 md:text-xs"
                    >
                      <span className="font-serif text-bronze-500">{numerals[index]}</span>
                      {chapter}
                      {index < copy.chapters.length - 1 && (
                        <span className="ml-1.5 text-bronze-300">·</span>
                      )}
                    </span>
                  ))}
                </div>

                <Link
                  href="/about"
                  className="group mt-2 inline-flex items-center gap-2 rounded-xl border border-bronze-400/60 bg-white/60 px-5 py-2.5 font-serif text-sm text-bronze-700 backdrop-blur transition-all hover:border-bronze-500 hover:bg-white hover:shadow-[0_10px_26px_-14px_rgba(140,109,63,0.55)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bronze-400/70 focus-visible:ring-offset-2 md:px-6 md:py-3 md:text-base"
                >
                  {copy.cta}
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>

              <div className="mx-auto w-36 sm:w-44 md:w-full md:max-w-[16rem]">
                <TwoFaces className="text-bronze-500/70" />
              </div>
            </div>

            <BorderBeam
              duration={16}
              size={110}
              colorFrom="rgba(176,141,87,0)"
              colorTo="rgba(176,141,87,0.85)"
            />
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
