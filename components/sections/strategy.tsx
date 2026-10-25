"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading } from "@/components/sections/section-heading";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

export function Strategy() {
  const { lang } = useLanguage();
  const copy = home[lang].strategy;
  const title = lang === "zh" ? `${copy.title1}${copy.title2}` : `${copy.title1} ${copy.title2}`;

  return (
    <section id="strategy" className="scroll-mt-16 bg-ink px-4 py-20 text-paper md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading tone="dark" overline={home[lang].nav.strategy} title={title} subtitle={copy.subtitle} />

        <div className="mt-12 grid gap-4 sm:grid-cols-2 md:mt-16 md:gap-5 lg:grid-cols-3">
          {copy.items.map((item, index) => (
            <BlurFade key={item.title} delay={index * 0.05} className="h-full">
              <article className="flex h-full min-h-[240px] flex-col rounded-[28px] bg-ink-2 p-7 transition-colors duration-300 hover:bg-ink-3 md:min-h-[280px] md:p-9">
                <span className="headline text-sm tracking-[0.2em] text-accent">{String(index + 1).padStart(2, "0")}</span>
                <h3 className="mt-auto headline text-2xl leading-snug md:text-[1.7rem]">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-paper/65 md:text-[15px]">{item.desc}</p>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
