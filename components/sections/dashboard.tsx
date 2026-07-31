"use client";

import Image from "next/image";
import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading } from "@/components/sections/section-heading";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

const images = ["/dashboard-01.jpg", "/dashboard-02.jpg", "/dashboard-03.jpg"];
/* dashboard-03 is a tall phone capture; aim the crop at its chart region. */
const crops = ["object-center", "object-center", "object-[center_18%]"];

export function Dashboard() {
  const { lang } = useLanguage();
  const copy = home[lang].dashboard;

  return (
    <section id="dashboard" className="scroll-mt-24 bg-slate-50 px-4 py-16 md:px-6 md:py-28">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          title1={copy.title1}
          title2={copy.title2}
          subtitle={copy.subtitle}
          badge={copy.badge}
          className="mb-8 md:mb-12"
        />

        <div className="scroll-touch -mx-4 flex snap-x snap-proximity gap-4 overflow-x-auto px-4 pb-4 md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:px-0 md:pb-0 lg:grid-cols-3">
          {images.map((src, index) => (
            <BlurFade key={src} delay={index * 0.08} className="shrink-0 snap-center md:shrink">
              <div className="card h-full w-[280px] rounded-2xl p-4 transition-transform duration-300 hover:-translate-y-1 sm:w-[320px] md:w-auto md:p-5">
                <div className="overflow-hidden rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2 border-b border-slate-200 bg-slate-100/80 px-3 py-2">
                    <span className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-slate-300" />
                      <span className="h-2 w-2 rounded-full bg-slate-300" />
                      <span className="h-2 w-2 rounded-full bg-slate-300" />
                    </span>
                    <span className="ml-1 truncate text-[10px] font-semibold uppercase tracking-wider text-slate-500 md:text-[11px]">
                      {copy.panels[index]}
                    </span>
                  </div>
                  <div className="aspect-[16/10] bg-slate-900">
                    <Image
                      src={src}
                      alt={copy.panels[index]}
                      width={640}
                      height={400}
                      className={`h-full w-full object-cover ${crops[index]}`}
                    />
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[10px] font-medium uppercase tracking-wider text-slate-400 md:mt-4 md:text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="h-1 w-1 rounded-full bg-emerald-500" />
                    Live
                  </span>
                  <span>Encrypted</span>
                </div>
              </div>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
