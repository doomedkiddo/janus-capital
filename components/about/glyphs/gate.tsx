"use client";

import { GlyphFrame, GlyphPath, draw, fade, linePath } from "./glyph-frame";

export function Gate({ className }: { className?: string }) {
  return (
    <GlyphFrame className={className}>
      <GlyphPath variants={draw} d="M44 100 A56 56 0 0 1 156 100" strokeOpacity="0.68" />
      <GlyphPath variants={draw} d="M54 100 A46 46 0 0 1 146 100" />
      <GlyphPath variants={draw} d="M94 46 L106 46 L109 60 L91 60 Z" strokeOpacity="0.8" />

      <GlyphPath variants={draw} d={linePath(54, 100, 54, 172)} />
      <GlyphPath variants={draw} d={linePath(146, 100, 146, 172)} />
      <GlyphPath variants={draw} d={linePath(44, 100, 44, 172)} strokeOpacity="0.68" />
      <GlyphPath variants={draw} d={linePath(156, 100, 156, 172)} strokeOpacity="0.68" />

      <GlyphPath variants={draw} d="M66 172 L66 112 L100 112 L100 172" strokeOpacity="0.9" />
      <GlyphPath variants={draw} d="M100 172 L100 112 L133 103 L133 165 Z" strokeOpacity="0.72" />
      <GlyphPath
        variants={fade}
        d="M100 116 C112 116 122 120 130 126"
        strokeDasharray="2 5"
        strokeOpacity="0.6"
      />

      <GlyphPath variants={draw} d={linePath(30, 172, 170, 172)} />
      <GlyphPath variants={draw} d={linePath(22, 180, 178, 180)} strokeOpacity="0.68" />
    </GlyphFrame>
  );
}
