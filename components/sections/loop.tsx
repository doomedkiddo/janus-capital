"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { bus, useStageAnchor } from "@/components/stage/bus";
import { ChapterMark } from "@/components/ui/chapter-mark";
import { ShiftText } from "@/components/ui/shift-text";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

const two = (n: number) => String(n).padStart(2, "0");
const STEP_VH = 46; // scroll given to each strategy line while the loop is held

/** Loop. The mark opens into the ring it stands for. While the ring is held in the window the page's scroll walks
 *  the point where the two pulses meet from one node to the next, one node per strategy line. */
export function Loop() {
  const { lang } = useLanguage();
  const copy = home[lang].strategy;
  const items = copy.items;
  const n = items.length;
  const mark = useStageAnchor("mark");
  const ring = useStageAnchor("loop");
  const track = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: track, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);
  // what is lettered on the ring appears with the ring, as the figure arrives
  const { scrollYProgress: arriving } = useScroll({ target: track, offset: ["start end", "start start"] });
  const lettered = useTransform(arriving, [0.9, 1], [0, 1]);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    bus.node = i;
    setActive(i);
  });
  useEffect(() => () => void (bus.node = 0), []);

  const go = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((i + 0.5) / n) * (el.offsetHeight - window.innerHeight), behavior: reduce ? "auto" : "smooth" });
  };

  const title = lang === "zh" ? `${copy.title1}${copy.title2}` : `${copy.title1} ${copy.title2}`;
  const item = items[active];

  return (
    <section id="strategy" className="scroll-mt-16">
      {/* the mark stands above the place where the ring will be held, so the figure travels straight down into it */}
      <div className="mx-auto grid max-w-[1320px] items-center gap-y-12 px-5 pt-24 md:grid-cols-12 md:gap-x-10 md:px-10 md:pt-32">
        <div className="md:order-2 md:col-span-6 md:pl-6">
          <ChapterMark index={2} />
          <h2 className={cn("display mt-6 md:mt-8", lang === "zh" ? "text-[3.4rem] md:text-[6rem]" : "text-[2.6rem] uppercase md:text-[4.6rem]")}>
            <ShiftText className="!whitespace-normal">{title}</ShiftText>
          </h2>
          <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-paper/70 md:mt-9 md:text-[17px]">{copy.subtitle}</p>
        </div>
        <div className="md:order-1 md:col-span-6">
          <div ref={mark} className="mx-auto aspect-square w-[min(46vw,24svh)] md:w-[min(22vw,36svh)]" />
        </div>
      </div>

      <div ref={track} className="relative mt-10" style={{ height: `calc(100svh + ${n * STEP_VH}vh)` }}>
        <div className="sticky top-0 flex h-[100svh] items-center pt-16 md:pt-20">
          <div className="mx-auto grid w-full max-w-[1320px] items-center gap-y-12 px-5 md:grid-cols-12 md:gap-x-10 md:px-10">
            <div className="md:col-span-6">
              <motion.div ref={ring} style={{ opacity: lettered }} className="relative mx-auto aspect-square w-[min(60vw,34svh)] md:w-[min(33vw,54svh)]">
                {items.map((_, k) => {
                  const a = ((-90 + 60 * k) * Math.PI) / 180;
                  return (
                    <button
                      key={k}
                      type="button"
                      onClick={() => go(k)}
                      aria-label={items[k].title}
                      className={cn(
                        "absolute -translate-x-1/2 -translate-y-1/2 p-2 font-mono text-[11px] tabular-nums transition-colors duration-500",
                        k === active ? "text-accent" : "text-paper/40 hover:text-paper",
                      )}
                      style={{
                        left: `calc(50% + ${(Math.cos(a) * 50).toFixed(3)}% + ${(Math.cos(a) * 34).toFixed(1)}px)`,
                        top: `calc(50% + ${(Math.sin(a) * 50).toFixed(3)}% + ${(Math.sin(a) * 34).toFixed(1)}px)`,
                      }}
                    >
                      {two(k + 1)}
                    </button>
                  );
                })}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="label text-paper/45">{home[lang].loop.line}</span>
                  <span className="display mt-3 text-[min(20vw,12svh)] tabular-nums !leading-none md:mt-4 md:text-[min(11vw,19svh)]">
                    <ShiftText key={active} inView={false} amp={0.12}>
                      {two(active + 1)}
                    </ShiftText>
                  </span>
                  <span className="label mt-3 text-paper/45 md:mt-4">/ {two(n)}</span>
                </div>
              </motion.div>
            </div>

            <div className="md:col-span-6 md:pl-6">
              <div className="min-h-[11.5rem] md:min-h-[15rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={active}
                    initial={reduce ? false : { opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <h3 className="display text-[1.9rem] !leading-[1.14] md:text-[3rem]">{item.title}</h3>
                    <p className="mt-4 max-w-lg text-[14px] leading-relaxed text-paper/70 md:mt-6 md:text-[16px]">{item.desc}</p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <ol className="mt-8 hidden border-t border-paper/15 md:block">
                {items.map((it, i) => (
                  <li key={it.title}>
                    <button
                      type="button"
                      onClick={() => go(i)}
                      className={cn(
                        "flex w-full items-center gap-4 border-b border-paper/10 py-3 text-left text-[13px] transition-colors duration-300",
                        i === active ? "text-paper" : "text-paper/40 hover:text-paper/80",
                      )}
                    >
                      <span className="font-mono text-[10.5px] tabular-nums text-accent">{two(i + 1)}</span>
                      {it.title}
                      <span className={cn("ml-auto h-px bg-accent transition-all duration-500", i === active ? "w-12" : "w-0")} />
                    </button>
                  </li>
                ))}
              </ol>
              <p className="mt-6 hidden max-w-md text-[12px] leading-relaxed text-paper/40 md:block">{home[lang].loop.hint}</p>

              <div className="mt-6 flex gap-1.5 md:hidden">
                {items.map((it, i) => (
                  <span key={it.title} className={cn("h-px flex-1 transition-colors duration-500", i === active ? "bg-accent" : "bg-paper/20")} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
