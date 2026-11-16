"use client";

import { GlyphFrame, GlyphPath, arcPath, chevron, circlePath, draw, fade, polar } from "./glyph-frame";

const boxes = [
  [24, 59],
  [176, 59],
  [176, 141],
  [24, 141],
  [150, 59],
  [150, 141],
]
  .map(([x, y]) => `M${x - 4} ${y - 4} h8 v8 h-8 Z`)
  .join(" ");

const [omegaX, omegaY] = polar(100, 100, 11, 110);

export function SurveyLoop({ className }: { className?: string }) {
  return (
    <GlyphFrame className={className}>
      <GlyphPath variants={draw} d="M22 57 H178 V143 H22 Z" />
      <GlyphPath variants={draw} d="M26 61 H174 V139 H26 Z" strokeOpacity="0.55" />
      <GlyphPath variants={draw} d="M148 61 V139 M152 61 V139" strokeOpacity="0.8" />
      <GlyphPath variants={draw} d={boxes} fill="currentColor" fillOpacity="0.15" />
      <GlyphPath variants={fade} d={`${chevron(94, 59, 180, 3.2)} ${chevron(106, 59, 0, 3.2)}`} strokeWidth={1.2} />

      <GlyphPath variants={draw} d={arcPath(100, 100, 11, 200, 470)} strokeOpacity="0.7" />
      <GlyphPath variants={fade} d={chevron(omegaX, omegaY, 200, 3.6)} strokeOpacity="0.7" />
      <GlyphPath variants={fade} d={circlePath(100, 100, 1.4)} fill="currentColor" stroke="none" />

      <GlyphPath variants={draw} d="M22 162 H82 M22 158 V166 M52 159.5 V164.5 M82 158 V166" strokeOpacity="0.6" strokeWidth={1.2} />
      <GlyphPath variants={fade} d={`M170 46 V22 ${chevron(170, 22, 270, 4.5)}`} strokeOpacity="0.6" />
    </GlyphFrame>
  );
}
