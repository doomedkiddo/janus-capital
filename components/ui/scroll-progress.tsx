"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/** Reading progress as two beams: they leave the two edges of the window, travel towards each other as the page is
 *  read and meet in the middle at its end, where a point lights up. */
export function ScrollProgress({ className }: { className?: string }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 40, restDelta: 0.0008 });
  const met = useTransform(progress, [0.97, 1], [0, 1]);

  return (
    <div aria-hidden className={cn("pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px]", className)}>
      <motion.div className="absolute inset-y-0 left-0 w-1/2 origin-left bg-gradient-to-r from-accent/30 to-accent" style={{ scaleX: progress }} />
      <motion.div className="absolute inset-y-0 right-0 w-1/2 origin-right bg-gradient-to-l from-accent/30 to-accent" style={{ scaleX: progress }} />
      <div className="absolute left-1/2 top-[1px] -translate-x-1/2 -translate-y-1/2">
        <motion.div
          className="h-[7px] w-[7px] bg-accent shadow-[0_0_14px_3px_rgb(var(--c-accent)/0.65)]"
          style={{ opacity: met, scale: met, rotate: 45 }}
        />
      </div>
    </div>
  );
}
