"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  title1: string;
  title2: string;
  subtitle?: string;
  badge?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  title1,
  title2,
  subtitle,
  badge,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn("flex flex-col gap-4 md:gap-6", className)}>
      <BlurFade>
        <h2
          className={cn(
            "font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-5xl",
            centered ? "text-center" : "text-center md:text-left",
          )}
        >
          {title1}{" "}
          <span className="bg-gradient-to-r from-navy-600 to-blue-500 bg-clip-text text-transparent">
            {title2}
          </span>
        </h2>
      </BlurFade>

      {subtitle ? (
        <BlurFade delay={0.08}>
          <p
            className={cn(
              "max-w-2xl text-sm leading-relaxed text-slate-500 md:text-base",
              centered ? "mx-auto text-center" : "mx-auto text-center md:mx-0 md:text-left",
            )}
          >
            {subtitle}
          </p>
        </BlurFade>
      ) : null}

      {badge ? (
        <BlurFade delay={0.14}>
          <div
            className={cn(
              "w-fit rounded-xl border border-navy-100 bg-navy-50 px-4 py-2 text-[10px] font-semibold uppercase tracking-wider text-navy-700 md:px-6 md:py-3 md:text-xs",
              centered ? "mx-auto" : "mx-auto md:mx-0",
            )}
          >
            {badge}
          </div>
        </BlurFade>
      ) : null}
    </div>
  );
}
