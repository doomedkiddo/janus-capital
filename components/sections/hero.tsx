"use client";

import { ArrowDown, ArrowUpRight, Mail } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { useContact } from "@/components/contact-modal";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

export function Hero() {
  const { lang } = useLanguage();
  const copy = home[lang].hero;
  const { open } = useContact();

  return (
    <section className="flex min-h-[72vh] flex-col items-center justify-center bg-ink px-4 pb-20 pt-20 text-center text-paper md:min-h-[82vh] md:px-6 md:pb-28 md:pt-28">
      <div className="w-full max-w-5xl">
        <BlurFade delay={0.05}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent md:text-xs">{copy.tagline}</p>
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
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 sm:w-auto md:px-9 md:py-4 md:text-base"
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

      <a
        href="#performance"
        className="mt-16 hidden items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-paper/40 transition-colors hover:text-accent md:inline-flex"
      >
        {copy.scroll}
        <ArrowUpRight className="h-3.5 w-3.5 rotate-[135deg]" />
      </a>
    </section>
  );
}
