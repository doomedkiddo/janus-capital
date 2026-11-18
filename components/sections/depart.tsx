"use client";

import { ArrowUpRight } from "lucide-react";
import { useContact } from "@/components/contact-modal";
import { useStageAnchor } from "@/components/stage/bus";
import { ChapterMark } from "@/components/ui/chapter-mark";
import { OmegaReadout, PhaseReadout } from "@/components/ui/readouts";
import { ShiftText } from "@/components/ui/shift-text";
import { about } from "@/lib/i18n/about";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

/** Depart. The last figure is the mark's two rows across the whole window, still shifting. */
export function Depart() {
  const { lang } = useLanguage();
  const cta = about[lang].cta;
  const copy = home[lang];
  const { open } = useContact();
  const strip = useStageAnchor("strip");

  return (
    <section id="contact" className="scroll-mt-16 border-t border-paper/15 pt-24 md:pt-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <ChapterMark index={5} />
        <h2 className={cn("display mt-6 md:mt-8", lang === "zh" ? "text-[3rem] sm:text-[3.6rem] md:text-[8rem]" : "text-[2.5rem] md:text-[6rem]")}>
          <ShiftText className="!whitespace-normal">{cta.title}</ShiftText>
        </h2>
        <div className="mt-8 flex flex-col gap-8 md:mt-12 md:flex-row md:items-end md:justify-between">
          <p className="max-w-xl text-[15px] leading-relaxed text-paper/70 md:text-[17px]">{cta.desc}</p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={open} className="btn-beam btn-beam--solid">
              {copy.hero.ctaSecondary}
              <ArrowUpRight className="h-4 w-4" />
            </button>
            <a href={`mailto:${copy.contact.email}`} className="btn-beam font-mono !text-[12px] !tracking-normal">
              {copy.contact.email}
            </a>
          </div>
        </div>
        <p className="label mt-16 flex justify-between text-paper/45 md:mt-24">
          <PhaseReadout className="normal-case" />
          <OmegaReadout className="normal-case" />
        </p>
      </div>
      <div ref={strip} data-stage-figure className="mt-3 h-[20svh] w-full md:h-[26svh]" />
    </section>
  );
}
