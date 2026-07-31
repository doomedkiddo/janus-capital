"use client";

import { Cpu, Database, FlaskConical, ShieldCheck, Sparkles, Waves } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { BorderBeam } from "@/components/ui/border-beam";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

const spans = ["sm:col-span-2", "", "", "sm:col-span-2", "", "sm:col-span-2"];
const icons = [Cpu, FlaskConical, ShieldCheck, Database, Waves, Sparkles];

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
            const Icon = icons[index] ?? Cpu;
            return (
              <BlurFade key={item.title} delay={index * 0.06} className={spans[index]}>
                <SpotlightCard className="card h-full rounded-2xl">
                  <div className="space-y-3 p-4 md:p-6">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-navy-100 bg-navy-50 text-navy-600 md:h-10 md:w-10">
                          <Icon className="h-4 w-4 md:h-[18px] md:w-[18px]" />
                        </span>
                        <h3 className="font-display text-base font-semibold text-slate-900 md:text-lg">
                          {item.title}
                        </h3>
                      </div>
                      <span className="mt-0.5 shrink-0 rounded-full border border-navy-100 bg-white px-2 py-0.5 text-[9px] font-semibold uppercase tracking-[0.06em] text-navy-600 md:px-2.5 md:text-[10px]">
                        {item.tag}
                      </span>
                    </div>
                    <p className="text-xs leading-relaxed text-slate-500 md:text-sm">{item.desc}</p>
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
