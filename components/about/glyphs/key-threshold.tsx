"use client";

import { GlyphFrame, GlyphPath, circlePath, draw, fade, linePath } from "./glyph-frame";

export function KeyThreshold({ className }: { className?: string }) {
  return (
    <GlyphFrame className={className}>
      <GlyphPath variants={draw} d={circlePath(66, 60, 24)} />
      <GlyphPath variants={draw} d={circlePath(66, 60, 11)} strokeOpacity="0.65" />
      <GlyphPath variants={draw} d="M83 77 L138 132" />
      <GlyphPath variants={draw} d="M138 132 L151 119" strokeOpacity="0.85" />
      <GlyphPath variants={draw} d="M124 118 L137 105" strokeOpacity="0.85" />
      <GlyphPath variants={draw} d="M110 104 L121 93" strokeOpacity="0.7" />

      <GlyphPath variants={draw} d={linePath(26, 154, 174, 154)} />
      <GlyphPath variants={draw} d={linePath(34, 166, 166, 166)} strokeOpacity="0.68" />
      <GlyphPath
        variants={fade}
        d={linePath(100, 154, 100, 180)}
        strokeDasharray="4 5"
        strokeOpacity="0.6"
      />
    </GlyphFrame>
  );
}
