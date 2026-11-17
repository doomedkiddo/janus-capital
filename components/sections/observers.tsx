"use client";

import { motion, useReducedMotion } from "motion/react";
import { ChapterMark } from "@/components/ui/chapter-mark";
import { FringeDisc } from "@/components/ui/fringe-disc";
import { ShiftText } from "@/components/ui/shift-text";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

const COUNTS = [4, 6, 9]; // each observer's own fringe spacing

/** Observers. The people at the eyepiece. */
export function Observers() {
  const { lang } = useLanguage();
  const copy = home[lang].team;
  const reduce = useReducedMotion();
  const title = lang === "zh" ? `${copy.title1}${copy.title2}` : `${copy.title1} ${copy.title2}`;

  return (
    <section id="team" className="scroll-mt-16 pb-24 pt-24 md:pb-36 md:pt-36">
      <div className="mx-auto max-w-[1320px] px-5 md:px-10">
        <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <ChapterMark index={3} />
            <h2 className={cn("display mt-6 md:mt-8", lang === "zh" ? "text-[3.4rem] md:text-[6rem]" : "text-[2.6rem] uppercase md:text-[5.2rem]")}>
              <ShiftText className="!whitespace-normal">{title}</ShiftText>
            </h2>
          </div>
          <p className="max-w-md text-[15px] leading-relaxed text-paper/70 md:col-span-5 md:pb-3 md:text-base">{copy.subtitle}</p>
        </div>

        <div className="mt-14 grid border-t border-paper/15 md:mt-24 md:grid-cols-3">
          {copy.members.map((member, i) => (
            <motion.article
              key={member.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={reduce ? { duration: 0 } : { duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: i * 0.1 }}
              className={cn("group border-b border-paper/15 py-8 md:border-b-0 md:py-10 md:pr-10", i > 0 && "md:border-l md:pl-10")}
            >
              <div className="flex items-start justify-between">
                <span className="label text-paper/45">
                  <span className="text-accent">{String.fromCharCode(65 + i)}</span> / {String.fromCharCode(64 + copy.members.length)}
                </span>
                <FringeDisc count={COUNTS[i % COUNTS.length]} className="h-14 w-14 md:h-16 md:w-16" />
              </div>
              <h3 className="display mt-12 text-[2.6rem] md:mt-28 md:text-[3.4rem]">{member.name}</h3>
              <p className="mt-3 text-[14px] leading-relaxed text-paper/60 md:mt-4 md:text-[15px]">{member.role}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
