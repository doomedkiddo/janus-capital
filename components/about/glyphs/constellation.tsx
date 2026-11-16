"use client";

import { GlyphFrame, GlyphPath, arcPath, chevron, circlePath, draw, fade, polar } from "./glyph-frame";

const satellites = [-145, -90, -35].map((deg) => polar(100, 112, 80, deg));
const [rx, ry] = polar(100, 112, 34, -60);
const [mx, my] = polar(100, 112, 34, -50);
const [ax, ay] = polar(100, 112, 40, -49);

const bodies = satellites.map(([x, y]) => `M${x - 2.5} ${y - 2.5} h5 v5 h-5 Z M${x - 9} ${y} H${x - 3.5} M${x + 3.5} ${y} H${x + 9}`).join(" ");
const signals = satellites.map(([x, y]) => `M${x} ${y} L${rx} ${ry}`).join(" ");

export function Constellation({ className }: { className?: string }) {
  return (
    <GlyphFrame className={className}>
      <GlyphPath variants={fade} d={circlePath(100, 112, 80)} strokeDasharray="2 5" strokeOpacity="0.45" />
      <GlyphPath variants={draw} d={circlePath(100, 112, 34)} />
      <GlyphPath variants={draw} d="M66 112 A34 7 0 1 0 134 112 A34 7 0 1 0 66 112" strokeOpacity="0.45" />
      <GlyphPath variants={draw} d="M100 78 A13 34 0 1 0 100 146 A13 34 0 1 0 100 78" strokeOpacity="0.45" />
      <GlyphPath variants={draw} d="M100 70 V78 M100 146 V154" strokeOpacity="0.6" />
      <GlyphPath variants={fade} d={chevron(111.6, 118.6, -4, 4)} strokeOpacity="0.7" />

      <GlyphPath variants={draw} d={bodies} strokeWidth={1.3} />
      <GlyphPath variants={fade} d={signals} strokeDasharray="2 4" strokeOpacity="0.55" />

      <GlyphPath variants={draw} d={circlePath(rx, ry, 2.4)} />
      <GlyphPath variants={fade} d={circlePath(mx, my, 2)} fill="currentColor" stroke="none" />
      <GlyphPath variants={draw} d={arcPath(100, 112, 40, -61, -49)} strokeOpacity="0.8" />
      <GlyphPath variants={fade} d={chevron(ax, ay, 41, 3.2)} strokeOpacity="0.8" />
    </GlyphFrame>
  );
}
