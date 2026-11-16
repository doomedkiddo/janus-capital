"use client";

import { cn } from "@/lib/utils";
import { GlyphFrame, GlyphPath, arcPath, chevron, circlePath, draw, fade, linePath, polar } from "./glyph-frame";

const CLOCKWISE = "M60 140 V60 H140 V140 Z";
const COUNTER = "M66 134 H134 V66 H66 Z";

const rim = Array.from({ length: 36 }, (_, index) => {
  const deg = index * 10;
  const [x0, y0] = polar(100, 100, 85, deg);
  const [x1, y1] = polar(100, 100, index % 9 === 0 ? 91 : 88, deg);
  return `M${x0} ${y0} L${x1} ${y1}`;
}).join(" ");

const [omegaX, omegaY] = polar(100, 100, 12, 110);

export function SagnacLoop({ className }: { className?: string }) {
  return (
    <GlyphFrame className={className}>
      <GlyphPath variants={draw} d={circlePath(100, 100, 82)} strokeOpacity="0.4" />
      <GlyphPath variants={fade} d={rim} strokeOpacity="0.45" strokeWidth={1} />

      <GlyphPath variants={draw} d={CLOCKWISE} />
      <GlyphPath variants={fade} d={COUNTER} strokeDasharray="3 4" strokeOpacity="0.75" />
      <GlyphPath variants={fade} d={`${chevron(103, 60, 0)} ${chevron(97, 140, 180)}`} />
      <GlyphPath variants={fade} d={`${chevron(97, 66, 180, 4)} ${chevron(103, 134, 0, 4)}`} strokeOpacity="0.75" />

      <GlyphPath
        variants={draw}
        d="M51.05 60.95 L60.95 51.05 M139.05 51.05 L148.95 60.95 M139.05 148.95 L148.95 139.05"
        strokeWidth={2.6}
      />
      <GlyphPath variants={draw} d={linePath(55.05, 144.95, 64.95, 135.05)} strokeWidth={2} strokeOpacity="0.9" />

      <GlyphPath variants={draw} d={circlePath(32, 140, 3.2)} strokeOpacity="0.85" />
      <GlyphPath variants={draw} d={linePath(35.2, 140, 60, 140)} strokeOpacity="0.85" />
      <GlyphPath variants={draw} d="M60 140 L60 162 M53 162 L67 162 M53 162 A7 7 0 0 0 67 162" strokeOpacity="0.7" />

      <GlyphPath variants={draw} d={arcPath(100, 100, 12, 200, 470)} strokeOpacity="0.7" />
      <GlyphPath variants={fade} d={chevron(omegaX, omegaY, 200, 4)} strokeOpacity="0.7" />
      <GlyphPath variants={fade} d={circlePath(100, 100, 1.4)} fill="currentColor" stroke="none" />
    </GlyphFrame>
  );
}

export function LoopPulses({ className, duration = 6 }: { className?: string; duration?: number }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 200 200"
      className={cn("pointer-events-none h-full w-full motion-reduce:hidden", className)}
    >
      {[CLOCKWISE, COUNTER].map((path) => (
        <g key={path}>
          <circle r={6} fill="currentColor" fillOpacity={0.16} />
          <circle r={2.1} fill="currentColor" />
          <animateMotion dur={`${duration}s`} repeatCount="indefinite" path={path} />
        </g>
      ))}
    </svg>
  );
}
