"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

export function TracingBeam({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setHeight(el.offsetHeight));
    observer.observe(el);
    setHeight(el.offsetHeight);
    return () => observer.disconnect();
  }, []);

  const spring = { stiffness: 380, damping: 90 };
  const gradientTail = useSpring(useTransform(scrollYProgress, [0, 1], [0, height - 200]), spring);
  const gradientHead = useSpring(useTransform(scrollYProgress, [0, 0.9], [60, height]), spring);
  const dotY = useSpring(useTransform(scrollYProgress, [0, 0.9], [0, height - 40]), spring);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="pointer-events-none absolute left-6 top-0 hidden h-full lg:block xl:left-10">
        <motion.span
          className="absolute -left-[4.5px] z-10 block h-2.5 w-2.5 rounded-full border border-bronze-500/70 bg-bronze-50 shadow-[0_0_0_4px_rgba(176,141,87,0.14)]"
          style={{ top: dotY }}
        />
        <svg aria-hidden width="2" height={height} className="block">
          <line x1="1" y1="0" x2="1" y2={height} stroke="rgba(176,141,87,0.16)" strokeWidth="1.5" />
          <line x1="1" y1="0" x2="1" y2={height} stroke="url(#tracing-beam)" strokeWidth="1.5" />
          <defs>
            <motion.linearGradient
              id="tracing-beam"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={gradientTail}
              y2={gradientHead}
            >
              <stop stopColor="#B08D57" stopOpacity="0" />
              <stop offset="0.18" stopColor="#B08D57" />
              <stop offset="0.72" stopColor="#D6BC8A" />
              <stop offset="1" stopColor="#D6BC8A" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      {children}
    </div>
  );
}
