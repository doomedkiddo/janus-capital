"use client";

import { BarChart3, Crown, Landmark, Layers, ShieldCheck, Zap } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { SectionHeading } from "@/components/sections/section-heading";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

const icons = [Crown, Landmark, BarChart3, ShieldCheck, Layers, Zap];

export function Team() {
  const { lang } = useLanguage();
  const copy = home[lang].team;

  return (
    <section id="team" className="scroll-mt-24 bg-slate-50 px-4 py-16 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title1={copy.title1}
          title2={copy.title2}
          subtitle={copy.subtitle}
          className="mb-12 md:mb-16"
        />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
          {copy.members.map((member, index) => {
            const Icon = icons[index] ?? ShieldCheck;
            return (
              <BlurFade key={member.name} delay={index * 0.06}>
                <SpotlightCard className="card group h-full rounded-2xl transition-transform duration-300 hover:-translate-y-1">
                  <Icon
                    aria-hidden
                    className="absolute right-5 top-5 h-14 w-14 text-slate-100 transition-colors duration-300 group-hover:text-navy-50 md:right-7 md:top-6 md:h-16 md:w-16"
                    strokeWidth={1.25}
                  />
                  <div className="relative flex items-center gap-4 p-5 md:gap-5 md:p-8">
                    <div className="relative shrink-0">
                      <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-navy-700 to-navy-500 ring-1 ring-bronze-400/40 transition-shadow duration-300 group-hover:ring-bronze-400/80 group-hover:shadow-[0_8px_20px_-8px_rgba(46,76,127,0.55)] md:h-16 md:w-16">
                        <span className="font-serif text-2xl text-white/95 md:text-[1.75rem]">
                          {member.name.charAt(0)}
                        </span>
                      </span>
                      <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-lg border border-bronze-200/70 bg-white shadow-sm md:h-7 md:w-7">
                        <Icon className="h-3 w-3 text-navy-600 md:h-3.5 md:w-3.5" />
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-display text-lg font-bold text-slate-900 sm:text-xl md:text-2xl">
                        {member.name}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-xs text-slate-500 sm:text-sm md:text-base">
                        {member.role}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}
