"use client";

import { BlurFade } from "@/components/ui/blur-fade";
import { SectionHeading } from "@/components/sections/section-heading";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

export function Team() {
  const { lang } = useLanguage();
  const copy = home[lang].team;
  const title = lang === "zh" ? `${copy.title1}${copy.title2}` : `${copy.title1} ${copy.title2}`;

  return (
    <section id="team" className="scroll-mt-16 bg-ivory-100 px-4 py-20 md:px-6 md:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeading overline={home[lang].nav.team} title={title} subtitle={copy.subtitle} />

        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-3 md:gap-5">
          {copy.members.map((member, index) => (
            <BlurFade key={member.name} delay={index * 0.06} className="h-full">
              <article className="flex h-full flex-col rounded-[28px] bg-ivory-50 p-7 ring-1 ring-ivory-200 transition-transform duration-300 hover:-translate-y-1 md:p-9">
                <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-pine-900 font-serif text-3xl text-ivory-100 md:h-20 md:w-20 md:text-4xl">
                  {member.name.charAt(0)}
                </span>
                <h3 className="mt-8 font-serif text-2xl text-pine-900 md:mt-10 md:text-3xl">{member.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-pine-900/65 md:text-base">{member.role}</p>
              </article>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}
