"use client";

import { Fringes } from "@/components/about/glyphs/fringes";
import { LightCone } from "@/components/about/glyphs/light-cone";
import { SignFork } from "@/components/about/glyphs/sign-fork";
import { BlurFade } from "@/components/ui/blur-fade";
import { about } from "@/lib/i18n/about";
import { useLanguage } from "@/lib/i18n/language-context";

const glyphs = [Fringes, LightCone, SignFork];

export function Instruments() {
  const { lang } = useLanguage();
  const copy = about[lang].instruments;

  return (
    <section className="relative px-5 py-14 md:px-10 md:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <BlurFade>
            <p className="label text-accent">{copy.overline}</p>
          </BlurFade>
          <BlurFade delay={0.06}>
            <h2 className="display mt-5 text-balance md:break-keep text-[2.3rem] text-paper md:mt-6 md:text-[3.4rem]">
              {copy.title}
            </h2>
          </BlurFade>
        </div>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {copy.items.map((item, index) => {
            const Glyph = glyphs[index];
            return (
              <BlurFade key={item.label} delay={0.18 + index * 0.1}>
                <article className="flex h-full flex-col border-t border-paper/15 pt-7">
                  <div className="w-32 md:w-36">
                    <Glyph className="text-accent/80" />
                  </div>
                  <p className="label mt-6 text-accent/85">{item.label}</p>
                  <h3 className="display mt-3 text-[1.5rem] text-paper md:text-[1.8rem]">{item.title}</h3>
                  <p className="mt-3 text-[13px] leading-[1.9] text-paper/60 md:text-[14px]">{item.desc}</p>
                  <code className="mt-auto block pt-6 font-mono text-[11px] text-accent/60">{item.code}</code>
                </article>
              </BlurFade>
            );
          })}
        </div>

        <BlurFade delay={0.4}>
          <p className="display mt-14 text-balance text-center text-[1.4rem] !leading-relaxed text-paper/85 md:mt-20 md:text-[2rem]">
            {copy.closing}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
