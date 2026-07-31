"use client";

import { AboutCta } from "@/components/about/about-cta";
import { AboutHero } from "@/components/about/about-hero";
import { Chapter } from "@/components/about/chapter";
import { ChapterNav } from "@/components/about/chapter-nav";
import { Epilogue } from "@/components/about/epilogue";
import { CoinHinge } from "@/components/about/glyphs/coin-hinge";
import { Gate } from "@/components/about/glyphs/gate";
import { KeyThreshold } from "@/components/about/glyphs/key-threshold";
import { Throne } from "@/components/about/glyphs/throne";
import { TwoFaces } from "@/components/about/glyphs/two-faces";
import { Maxim } from "@/components/about/maxim";
import { Prologue } from "@/components/about/prologue";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { about } from "@/lib/i18n/about";
import { useLanguage } from "@/lib/i18n/language-context";

const glyphs = [TwoFaces, Gate, CoinHinge, Throne, KeyThreshold];

export function AboutNarrative() {
  const { lang } = useLanguage();
  const chapters = about[lang].chapters;

  return (
    <>
      <ScrollProgress />
      <ChapterNav />
      <main>
        <AboutHero />
        <div className="marble-panel">
          <TracingBeam>
            <div className="relative z-[1]">
              <Prologue />
              {chapters.map((chapter, index) => {
                const Glyph = glyphs[index];
                return (
                  <Chapter
                    key={chapter.numeral}
                    chapter={chapter}
                    index={index}
                    glyph={<Glyph className="text-bronze-500/75" />}
                  />
                );
              })}
              <Maxim />
              <Epilogue />
            </div>
          </TracingBeam>
        </div>
        <AboutCta />
      </main>
    </>
  );
}
