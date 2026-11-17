"use client";

import { motion, useReducedMotion, useTransform } from "motion/react";
import { bus } from "@/components/stage/bus";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type ShiftTextProps = {
  children: React.ReactNode;
  /** what a screen reader hears; defaults to the children when they are a string */
  label?: string;
  className?: string;
  /** seconds before the two halves come together */
  delay?: number;
  /** how far the lower half slides at full rotation, in em */
  amp?: number;
  /** reveal when scrolled into view (default) or at once */
  inView?: boolean;
};

/** A line of type cut along its middle, the way the mark is: the two halves arrive from opposite sides and lock, and
 *  afterwards the lower half slips whenever the page turns (bus.omega), coming back to rest when it stops. */
export function ShiftText({ children, label, className, delay = 0, amp = 0.16, inView = true }: ShiftTextProps) {
  const reduce = useReducedMotion();
  const slip = useTransform(bus.omega, (v) => `${(v * amp).toFixed(4)}em`);
  const spoken = label ?? (typeof children === "string" ? children : undefined);
  // the same start state on the server and the client whatever the motion setting (no hydration mismatch): reduced
  // motion only takes the time out of it
  const enter = (from: string) => ({
    initial: { x: from, opacity: 0 },
    ...(inView ? { whileInView: { x: "0em", opacity: 1 }, viewport: { once: true, margin: "-8% 0px" } } : { animate: { x: "0em", opacity: 1 } }),
    transition: reduce ? { duration: 0 } : { duration: 1.1, ease: EASE, delay },
  });

  return (
    <span className={cn("relative inline-block whitespace-nowrap", className)}>
      {spoken && <span className="sr-only">{spoken}</span>}
      <motion.span aria-hidden className="block [clip-path:inset(-0.3em_-1em_calc(50%-0.5px)_-1em)]" {...enter("-0.5em")}>
        {children}
      </motion.span>
      <motion.span aria-hidden className="absolute inset-0 block [clip-path:inset(50%_-1em_-0.3em_-1em)]" {...enter("0.5em")}>
        <motion.span className="block" style={{ x: slip }}>
          {children}
        </motion.span>
      </motion.span>
    </span>
  );
}
