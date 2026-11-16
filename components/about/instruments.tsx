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
    <section className="relative px-5 py-14 md:py-20 lg:py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <BlurFade>
            <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent/85">{copy.overline}</p>
          </BlurFade>
          <BlurFade delay={0.06}>
            <h2 className="mt-4 text-balance break-keep font-serif text-[2rem] leading-tight text-paper md:mt-5 md:text-[2.85rem]">
              {copy.title}
            </h2>
          </BlurFade>
        </div>

        <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-8 lg:gap-12">
          {copy.items.map((item, index) => {
            const Glyph = glyphs[index];
            return (
              <BlurFade key={item.label} delay={0.18 + index * 0.1}>
                <article className="flex h-full flex-col border-t border-paper/10 pt-7">
                  <div className="w-32 md:w-36">
                    <Glyph className="text-accent/80" />
                  </div>
                  <p className="mt-6 font-mono text-[10px] uppercase tracking-[0.2em] text-accent/75">{item.label}</p>
                  <h3 className="mt-2 font-serif text-xl text-paper md:text-[1.6rem]">{item.title}</h3>
                  <p className="mt-3 text-[14px] leading-[1.9] text-paper/60 md:text-[15px]">{item.desc}</p>
                  <code className="mt-auto block pt-6 font-mono text-[11px] text-accent/60">{item.code}</code>
                </article>
              </BlurFade>
            );
          })}
        </div>

        <BlurFade delay={0.4}>
          <p className="mt-14 text-balance text-center font-serif text-lg italic leading-relaxed text-paper/85 md:mt-20 md:text-[1.6rem]">
            {copy.closing}
          </p>
        </BlurFade>
      </div>
    </section>
  );
}
