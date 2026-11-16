"use client";

import { GlyphFrame, GlyphPath, chevron, circlePath, draw, fade, linePath } from "./glyph-frame";

export function LightCone({ className }: { className?: string }) {
  return (
    <GlyphFrame className={className}>
      <GlyphPath variants={draw} d={linePath(100, 176, 100, 26)} strokeOpacity="0.45" />
      <GlyphPath variants={fade} d={chevron(100, 24, 270, 4)} strokeOpacity="0.6" />
      <GlyphPath variants={draw} d={linePath(24, 100, 174, 100)} strokeOpacity="0.45" />
      <GlyphPath variants={fade} d={chevron(176, 100, 0, 4)} strokeOpacity="0.6" />

      <GlyphPath variants={draw} d={linePath(46, 46, 154, 154)} />
      <GlyphPath variants={draw} d={linePath(154, 46, 46, 154)} />
      <GlyphPath variants={draw} d="M46 46 A54 10 0 1 0 154 46 A54 10 0 1 0 46 46" />
      <GlyphPath variants={draw} d="M46 154 A54 10 0 0 0 154 154" />
      <GlyphPath variants={fade} d="M46 154 A54 10 0 0 1 154 154" strokeDasharray="3 4" strokeOpacity="0.55" />

      <GlyphPath variants={draw} d="M94 154 C97 136 103 120 100 100 C97 80 103 62 108 46" strokeOpacity="0.9" />
      <GlyphPath variants={fade} d={circlePath(100, 100, 2.4)} fill="currentColor" stroke="none" />
    </GlyphFrame>
  );
}
