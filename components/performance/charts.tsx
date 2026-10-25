"use client";

import { useEffect, useRef, useState } from "react";
import { utc } from "@/lib/performance";
import { useChartPalette } from "@/lib/theme-context";

export { useChartPalette } from "@/lib/theme-context";

export function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [w, setW] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setW(Math.floor(e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w] as const;
}

export type Scale = { x: (t: number) => number; y: (v: number) => number; w: number; h: number };

/** Nice tick values covering [lo, hi]. */
export function ticks(lo: number, hi: number, n = 4) {
  const raw = (hi - lo) / n;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
  const out: number[] = [];
  for (let v = Math.ceil(lo / step) * step; v <= hi + 1e-9; v += step) out.push(+v.toFixed(10));
  return out;
}

export function linePath(pts: [number, number][]) {
  let d = "";
  for (let i = 0; i < pts.length; i++) d += `${i ? "L" : "M"}${pts[i][0].toFixed(1)},${pts[i][1].toFixed(1)}`;
  return d;
}

export function areaPath(pts: [number, number][], base: number) {
  if (!pts.length) return "";
  return `${linePath(pts)}L${pts[pts.length - 1][0].toFixed(1)},${base}L${pts[0][0].toFixed(1)},${base}Z`;
}

type FrameProps = {
  t0: number;
  t1: number;
  lo: number;
  hi: number;
  height: number;
  yTicks: number[];
  yFormat: (v: number) => string;
  xLabels?: boolean;
  dayStep?: number;
  hoverT?: number | null;
  onHover?: (t: number | null) => void;
  children: (s: Scale) => React.ReactNode;
  className?: string;
  ariaLabel: string;
};

const PAD_R = 46;

/** Time-series frame: day grid, right-hand y axis, optional day labels and a shared hover line. */
export function Frame({ t0, t1, lo, hi, height, yTicks, yFormat, xLabels = true, dayStep = 1, hoverT, onHover, children, className, ariaLabel }: FrameProps) {
  const [ref, width] = useWidth<HTMLDivElement>();
  const P = useChartPalette();
  const padB = xLabels ? 26 : 6;
  const w = Math.max(width - PAD_R, 10);
  const h = height - padB;
  const span = Math.max(t1 - t0, 1);
  const x = (t: number) => ((t - t0) / span) * w;
  const y = (v: number) => h - ((v - lo) / (hi - lo || 1)) * h;
  const days: number[] = [];
  for (let d = (Math.floor(t0 / 86400) + 1) * 86400; d < t1; d += 86400) days.push(d);
  const labelStep = Math.max(dayStep, Math.ceil(46 / Math.max((86400 / span) * w, 1)));

  const move = (e: React.PointerEvent<SVGRectElement>) => {
    if (!onHover) return;
    const r = e.currentTarget.getBoundingClientRect();
    const fx = Math.min(Math.max((e.clientX - r.left) / r.width, 0), 1);
    onHover(t0 + fx * span);
  };

  return (
    <div ref={ref} className={className} style={{ height }}>
      {width > 0 && (
        <svg width={width} height={height} role="img" aria-label={ariaLabel} className="block select-none overflow-visible">
          {days.map((d) => (
            <line key={d} x1={x(d)} x2={x(d)} y1={0} y2={h} stroke={P.faint} strokeWidth={1} />
          ))}
          {yTicks.map((v) => (
            <g key={v}>
              <line x1={0} x2={w} y1={y(v)} y2={y(v)} stroke={P.rule} strokeWidth={1} />
              <text x={w + 10} y={y(v)} dy="0.35em" fontSize={11} fill={P.mute} className="tabular-nums">
                {yFormat(v)}
              </text>
            </g>
          ))}
          {children({ x, y, w, h })}
          <line x1={0} x2={w} y1={h} y2={h} stroke={P.ink} strokeWidth={1} />
          {xLabels &&
            days.map((d, i) =>
              i % labelStep === 0 ? (
                <g key={d}>
                  <line x1={x(d)} x2={x(d)} y1={h} y2={h + 4} stroke={P.ink} />
                  <text x={x(d)} y={h + 18} textAnchor="middle" fontSize={11} fill={P.mute} className="tabular-nums">
                    {utc(d)}
                  </text>
                </g>
              ) : null,
            )}
          {hoverT != null && hoverT >= t0 && hoverT <= t1 && (
            <line x1={x(hoverT)} x2={x(hoverT)} y1={0} y2={h} stroke={P.ink} strokeOpacity={0.45} strokeDasharray="3 3" />
          )}
          {onHover && (
            <rect
              x={0}
              y={0}
              width={w}
              height={h}
              fill="transparent"
              onPointerMove={move}
              onPointerDown={move}
              onPointerLeave={() => onHover(null)}
              style={{ touchAction: "pan-y" }}
            />
          )}
        </svg>
      )}
    </div>
  );
}

/** Index of the last point at or before t (rows sorted by t in column 0). */
export function at<T extends unknown[]>(rows: T[], t: number) {
  let lo = 0;
  let hi = rows.length - 1;
  while (lo < hi) {
    const m = (lo + hi + 1) >> 1;
    if ((rows[m][0] as number) <= t) lo = m;
    else hi = m - 1;
  }
  return lo;
}
