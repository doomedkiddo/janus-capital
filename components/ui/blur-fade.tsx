"use client";

import { useRef } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type Direction = "up" | "down" | "left" | "right";

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 14 },
  down: { x: 0, y: -14 },
  left: { x: 14, y: 0 },
  right: { x: -14, y: 0 },
};

type BlurFadeProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: Direction;
  blur?: string;
  once?: boolean;
  as?: "div" | "span" | "li" | "p" | "section";
};

export function BlurFade({
  children,
  className,
  delay = 0,
  duration = 0.55,
  direction = "up",
  blur = "6px",
  once = true,
  as = "div",
}: BlurFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px" });
  const reduce = useReducedMotion();
  const offset = offsets[direction];

  const variants: Variants = {
    hidden: { opacity: 0, x: offset.x, y: offset.y, filter: `blur(${blur})` },
    visible: { opacity: 1, x: 0, y: 0, filter: "blur(0px)" },
  };

  const MotionTag = motion[as];

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <AnimatePresence>
      <MotionTag
        ref={ref as never}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={variants}
        transition={{ delay: 0.04 + delay, duration, ease: [0.22, 1, 0.36, 1] }}
        className={cn(className)}
      >
        {children}
      </MotionTag>
    </AnimatePresence>
  );
}
