"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { about } from "@/lib/i18n/about";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

export function NameStatement() {
  const { lang } = useLanguage();
  const copy = about[lang].name;

  return (
    <section className="relative overflow-hidden px-5 py-16 md:py-24 lg:py-28">
      <div className="relative mx-auto max-w-3xl text-center">
        <BlurFade>
          <div className="mb-10 flex items-center justify-center gap-3 md:mb-14">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent/60" />
            <span className="label text-accent">{copy.overline}</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent/60" />
          </div>
        </BlurFade>

        {copy.lines.map((line, index) => (
          <BlurFade key={index} delay={0.1 + index * 0.16}>
            <p
              className={cn(
                "display text-balance md:break-keep",
                index === 1
                  ? "my-6 text-xl text-accent md:my-8 md:text-[1.7rem]"
                  : "text-[1.75rem] !leading-[1.4] text-paper md:text-[2.6rem]",
              )}
            >
              {line}
            </p>
          </BlurFade>
        ))}
      </div>
    </section>
  );
}
