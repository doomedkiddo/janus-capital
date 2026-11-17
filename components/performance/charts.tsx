"use client";

import { useEffect, useRef, useState } from "react";

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
