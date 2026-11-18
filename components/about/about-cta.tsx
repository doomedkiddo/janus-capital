"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { useContact } from "@/components/contact-modal";
import { useStageAnchor } from "@/components/stage/bus";
import { BlurFade } from "@/components/ui/blur-fade";
import { about } from "@/lib/i18n/about";
import { useLanguage } from "@/lib/i18n/language-context";

export function AboutCta() {
  const { lang } = useLanguage();
  const copy = about[lang].cta;
  const contact = useContact();
  const strip = useStageAnchor("strip");

  return (
    <section id="about-cta" className="relative pt-8 md:pt-12">
      <div className="mx-auto max-w-2xl px-5 text-center">
        <BlurFade>
          <div className="mb-10 h-px bg-paper/15 md:mb-12" />
        </BlurFade>

        <BlurFade delay={0.06}>
          <h2 className="display text-[2.2rem] text-paper md:text-[3.2rem]">{copy.title}</h2>
        </BlurFade>

        <BlurFade delay={0.12}>
          <p className="mx-auto mt-4 max-w-lg text-balance md:break-keep text-sm leading-relaxed text-paper/60 md:text-base">
            {copy.desc}
          </p>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-10">
            <Link
              href="/#strategy"
              className="btn-beam btn-beam--solid group w-full sm:w-auto"
            >
              {copy.primary}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              onClick={contact.open}
              className="btn-beam w-full sm:w-auto"
            >
              <Mail className="h-4 w-4" />
              {copy.secondary}
            </button>
          </div>
        </BlurFade>
      </div>
      {/* the same closing band as the homepage's */}
      <div ref={strip} data-stage-figure className="mt-16 h-[18svh] w-full md:mt-24 md:h-[22svh]" />
    </section>
  );
}
