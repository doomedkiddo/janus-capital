"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  overline?: string;
  title: string;
  subtitle?: string;
  tone?: "light" | "dark";
  className?: string;
};

/** Section header in the Optiver manner: a small overline, a large serif title, one line of prose; left-aligned. */
export function SectionHeading({ overline, title, subtitle, tone = "light", className }: SectionHeadingProps) {
  const dark = tone === "dark";
  return (
    <div className={cn("flex flex-col gap-5 md:gap-6", className)}>
      {overline ? (
        <BlurFade>
          <p className={cn("text-[11px] font-semibold uppercase tracking-[0.28em] md:text-xs", dark ? "text-accent" : "text-accent-2")}>
            {overline}
          </p>
        </BlurFade>
      ) : null}
      <BlurFade delay={overline ? 0.06 : 0}>
        <h2 className={cn("headline text-4xl leading-[1.05] sm:text-5xl md:text-7xl", dark ? "text-paper" : "text-ink")}>
          {title}
        </h2>
      </BlurFade>
      {subtitle ? (
        <BlurFade delay={0.12}>
          <p className={cn("max-w-2xl text-base leading-relaxed md:text-lg", dark ? "text-paper/70" : "text-ink/65")}>{subtitle}</p>
        </BlurFade>
      ) : null}
    </div>
  );
}
