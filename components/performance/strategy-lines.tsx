"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useTransform } from "motion/react";
import { bus } from "@/components/stage/bus";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";
import { performance } from "@/lib/i18n/performance";
import { pct, utc, type PerformanceRecord } from "@/lib/performance";
import { useLines } from "@/lib/use-record";
import { cn } from "@/lib/utils";
import { at, linePath, ticks } from "./charts";

const fmt = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));
const two = (n: number) => String(n).padStart(2, "0");
const PAPER = "rgb(var(--c-paper))";
const ACCENT = "rgb(var(--c-accent))";

/** Fig. 3. The secondary strategy lines, side by side and small: each a thumbnail of its last days, drawn like the
 *  main record. The one under the pointer (or the one tapped) takes the room and shows its scale and its figures;
 *  the row keeps its height, so nothing below it moves. On a phone they are stacked and open. Shows nothing until
 *  the file is there. */
export function StrategyLines({ className }: { className?: string }) {
  const { lang } = useLanguage();
  const copy = performance[lang].others;
  const file = useLines();
  const [open, setOpen] = useState<number | null>(null);
  // side by side from the md breakpoint up; below it the lines are stacked and always open
  const [wide, setWide] = useState(true);
  useEffect(() => {
    const q = window.matchMedia("(min-width: 768px)");
    const on = () => setWide(q.matches);
    on();
    q.addEventListener("change", on);
    return () => q.removeEventListener("change", on);
  }, []);
  if (!file || file === "error") return null;
  const shown = copy.lines.filter(([key]) => file.lines[key]);
  if (!shown.length) return null;

  return (
    <figure className={className}>
      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-paper/15 pt-4">
        <span className="label text-accent">{copy.fig}</span>
        <span className="text-[12px] text-paper/45">{fmt(copy.desc, { n: file.days })}</span>
        <span className="label ml-auto hidden text-paper/30 md:inline">{copy.hint}</span>
      </div>
      <div className="mt-6 flex flex-col gap-10 md:h-[330px] md:flex-row md:gap-0" onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(null)}>
        {shown.map(([key, index, extra], i) => (
          <Line
            key={key}
            rec={file.lines[key]}
            days={file.days}
            index={index}
            name={home[lang].strategy.items[index - 1].title}
            extra={extra}
            open={open === i || !wide}
            dimmed={open != null && open !== i}
            first={i === 0}
            onOpen={() => setOpen(i)}
            onToggle={() => setOpen((cur) => (cur === i ? null : i))}
          />
        ))}
      </div>
    </figure>
  );
}

type LineProps = {
  rec: PerformanceRecord;
  days: number;
  index: number;
  name: string;
  extra: string;
  open: boolean;
  dimmed: boolean;
  first: boolean;
  onOpen: () => void;
  onToggle: () => void;
};

function Line({ rec, days, index, name, extra, open, dimmed, first, onOpen, onToggle }: LineProps) {
  const { lang } = useLanguage();
  const copy = performance[lang];
  const k = rec.kpi;
  const figures = [
    [copy.kpi.dd[0], pct(k.max_dd)],
    [copy.kpi.sharpe[0], k.sharpe?.toFixed(2) ?? "—"],
    [copy.kpi.pos[0], `${k.pos_days} / ${k.n_days}`],
  ];

  return (
    <div
      onPointerEnter={(e) => e.pointerType === "mouse" && onOpen()}
      onClick={onToggle}
      className={cn(
        "group flex min-w-0 basis-0 cursor-default flex-col md:transition-[flex-grow,opacity] md:duration-500 md:ease-[cubic-bezier(0.22,1,0.36,1)]",
        open ? "md:grow-[2.6]" : "md:grow",
        dimmed && "md:opacity-60",
        !first && "md:border-l md:border-paper/15 md:pl-8",
        first && "md:pr-8",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="label flex items-center gap-3 text-paper/45">
            <span className="text-accent">{two(index)}</span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
              <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span className="truncate">{extra || home[lang].hero.live}</span>
          </p>
          <h3 className="display mt-3 text-[1.45rem] !leading-tight md:truncate md:text-[1.6rem]">{name}</h3>
        </div>
        <div className="shrink-0 text-right">
          <p className="label text-paper/45">{fmt(copy.others.ret, { n: days })}</p>
          <p className="display mt-2 text-[2rem] tabular-nums !leading-none md:text-[2.3rem]">{pct(k.cum_return)}</p>
        </div>
      </div>

      <LineFigure rec={rec} detail={open} className="mt-5 h-[190px] md:h-auto md:min-h-0 md:flex-1" />

      {/* the line's figures: always on a phone, on a wide screen once it is open */}
      <dl className={cn("mt-4 flex gap-5 text-[11px] md:gap-8 tabular-nums transition-opacity duration-500 md:h-9", open ? "md:opacity-100" : "md:opacity-0")}>
        {figures.map(([label, value]) => (
          <div key={label} className="min-w-0">
            <dt className="label truncate tracking-[0.08em] text-paper/40 md:tracking-[0.24em]">{label}</dt>
            <dd className="mt-2 whitespace-nowrap text-[13px] text-paper/85">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** A record as a small interferogram: net value above the axis, drawdown below, the curve along the tips. With
 *  `detail` it also carries its scale, its days and the reading under the pointer. */
function LineFigure({ rec, detail, className }: { rec: PerformanceRecord; detail: boolean; className?: string }) {
  const id = useId();
  const reduce = useReducedMotion();
  const [ref, width, height] = useSize<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const slip = useTransform(bus.omega, (v) => v * 4);
  const rows = rec.series.rows;
  const scaled = detail;
  const padR = scaled ? 44 : 0;
  const padB = scaled ? 20 : 0;
  const w = Math.max(width - padR, 10);
  const h = Math.max(height - padB, 40);
  const SLIT = 8;
  const DN = Math.round(h * 0.2);
  const UP = h - SLIT - DN;
  const P = 6;
  const n = Math.max(Math.floor(w / P), 1);
  const t0 = rows[0][0];
  const t1 = rows[rows.length - 1][0];
  const span = Math.max(t1 - t0, 1);

  const { lo, top, ddLo, bars } = useMemo(() => {
    const navs = rows.map((r) => r[1]);
    const lo = Math.min(1, ...navs);
    const hi = Math.max(...navs);
    return {
      lo,
      top: hi + 0.08 * (hi - lo || 1),
      ddLo: Math.min(...rows.map((r) => r[2]), -0.005) * 1.15,
      bars: Array.from({ length: n }, (_, i) => {
        const ja = at(rows, t0 + (i / n) * span);
        const jb = at(rows, t0 + ((i + 1) / n) * span);
        let dd = 0;
        for (let j = ja; j <= jb; j++) dd = Math.min(dd, rows[j][2]);
        return { j: jb, nav: rows[jb][1], dd };
      }),
    };
  }, [rows, n, t0, span]);

  const x = (t: number) => ((t - t0) / span) * w;
  const yUp = (v: number) => UP - ((v - lo) / (top - lo || 1)) * UP;
  const yDn = (d: number) => (d / ddLo) * DN;
  const last = rows[rows.length - 1];
  const cur = hover == null ? null : rows[bars[Math.min(hover, n - 1)].j];
  const days: number[] = [];
  for (let d = (Math.floor(t0 / 86400) + 1) * 86400; d < t1; d += 86400) days.push(d);
  const dayStep = Math.max(1, Math.ceil(64 / Math.max((86400 / span) * w, 1)));

  const move = (e: React.PointerEvent<SVGRectElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setHover(Math.min(n - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * n))));
  };

  return (
    <div ref={ref} className={cn("relative", className)}>
      {width > 0 && height > 0 && (
        <svg width={width} height={height} aria-hidden className="absolute inset-0 block select-none overflow-visible">
          <defs>
            <linearGradient id={`${id}u`} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2={UP}>
              <stop offset="0" style={{ stopColor: PAPER, stopOpacity: 0.9 }} />
              <stop offset="1" style={{ stopColor: PAPER, stopOpacity: 0.18 }} />
            </linearGradient>
            <linearGradient id={`${id}d`} gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2={DN}>
              <stop offset="0" style={{ stopColor: ACCENT, stopOpacity: 0.35 }} />
              <stop offset="1" style={{ stopColor: ACCENT, stopOpacity: 1 }} />
            </linearGradient>
          </defs>

          {scaled &&
            ticks(lo, top, 3).map((v) => (
              <g key={v}>
                <line x1={0} x2={w} y1={yUp(v)} y2={yUp(v)} className="stroke-paper/10" />
                <text x={w + 10} y={yUp(v)} dy="0.35em" fontSize={10} className="fill-paper/45 font-mono tabular-nums">
                  {v.toFixed(2)}
                </text>
              </g>
            ))}
          <line x1={0} x2={w} y1={UP + SLIT / 2} y2={UP + SLIT / 2} className="stroke-paper/25" />
          {scaled &&
            days.map((d, i) =>
              i % dayStep === 0 ? (
                <text key={d} x={x(d)} y={height - 4} textAnchor="middle" fontSize={10} className="fill-paper/45 font-mono tabular-nums">
                  {utc(d)}
                </text>
              ) : null,
            )}

          {bars.map((b, i) => (
            <rect key={i} x={i * P} y={yUp(b.nav)} width={P / 2} height={Math.max(UP - yUp(b.nav), 0)} fill={`url(#${id}u)`} opacity={hover == null || hover === i ? 1 : 0.55} />
          ))}
          <g transform={`translate(0 ${UP + SLIT})`}>
            <motion.g style={{ x: reduce ? 0 : slip }}>
              {bars.map((b, i) => (
                <rect key={i} x={i * P} y={0} width={P / 2} height={yDn(b.dd)} fill={`url(#${id}d)`} opacity={hover == null || hover === i ? 1 : 0.55} />
              ))}
            </motion.g>
          </g>
          <path d={linePath(rows.map((r) => [x(r[0]), yUp(r[1])]))} fill="none" strokeWidth={1.2} strokeLinejoin="round" className="stroke-paper" />
          <circle cx={x(last[0])} cy={yUp(last[1])} r={3} className="fill-accent" />

          {scaled && hover != null && <line x1={hover * P + P / 4} x2={hover * P + P / 4} y1={0} y2={h} className="stroke-paper/50" strokeDasharray="2 3" />}
          {scaled && <rect x={0} y={0} width={w} height={h} fill="transparent" onPointerMove={move} onPointerLeave={() => setHover(null)} style={{ touchAction: "pan-y" }} />}
        </svg>
      )}
      {scaled && cur && (
        <p className="pointer-events-none absolute left-0 top-0 bg-ink/80 px-1.5 py-1 font-mono text-[10.5px] tabular-nums text-paper/70">
          {utc(cur[0], "mdhm")} <b className="ml-2 font-medium text-paper">{cur[1].toFixed(4)}</b>
          <b className={cn("ml-2 font-medium", cur[2] < 0 ? "text-accent" : "text-paper/60")}>{pct(cur[2], 2, false)}</b>
        </p>
      )}
    </div>
  );
}

/** Width and height of an element, as the layout gives them. */
function useSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [box, setBox] = useState([0, 0]);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setBox([Math.floor(e.contentRect.width), Math.floor(e.contentRect.height)]));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, box[0], box[1]] as const;
}
