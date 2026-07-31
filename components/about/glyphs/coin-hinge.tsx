"use client";

import { GlyphFrame, GlyphPath, circlePath, draw, fade, linePath } from "./glyph-frame";

const ticks = Array.from({ length: 48 }, (_, index) => {
  const angle = (index / 48) * Math.PI * 2;
  const inner = 78;
  const outer = index % 4 === 0 ? 88 : 84;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  return `M${(100 + cos * inner).toFixed(2)} ${(100 + sin * inner).toFixed(2)} L${(100 + cos * outer).toFixed(2)} ${(100 + sin * outer).toFixed(2)}`;
}).join(" ");

const halfFace =
  "M100 62 C90 62 82 68 80 78 C79 83 81 85 80 88 C78 92 72 95 72 97 C72 99 77 100 78 103 C79 107 76 109 78 113 C80 118 88 121 94 122 L100 123";

export function CoinHinge({ className }: { className?: string }) {
  return (
    <GlyphFrame className={className}>
      <GlyphPath variants={draw} d={circlePath(100, 100, 72)} />
      <GlyphPath variants={draw} d={circlePath(100, 100, 63)} strokeOpacity="0.6" />
      <GlyphPath variants={fade} d={ticks} strokeOpacity="0.55" strokeWidth={1} />

      <GlyphPath variants={draw} d={halfFace} />
      <g transform="translate(200 0) scale(-1 1)">
        <GlyphPath variants={draw} d={halfFace} />
      </g>
      <GlyphPath variants={draw} d={linePath(100, 52, 100, 132)} strokeOpacity="0.6" />

      <GlyphPath variants={draw} d="M62 146 L138 146 L124 158 L76 158 Z" strokeOpacity="0.85" />
      <GlyphPath variants={draw} d="M138 146 L152 134" strokeOpacity="0.7" />
      <GlyphPath variants={fade} d={linePath(76, 152, 124, 152)} strokeOpacity="0.5" />
    </GlyphFrame>
  );
}
