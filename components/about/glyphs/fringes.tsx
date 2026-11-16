"use client";

import { GlyphFrame, GlyphPath, arcPath, chevron, circlePath, draw, fade, linePath, polar } from "./glyph-frame";

const R = 64;
const SHIFT = 5;
const ks = [-3, -2, -1, 0, 1, 2, 3];
const edge = (x: number) => +Math.sqrt(R * R - (x - 100) ** 2).toFixed(1);
const weight = (k: number) => ({
  strokeWidth: k === 0 ? 2.4 : 1.5,
  strokeOpacity: [1, 0.85, 0.65, 0.45][Math.abs(k)],
});

const [cwX, cwY] = polar(166, 34, 8, 110);
const [ccwX, ccwY] = polar(34, 166, 8, 70);

export function Fringes({ className }: { className?: string }) {
  return (
    <GlyphFrame className={className}>
      <GlyphPath variants={draw} d={circlePath(100, 100, 71)} strokeOpacity="0.45" />
      <GlyphPath variants={draw} d={circlePath(100, 100, R)} />
      <GlyphPath variants={draw} d={linePath(36, 100, 164, 100)} strokeOpacity="0.45" />

      {ks.map((k) => {
        const x = 100 + 16 * k - SHIFT;
        return <GlyphPath key={`u${k}`} variants={fade} d={linePath(x, 102 - edge(x), x, 96)} {...weight(k)} />;
      })}
      {ks.map((k) => {
        const x = 100 + 16 * k + SHIFT;
        return <GlyphPath key={`l${k}`} variants={fade} d={linePath(x, 104, x, 98 + edge(x))} {...weight(k)} />;
      })}

      <GlyphPath variants={fade} d={linePath(100, 22, 100, 178)} strokeDasharray="2 4" strokeOpacity="0.6" />

      <GlyphPath variants={draw} d={arcPath(166, 34, 8, 200, 470)} strokeOpacity="0.75" />
      <GlyphPath variants={fade} d={chevron(cwX, cwY, 200, 3.5)} strokeOpacity="0.75" />
      <GlyphPath variants={draw} d={arcPath(34, 166, 8, 340, 70)} strokeOpacity="0.75" />
      <GlyphPath variants={fade} d={chevron(ccwX, ccwY, -20, 3.5)} strokeOpacity="0.75" />
    </GlyphFrame>
  );
}
