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
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(var(--c-accent)/0.07),transparent)] blur-2xl md:h-[38rem] md:w-[38rem]"
      />
      <div className="relative mx-auto max-w-3xl text-center">
        <BlurFade>
          <div className="mb-10 flex items-center justify-center gap-3 md:mb-14">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-accent/60" />
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">{copy.overline}</span>
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-accent/60" />
          </div>
        </BlurFade>

        {copy.lines.map((line, index) => (
          <BlurFade key={index} delay={0.1 + index * 0.16}>
            <p
              className={cn(
                "text-balance break-keep font-serif",
                index === 1
                  ? "my-6 text-lg italic text-accent md:my-8 md:text-2xl"
                  : "text-2xl leading-snug text-paper md:text-[2.15rem] md:leading-[1.45]",
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
