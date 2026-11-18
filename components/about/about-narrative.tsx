"use client";

import { useEffect } from "react";
import { AboutCta } from "@/components/about/about-cta";
import { AboutHero } from "@/components/about/about-hero";
import { Chapter } from "@/components/about/chapter";
import { ChapterNav } from "@/components/about/chapter-nav";
import { Epilogue } from "@/components/about/epilogue";
import { Constellation } from "@/components/about/glyphs/constellation";
import { FibreCoil } from "@/components/about/glyphs/fibre-coil";
import { SagnacLoop } from "@/components/about/glyphs/sagnac-loop";
import { SurveyLoop } from "@/components/about/glyphs/survey-loop";
import { Instruments } from "@/components/about/instruments";
import { NameStatement } from "@/components/about/name-statement";
import { Prologue } from "@/components/about/prologue";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { about } from "@/lib/i18n/about";
import { useLanguage } from "@/lib/i18n/language-context";

const glyphs = [SagnacLoop, SurveyLoop, FibreCoil, Constellation];

export function AboutNarrative() {
  const { lang } = useLanguage();
  const chapters = about[lang].chapters;

  useEffect(() => {
    document.title = about[lang].meta.title;
  }, [lang]);

  return (
    <>
      <ScrollProgress />
      <ChapterNav />
      <main>
        <AboutHero />
        <div className="relative">
          <Prologue />
          {chapters.map((chapter, index) => {
            const Glyph = glyphs[index];
            return <Chapter key={chapter.marker} chapter={chapter} index={index} glyph={<Glyph className="text-accent/80" />} />;
          })}
          <NameStatement />
          <Instruments />
          <Epilogue />
        </div>
        <AboutCta />
      </main>
    </>
  );
}
