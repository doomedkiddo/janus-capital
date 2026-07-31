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
    <section className="relative bg-gradient-to-b from-marble-100 via-marble-50 to-white px-5 pb-16 pt-8 md:pb-24 md:pt-12">
      <div className="mx-auto max-w-2xl text-center">
        <BlurFade>
          <div className="divider-bronze mb-10 md:mb-12" />
        </BlurFade>

        <BlurFade delay={0.06}>
          <h2 className="font-serif text-2xl text-navy-800 md:text-[2.25rem]">{copy.title}</h2>
        </BlurFade>

        <BlurFade delay={0.12}>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-600 md:text-base">
            {copy.desc}
          </p>
        </BlurFade>

        <BlurFade delay={0.2}>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row md:mt-10">
            <Link
              href="/#strategy"
              className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-navy-600 px-6 py-3.5 text-sm font-semibold text-white transition-all hover:bg-navy-700 hover:shadow-[0_14px_32px_-12px_rgba(46,76,127,0.7)] sm:w-auto md:px-8"
            >
              {copy.primary}
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
            <button
              type="button"
              onClick={contact.open}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-bronze-400/70 bg-white/70 px-6 py-3.5 font-serif text-sm text-bronze-700 backdrop-blur transition-all hover:border-bronze-500 hover:bg-white sm:w-auto md:px-8 md:text-base"
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
