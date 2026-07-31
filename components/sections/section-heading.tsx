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
      {badge ? (
        <BlurFade>
          <div
            className={cn(
              "flex items-center gap-3",
              centered ? "justify-center" : "justify-center md:justify-start",
            )}
          >
            <span className="h-px w-8 bg-navy-300/80" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-navy-600 md:text-[11px]">
              {badge}
            </span>
          </div>
        </BlurFade>
      ) : null}

      <BlurFade delay={badge ? 0.06 : 0}>
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
        <BlurFade delay={0.12}>
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
    </div>
  );
}
