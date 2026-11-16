"use client";

import { GlyphFrame, GlyphPath, chevron, circlePath, draw, fade, linePath } from "./glyph-frame";

export function SignFork({ className }: { className?: string }) {
  return (
    <GlyphFrame className={className}>
      <GlyphPath variants={fade} d={linePath(104, 28, 104, 172)} strokeDasharray="2 4" strokeOpacity="0.45" />
      <GlyphPath variants={fade} d="M104 100 L184 54 L184 146 Z" fill="currentColor" fillOpacity="0.05" stroke="none" />
      <GlyphPath variants={fade} d="M104 100 L184 54 M104 100 L184 146" strokeDasharray="3 4" strokeOpacity="0.55" />
      <GlyphPath variants={draw} d="M18 128 L28 121 L36 129 L46 115 L56 121 L66 107 L76 113 L86 103 L95 109 L104 100" />
      <GlyphPath variants={draw} d={linePath(104, 100, 172, 71)} />
      <GlyphPath variants={fade} d={chevron(172, 71, -23, 5)} />
      <GlyphPath variants={fade} d={circlePath(104, 100, 2.4)} fill="currentColor" stroke="none" />
    </GlyphFrame>
  );
}
