"use client";

import { useRef } from "react";
import { useMotionValueEvent } from "motion/react";
import { bus } from "@/components/stage/bus";
import { cn } from "@/lib/utils";

/** Phase between the two rows of fringes, as the stage is drawing it now. The mark rests at pi. */
export function PhaseReadout({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(bus.phase, "change", (v) => {
    if (ref.current) ref.current.textContent = `${(v * 2).toFixed(2)}π`;
  });
  return (
    <span className={cn("tabular-nums", className)}>
      Δφ = <span ref={ref}>1.00π</span>
    </span>
  );
}

const EARTH = "Ω⊕ = 7.2921 × 10⁻⁵ rad/s";

/** The rotation the page feels. At rest that is the Earth's own (what Michelson and Gale read off their fringes in
 *  1925); while the page is scrolled it is the reader's. */
export function OmegaReadout({ className }: { className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useMotionValueEvent(bus.omega, "change", (v) => {
    if (!ref.current) return;
    ref.current.textContent = Math.abs(v) < 0.004 ? EARTH : `Ω = ${v > 0 ? "+" : "−"}${Math.abs(v * 3.2).toFixed(3)} rad/s`;
  });
  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {EARTH}
    </span>
  );
}
