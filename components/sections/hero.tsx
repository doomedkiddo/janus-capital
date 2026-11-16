"use client";

import { ArrowDown, Mail } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { DotPattern } from "@/components/ui/patterns";
import { PhaseStrip } from "@/components/ui/phase-strip";
import { useContact } from "@/components/contact-modal";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

export function Hero() {
  const { lang } = useLanguage();
  const copy = home[lang].hero;
  const { open } = useContact();

  return (
    <section className="ink-surface story-surface relative flex min-h-[72vh] flex-col items-center justify-center overflow-hidden px-4 pb-12 pt-20 text-center text-paper md:min-h-[82vh] md:px-6 md:pb-14 md:pt-28">
      <DotPattern
        width={26}
        height={26}
        className="[mask-image:radial-gradient(52%_46%_at_50%_44%,#000_10%,transparent_100%)] fill-paper/[0.10]"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      <div className="relative z-[1] w-full max-w-5xl">
        <BlurFade delay={0.05}>
          <p className="flex items-center justify-center gap-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-accent md:text-xs">
            <span className="h-px w-6 bg-accent/50" />
            {copy.tagline}
            <span className="h-px w-6 bg-accent/50" />
          </p>
        </BlurFade>

        <BlurFade delay={0.14}>
          <h1 className="mt-7 headline text-5xl leading-[1.02] sm:text-6xl md:mt-9 md:text-8xl lg:text-[7rem]">
            {copy.title1}
            <br />
            {copy.title2}
          </h1>
        </BlurFade>

        <BlurFade delay={0.26}>
          <p className="mx-auto mt-7 max-w-xl headline text-lg italic text-paper/70 md:mt-9 md:text-2xl">
            {copy.inscription}
          </p>
        </BlurFade>

        <BlurFade delay={0.36}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-12 md:gap-4">
            <a
              href="#performance"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:w-auto md:px-9 md:py-4 md:text-base"
            >
              {copy.ctaPrimary}
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>
            <button
              type="button"
              onClick={open}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-paper/30 px-7 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:w-auto md:px-9 md:py-4 md:text-base"
            >
              {copy.ctaSecondary}
              <Mail className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </BlurFade>
      </div>

      {/* the instrument: fringes that shift as the pointer or the page turns the table */}
      <BlurFade delay={0.5} className="relative z-[1] mt-14 w-full max-w-3xl md:mt-20">
        <PhaseStrip />
      </BlurFade>
    </section>
  );
}
