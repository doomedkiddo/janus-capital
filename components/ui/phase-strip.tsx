"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

const PERIOD = 16; // px: one bright and one dark fringe

const fringes = (color: string) =>
  `repeating-linear-gradient(90deg, ${color} 0 ${PERIOD / 2}px, transparent ${PERIOD / 2}px ${PERIOD}px)`;

/** The logo's picture laid out as an instrument: two rows of fringes, the lower half a period out of step with the
 *  upper. The lower row is live: moving the pointer across the window, or scrolling, turns the table, and the fringes
 *  slide by the phase read out beside them. A period of drift ends on the picture it started from. */
export function PhaseStrip({ className }: { className?: string }) {
  const reduce = useReducedMotion();
  const pointer = useMotionValue(0);
  const { scrollY } = useScroll();
  const turn = useTransform([pointer, scrollY], ([p, y]: number[]) => p + y / 480);
  const phase = useSpring(turn, { stiffness: 70, damping: 20, mass: 0.7 });
  const x = useTransform(phase, (v) => (((v % 1) + 1) % 1) * PERIOD);
  const readout = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (reduce || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: PointerEvent) => pointer.set(e.clientX / window.innerWidth - 0.5);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [pointer, reduce]);

  // the rows rest half a period apart: a phase difference of pi
  useMotionValueEvent(phase, "change", (v) => {
    if (readout.current) readout.current.textContent = `${((((v + 0.5) % 1) + 1) % 1 * 2).toFixed(2)}π`;
  });

  return (
    <div aria-hidden className={cn("flex flex-col items-center gap-3", className)}>
      <div className="w-full [mask-image:linear-gradient(90deg,transparent,#000_22%,#000_78%,transparent)]">
        <div className="h-5 text-paper/80 md:h-6" style={{ backgroundImage: fringes("currentColor"), backgroundPosition: "center top" }} />
        <div className="mt-1 h-5 overflow-hidden md:h-6">
          <motion.div
            className="h-full text-accent"
            style={{
              x: reduce ? 0 : x,
              width: `calc(100% + ${2 * PERIOD}px)`,
              marginLeft: -PERIOD,
              backgroundImage: fringes("currentColor"),
              backgroundPosition: `calc(50% + ${PERIOD / 2}px) top`,
            }}
          />
        </div>
      </div>
      <p className="font-mono text-[10px] tracking-[0.2em] text-paper/45 md:text-[11px]">
        Δφ = <span ref={readout} className="tabular-nums text-accent">1.00π</span>
      </p>
    </div>
  );
}
