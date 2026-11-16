"use client";

import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { useContact } from "@/components/contact-modal";
import { BlurFade } from "@/components/ui/blur-fade";
import { about } from "@/lib/i18n/about";
import { useLanguage } from "@/lib/i18n/language-context";

export function AboutCta() {
  const { lang } = useLanguage();
  const copy = about[lang].cta;
  const contact = useContact();

  return (
    <section className="relative bg-ink px-5 pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="mx-auto max-w-2xl text-center">
        <BlurFade>
          <div className="divider-accent mb-10 md:mb-12" />
        </BlurFade>

        <BlurFade delay={0.06}>
          <h2 className="font-serif text-2xl text-paper md:text-[2.25rem]">{copy.title}</h2>
        </BlurFade>

        <BlurFade delay={0.12}>
          <p className="mx-auto mt-4 max-w-lg text-balance break-keep text-sm leading-relaxed text-paper/60 md:text-base">
            {copy.desc}
          </p>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-10">
            <Link
              href="/#strategy"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-paper px-6 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-paper/85 sm:w-auto md:px-8"
            >
              {copy.primary}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              onClick={contact.open}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-paper/30 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:border-paper/70 sm:w-auto md:px-8"
            >
              <Mail className="h-4 w-4" />
              {copy.secondary}
            </button>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
