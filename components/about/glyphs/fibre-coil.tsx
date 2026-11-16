"use client";

import { GlyphFrame, GlyphPath, circlePath, draw, fade, linePath, polar } from "./glyph-frame";

const CX = 100;
const CY = 96;
const R0 = 14;
const R1 = 72;
const TURNS = 6;
const B = (R1 - R0) / (TURNS * 2 * Math.PI);
const STEP = Math.PI / 4;

const at = (t: number) => {
  const r = R0 + B * t;
  const a = Math.PI / 2 + t;
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  return { x: CX + r * cos, y: CY + r * sin, dx: B * cos - r * sin, dy: B * sin + r * cos };
};

const n = (v: number) => v.toFixed(1);

const spiral = (() => {
  let p = at(0);
  let d = `M${n(p.x)} ${n(p.y)}`;
  for (let step = 1; step <= (TURNS * 2 * Math.PI) / STEP + 1e-9; step++) {
    const q = at(step * STEP);
    const k = STEP / 3;
    d += ` C${n(p.x + k * p.dx)} ${n(p.y + k * p.dy)} ${n(q.x - k * q.dx)} ${n(q.y - k * q.dy)} ${n(q.x)} ${n(q.y)}`;
    p = q;
  }
  return d;
})();

const [rulerX, rulerY] = polar(CX, CY, 86, -45);

export function FibreCoil({ className }: { className?: string }) {
  return (
    <GlyphFrame className={className}>
      <GlyphPath variants={fade} d={circlePath(CX, CY, R1 + 3)} fill="currentColor" fillOpacity="0.05" stroke="none" />
      <GlyphPath variants={draw} d={spiral} strokeWidth={1.4} />
      <GlyphPath variants={fade} d={circlePath(CX, CY + R0, 1.8)} fill="currentColor" stroke="none" />
      <GlyphPath variants={fade} d={linePath(CX, CY, rulerX, rulerY)} strokeDasharray="2 4" strokeOpacity="0.55" />
      <GlyphPath variants={fade} d={circlePath(CX, CY, 1.4)} fill="currentColor" stroke="none" />
      <GlyphPath variants={draw} d={`M${CX} ${CY + R1} C${CX} ${CY + R1 + 10} 106 183 116 183 L150 183`} strokeOpacity="0.85" />
      <GlyphPath variants={draw} d={circlePath(153.5, 183, 3)} strokeOpacity="0.85" />
    </GlyphFrame>
  );
}
