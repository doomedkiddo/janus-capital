"use client";

import { motion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

const spans = ["sm:col-span-2", "", "", "sm:col-span-2", "", "sm:col-span-2"];
const fills = [0.82, 0.68, 0.74, 0.9, 0.71, 0.86];

export function Overview() {
  const { lang } = useLanguage();
  const copy = home[lang].overview;

  return (
    <section id="overview" className="scroll-mt-24 px-4 py-16 md:px-6 md:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title1={copy.title1}
          title2={copy.title2}
          subtitle={copy.subtitle}
          badge={copy.badge}
          className="mb-8 md:mb-12"
        />

        <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {copy.items.map((item, index) => {
            const wide = spans[index] !== "";
            return (
              <BlurFade key={item.title} delay={index * 0.06} className={spans[index]}>
                <SpotlightCard className="card h-full rounded-2xl">
                  <div className="space-y-3 p-4 md:space-y-4 md:p-6">
                    <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
                      <h3 className="font-display text-base font-semibold text-slate-900 md:text-lg">
                        {item.title}
                      </h3>
                      <span className="text-[9px] font-semibold uppercase tracking-[0.06em] text-navy-600 md:text-[10px]">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500 md:text-sm">{item.desc}</p>
                    <div className="h-[4px] overflow-hidden rounded-full bg-slate-100 md:h-[6px]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${fills[index] * 100}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 1.1, delay: 0.15 + index * 0.06, ease: [0.22, 1, 0.36, 1] }}
                        className={cn(
                          "h-full rounded-full bg-gradient-to-r from-navy-500 to-blue-400",
                        )}
                      />
                    </div>
                  </div>
                  {wide && <BorderBeam duration={11} delay={index * 2.5} size={72} />}
                </SpotlightCard>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
