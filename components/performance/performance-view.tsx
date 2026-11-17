"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { animate, motion, useInView, useReducedMotion, useTransform } from "motion/react";
import { bus, useStageAnchor } from "@/components/stage/bus";
import { ChapterMark } from "@/components/ui/chapter-mark";
import { ShiftText } from "@/components/ui/shift-text";
import { useLanguage } from "@/lib/i18n/language-context";
import { performance } from "@/lib/i18n/performance";
import { pct, utc, type PerformanceRecord } from "@/lib/performance";
import { useRecord } from "@/lib/use-record";
import { cn } from "@/lib/utils";
import { at, linePath, ticks, useWidth } from "./charts";

const fmt = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));
const pctAxis = (v: number) => `${Math.round(v * 100)}%`.replace("-", "−");
const EASE = [0.22, 1, 0.36, 1] as const;
const LATEST_DAYS = 12;
// SVG paint from the theme's tokens (they flip with the surface)
const PAPER = "rgb(var(--c-paper))";
const ACCENT = "rgb(var(--c-accent))";

/** Readout: the live record, drawn the way the mark is drawn. Net value stands above the axis as fringes in the main
 *  colour, drawdown hangs below it in the accent. Only ratios are shown (see lib/performance.ts). */
export function PerformanceView({ variant = "page" }: { variant?: "page" | "home" }) {
  const { lang } = useLanguage();
  const copy = performance[lang];
  const rec = useRecord();
  const strip = useStageAnchor("strip");
  const home = variant === "home";
  const live = rec && rec !== "error" ? rec : null;
  const Title = home ? "h2" : "h1";

  return (
    <div className={cn(home ? "pt-24 md:pt-36" : "pt-0")}>
      {!home && <div ref={strip} data-stage-figure className="h-20 w-full md:h-28" />}
      <div className={cn("mx-auto max-w-[1320px] px-5 pb-24 md:px-10 md:pb-36", !home && "pt-14 md:pt-20")}>
        <div className="grid gap-8 md:grid-cols-12 md:items-end md:gap-10">
          <div className="md:col-span-7">
            <ChapterMark index={1} />
            <Title className={cn("display mt-6 md:mt-8 md:text-[6rem]", lang === "zh" ? "text-[3.4rem]" : "text-[2.7rem]")}>
              <ShiftText>{copy.title}</ShiftText>
            </Title>
          </div>
          <div className="md:col-span-5 md:pb-3">
            <p className="max-w-md text-[15px] leading-relaxed text-paper/70 md:text-base">{copy.lede}</p>
            {live && (
              <p className="mt-5 flex flex-wrap items-center gap-x-2.5 gap-y-1.5 font-mono text-[11px] tabular-nums text-paper/50">
                <span className="relative mr-0.5 flex h-1.5 w-1.5">
                  <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
                  <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
                {fmt(copy.asof, { t: utc(live.asof, "ymdhm") })}
                <span className="text-accent">/</span>
                {fmt(copy.since, { t: utc(live.since, "ymdhm") })}
                <span className="text-accent">/</span>
                {copy.cadence}
              </p>
            )}
          </div>
        </div>

        {rec === undefined && <Loading label={copy.loading} />}
        {rec === "error" && <p className="mt-16 border-t border-paper/15 pt-8 text-sm text-neg">{copy.failed}</p>}
        {live && (
          <>
            <Reading rec={live} />
            <Interferogram rec={live} />
            <div className="mt-16 grid gap-x-10 gap-y-16 md:mt-24 lg:grid-cols-12">
              <DailyFringes rec={live} className="lg:col-span-7" />
              <Ledger rec={live} className="lg:col-span-5" />
            </div>
            <ol className="mt-16 grid gap-6 border-t border-paper/15 pt-8 text-[12.5px] leading-relaxed text-paper/50 md:mt-24 md:grid-cols-3 md:gap-10">
              {copy.notes.map((n, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <span>{n}</span>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </div>
  );
}

/** Two pulses round a ring in opposite directions while the record is on its way. */
function Loading({ label }: { label: string }) {
  return (
    <p className="mt-16 flex items-center gap-3 border-t border-paper/15 pt-8 font-mono text-xs text-paper/50">
      <svg viewBox="-12 -12 24 24" className="h-5 w-5 text-accent" aria-hidden>
        <circle r="9" fill="none" stroke="currentColor" strokeOpacity="0.25" />
        <circle cy="-9" r="1.8" fill="currentColor">
          <animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="1.8s" repeatCount="indefinite" />
        </circle>
        <circle cy="-9" r="1.8" fill="currentColor">
          <animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="1.8s" repeatCount="indefinite" />
        </circle>
      </svg>
      {label}
    </p>
  );
}

function Caption({ fig, title, desc, right, className }: { fig: string; title?: string; desc?: string; right?: React.ReactNode; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-baseline gap-x-4 gap-y-2 border-t border-paper/15 pt-4", className)}>
      <span className="label text-accent">{fig}</span>
      {title && <span className="text-[13px] text-paper/80">{title}</span>}
      {desc && <span className="text-[12px] text-paper/45">{desc}</span>}
      {right && <span className="ml-auto">{right}</span>}
    </div>
  );
}

/** The cumulative return, as large as the page allows, counted up once when it comes into view, and the other
 *  figures of the record beside it. */
function Reading({ rec }: { rec: PerformanceRecord }) {
  const { lang } = useLanguage();
  const copy = performance[lang];
  const c = copy.kpi;
  const k = rec.kpi;
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px" });
  const [shown, setShown] = useState(reduce ? k.cum_return : 0);

  useEffect(() => {
    if (!inView || reduce) return setShown(k.cum_return);
    const run = animate(0, k.cum_return, { duration: 2, ease: [0.16, 1, 0.3, 1], onUpdate: setShown });
    return () => run.stop();
  }, [inView, reduce, k.cum_return]);

  // sized by the final figure, so the count never changes the layout
  const chars = pct(k.cum_return).length;
  const text = `${shown >= 0 ? "+" : "−"}${Math.abs(shown * 100).toFixed(1)}`.padStart(chars - 1, " ");

  const sameDay = utc(k.dd_peak) === utc(k.dd_trough);
  const cells: { label: string; value: React.ReactNode; sub: React.ReactNode; tone?: "neg" }[] = [
    { label: c.dd[0], value: pct(k.max_dd), sub: fmt(c.dd[1], { a: utc(k.dd_peak, "mdhm"), b: sameDay ? utc(k.dd_trough, "mdhm").slice(6) : utc(k.dd_trough, "mdhm") }), tone: "neg" },
    { label: c.sharpe[0], value: k.sharpe?.toFixed(2) ?? "—", sub: fmt(c.sharpe[1], { n: k.n_days }) },
    { label: c.vol[0], value: k.daily_vol == null ? "—" : pct(k.daily_vol, 1, false), sub: c.vol[1] },
    {
      label: c.pos[0],
      value: (
        <span className="flex items-center gap-3">
          {k.pos_days}
          <span className="text-paper/35">/</span>
          {k.n_days}
          <DayRing rec={rec} />
        </span>
      ),
      sub: fmt(c.pos[1], { w: Math.round((100 * k.pos_days) / Math.max(k.n_days, 1)) }),
    },
    {
      label: c.best[0],
      value:
        k.best_day == null || k.worst_day == null ? (
          "—"
        ) : (
          <span className="text-[0.72em]">
            {pct(k.best_day)} <span className="text-paper/35">/</span> <span className="text-neg">{pct(k.worst_day)}</span>
          </span>
        ),
      sub: c.best[1],
    },
  ];

  return (
    <div ref={ref} className="mt-14 border-t border-paper/15 pt-8 md:mt-20">
      <div className="grid gap-y-10 md:grid-cols-12 md:items-end md:gap-x-10">
        <div className="md:col-span-8">
          <p className="label text-paper/50">{c.cum}</p>
          <p
            aria-label={pct(k.cum_return)}
            className="display mt-4 text-[min(var(--fs-m),7.6rem)] !font-light !leading-[0.9] !tracking-[-0.04em] md:mt-6 md:text-[min(var(--fs-d),15rem)]"
            style={{ "--fs-m": `${(152 / chars).toFixed(1)}vw`, "--fs-d": `${(98 / chars).toFixed(1)}vw` } as React.CSSProperties}
          >
            <ShiftText amp={0.1} delay={0.1}>
              <span aria-hidden className="inline-flex items-start">
                {[...text].map((ch, i) => (
                  <span key={i} className={cn("inline-block text-center", /\d/.test(ch) ? "w-[0.56em]" : ch === "." ? "w-[0.26em]" : "w-[0.5em]")}>
                    {ch}
                  </span>
                ))}
                <span className="ml-[0.06em] mt-[0.1em] text-[0.42em] leading-none text-accent">%</span>
              </span>
            </ShiftText>
          </p>
          <p className="mt-5 font-mono text-[11px] tabular-nums text-paper/45 md:mt-7">{fmt(copy.record.cumSub, { t: utc(rec.since, "ymd") })} · UTC</p>
        </div>

        <div className="md:col-span-4 md:pb-1 md:text-right">
          <p className="label text-accent">{copy.record.kind}</p>
          <p className="display mt-4 text-[1.9rem] md:text-[2.3rem]">{copy.record.name}</p>
          <p className="mt-4 font-mono text-[11px] leading-relaxed text-paper/45">{copy.record.tags.join(" · ")}</p>
        </div>
      </div>

      <div className="mt-10 grid grid-cols-2 border-t border-paper/15 md:mt-14 md:grid-cols-5">
        {cells.map((it, i) => (
          <div
            key={it.label}
            className={cn(
              "border-b border-paper/15 py-5 pr-3 md:border-b-0 md:py-7",
              i % 2 === 1 && "border-l pl-5 md:pl-0",
              i > 0 && "md:border-l md:pl-6",
              i === cells.length - 1 && cells.length % 2 === 1 && "col-span-2 md:col-span-1",
            )}
          >
            <p className="label text-paper/45">{it.label}</p>
            <p className={cn("display mt-4 text-[1.75rem] tabular-nums !leading-none md:text-[2.1rem]", it.tone === "neg" && "text-neg")}>{it.value}</p>
            <p className="mt-3 font-mono text-[10.5px] tabular-nums text-paper/40">{it.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Every complete day of the record as one arc of a loop: a gain in the main colour, a loss in the accent. */
function DayRing({ rec }: { rec: PerformanceRecord }) {
  const days = rec.daily.rows.filter((d) => !d[3]);
  const n = Math.max(days.length, 1);
  const seg = 360 / n;
  const gap = Math.min(5, seg * 0.28);
  const pt = (deg: number) => {
    const a = ((deg - 90) * Math.PI) / 180;
    return `${(13 * Math.cos(a)).toFixed(2)} ${(13 * Math.sin(a)).toFixed(2)}`;
  };
  return (
    <svg viewBox="-16 -16 32 32" className="h-[0.95em] w-[0.95em]" aria-hidden>
      {days.map((d, i) => (
        <path
          key={d[0]}
          d={`M${pt(i * seg + gap / 2)}A13 13 0 0 1 ${pt((i + 1) * seg - gap / 2)}`}
          fill="none"
          strokeWidth={3.2}
          style={{ stroke: d[1] >= 0 ? PAPER : ACCENT }}
        />
      ))}
    </svg>
  );
}

/** Fig. 1. The record as an interferogram: one fringe per slice of time, rising to the net value above the axis and
 *  hanging to the drawdown below it. The exact curve runs along the tips. A beam scans it in once; afterwards the
 *  lower fringes slip with the page, as the mark's do. */
function Interferogram({ rec }: { rec: PerformanceRecord }) {
  const { lang } = useLanguage();
  const copy = performance[lang];
  const reduce = useReducedMotion();
  const [ref, width] = useWidth<HTMLDivElement>();
  const inView = useInView(ref, { once: true, margin: "-18% 0px" });
  const [hover, setHover] = useState<number | null>(null);
  const slip = useTransform(bus.omega, (v) => v * 5);
  const rows = rec.series.rows;
  const k = rec.kpi;

  const small = width < 640;
  const padR = small ? 38 : 58;
  const w = Math.max(width - padR, 10);
  const UP = small ? 230 : 380;
  const DN = small ? 80 : 124;
  const SLIT = 12;
  const P = small ? 6 : width < 1000 ? 8 : 9;
  const n = Math.max(Math.floor(w / P), 1);
  const t0 = rows[0][0];
  const t1 = rows[rows.length - 1][0];
  const span = Math.max(t1 - t0, 1);

  const { lo, top, ddLo, bars, peak } = useMemo(() => {
    const navs = rows.map((r) => r[1]);
    const lo = Math.min(1, ...navs);
    const hi = Math.max(...navs);
    let pk = 1;
    return {
      lo,
      top: hi + 0.07 * (hi - lo || 1),
      ddLo: Math.min(...rows.map((r) => r[2]), -0.005) * 1.18,
      peak: rows.map((r) => (pk = Math.max(pk, r[1]))),
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
  const days: number[] = [];
  for (let d = (Math.floor(t0 / 86400) + 1) * 86400; d < t1; d += 86400) days.push(d);
  const dayStep = Math.max(1, Math.ceil(52 / Math.max((86400 / span) * w, 1)));
  const height = UP + SLIT + DN + 26;
  const last = rows[rows.length - 1];
  const iPeak = at(rows, k.dd_peak);
  const iTrough = at(rows, k.dd_trough);
  const cur = hover == null ? last : rows[bars[Math.min(hover, n - 1)].j];
  const show = inView || !!reduce;

  const move = (e: React.PointerEvent<SVGRectElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    setHover(Math.min(n - 1, Math.max(0, Math.floor(((e.clientX - r.left) / r.width) * n))));
  };

  return (
    <figure className="mt-16 md:mt-24">
      <Caption
        fig={copy.figs[0]}
        desc={copy.nav.desc}
        right={
          <span className="flex items-center gap-5 font-mono text-[11px] text-paper/50">
            <span className="flex items-center gap-2">
              <span className="h-3 w-[3px] bg-paper" />
              {copy.nav.tooltipNav}
            </span>
            <span className="flex items-center gap-2">
              <span className="h-3 w-[3px] bg-accent" />
              {copy.nav.tooltipDd}
            </span>
          </span>
        }
      />

      {/* the reading under the pointer; at rest, the latest */}
      <div className="mt-6 flex flex-wrap items-baseline gap-x-8 gap-y-2 font-mono text-[11px] tabular-nums text-paper/50 md:mt-8">
        <span className="text-paper/70">{utc(cur[0], "ymdhm")} UTC</span>
        <span>
          {copy.nav.tooltipNav} <b className="ml-1.5 text-[15px] font-medium text-paper">{cur[1].toFixed(4)}</b>
        </span>
        <span>
          {copy.nav.tooltipDd} <b className={cn("ml-1.5 text-[15px] font-medium", cur[2] < 0 ? "text-accent" : "text-paper")}>{pct(cur[2], 2, false)}</b>
        </span>
        <span className="ml-auto hidden text-paper/30 md:inline">{copy.scan}</span>
      </div>

      <div ref={ref} className="mt-4" style={{ height }}>
        {width > 0 && (
          <svg width={width} height={height} role="img" aria-label={copy.figs[0]} className="block select-none overflow-visible">
            <defs>
              <linearGradient id="igUp" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2={UP}>
                <stop offset="0" style={{ stopColor: PAPER, stopOpacity: 0.92 }} />
                <stop offset="1" style={{ stopColor: PAPER, stopOpacity: 0.2 }} />
              </linearGradient>
              <linearGradient id="igDn" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2={DN}>
                <stop offset="0" style={{ stopColor: ACCENT, stopOpacity: 0.35 }} />
                <stop offset="1" style={{ stopColor: ACCENT, stopOpacity: 1 }} />
              </linearGradient>
              <clipPath id="igScan">
                <motion.rect x={-8} y={-30} height={height + 30} initial={false} animate={{ width: show ? w + 80 : 0 }} transition={reduce ? { duration: 0 } : { duration: 2.6, ease: [0.4, 0, 0.2, 1] }} />
              </clipPath>
            </defs>

            {/* scale: net value above, drawdown below */}
            {ticks(lo, top, 4).map((v) => (
              <g key={v}>
                <line x1={0} x2={w} y1={yUp(v)} y2={yUp(v)} className="stroke-paper/10" />
                <text x={w + 12} y={yUp(v)} dy="0.35em" fontSize={10.5} className="fill-paper/45 font-mono tabular-nums">
                  {v.toFixed(2)}
                </text>
              </g>
            ))}
            {ticks(ddLo, 0, 2).map((v) => (
              <text key={v} x={w + 12} y={UP + SLIT + yDn(v)} dy="0.35em" fontSize={10.5} className="fill-paper/45 font-mono tabular-nums">
                {pctAxis(v)}
              </text>
            ))}

            {/* the axis: a slit between the two rows, with a tick at every UTC midnight */}
            <line x1={0} x2={w} y1={UP + SLIT / 2} y2={UP + SLIT / 2} className="stroke-paper/25" />
            {days.map((d, i) => (
              <g key={d}>
                <line x1={x(d)} x2={x(d)} y1={UP + 2} y2={UP + SLIT - 2} className="stroke-paper/60" />
                {i % dayStep === 0 && (
                  <text x={x(d)} y={height - 6} textAnchor="middle" fontSize={10.5} className="fill-paper/45 font-mono tabular-nums">
                    {utc(d)}
                  </text>
                )}
              </g>
            ))}

            <g clipPath="url(#igScan)">
              {bars.map((b, i) => (
                <rect key={i} x={i * P} y={yUp(b.nav)} width={P / 2} height={Math.max(UP - yUp(b.nav), 0)} fill="url(#igUp)" opacity={hover == null || hover === i ? 1 : 0.55} />
              ))}
              <g transform={`translate(0 ${UP + SLIT})`}>
                <motion.g style={{ x: reduce ? 0 : slip }}>
                  {bars.map((b, i) => (
                    <rect key={i} x={i * P} y={0} width={P / 2} height={yDn(b.dd)} fill="url(#igDn)" opacity={hover == null || hover === i ? 1 : 0.55} />
                  ))}
                </motion.g>
              </g>

              {/* high-water mark, and the exact curve along the tips */}
              <path d={linePath(rows.map((r, i) => [x(r[0]), yUp(peak[i])]))} fill="none" strokeWidth={1} strokeDasharray="1.5 4" className="stroke-accent/70" />
              <path d={linePath(rows.map((r) => [x(r[0]), yUp(r[1])]))} fill="none" strokeWidth={1.4} strokeLinejoin="round" className="stroke-paper" />

              {/* the deepest drawdown: from its peak to its trough */}
              <line x1={x(rows[iPeak][0])} x2={x(rows[iPeak][0])} y1={yUp(rows[iPeak][1])} y2={UP + SLIT + DN} strokeDasharray="2 3" className="stroke-neg/70" />
              <line x1={x(rows[iTrough][0])} x2={x(rows[iTrough][0])} y1={yUp(rows[iTrough][1])} y2={UP + SLIT + DN} strokeDasharray="2 3" className="stroke-neg/70" />
              <text x={x(rows[iTrough][0]) + 8} y={UP + SLIT + DN - 4} fontSize={11} className="fill-neg font-mono tabular-nums">
                {copy.nav.mdd} {pct(k.max_dd)}
              </text>

              <circle cx={x(last[0])} cy={yUp(last[1])} r={3.5} className="fill-accent" />
              <circle cx={x(last[0])} cy={yUp(last[1])} r={8} fill="none" className="stroke-accent/50" />
              <text x={x(last[0]) - 14} y={yUp(last[1]) - 12} textAnchor="end" fontSize={17} className="fill-paper font-jost tabular-nums">
                {last[1].toFixed(3)}
              </text>
            </g>

            {/* the scanning beam */}
            {!reduce && (
              <motion.line
                y1={-14}
                y2={UP + SLIT + DN}
                strokeWidth={1.5}
                className="stroke-accent"
                initial={false}
                animate={show ? { x1: w + 60, x2: w + 60, opacity: [0, 1, 1, 0] } : { x1: 0, x2: 0, opacity: 0 }}
                transition={{ duration: 2.6, ease: [0.4, 0, 0.2, 1], opacity: { duration: 2.6, times: [0, 0.05, 0.86, 0.95] } }}
              />
            )}

            {hover != null && <line x1={hover * P + P / 4} x2={hover * P + P / 4} y1={-10} y2={UP + SLIT + DN} className="stroke-paper/50" strokeDasharray="2 3" />}
            <rect x={0} y={0} width={w} height={UP + SLIT + DN} fill="transparent" onPointerMove={move} onPointerDown={move} onPointerLeave={() => setHover(null)} style={{ touchAction: "pan-y" }} />
          </svg>
        )}
      </div>
    </figure>
  );
}

/** Fig. 2. Daily returns as the mark draws its fringes: one bar a day, gains standing on the axis, losses hanging
 *  from it in the accent. */
function DailyFringes({ rec, className }: { rec: PerformanceRecord; className?: string }) {
  const { lang } = useLanguage();
  const copy = performance[lang];
  const reduce = useReducedMotion();
  const [ref, width] = useWidth<HTMLDivElement>();
  const shown = useInView(ref, { once: true, margin: "-60px" }) || !!reduce;
  const [hover, setHover] = useState<number | null>(null);
  const slip = useTransform(bus.omega, (v) => v * 8);
  const rows = rec.daily.rows;
  const height = 340;
  const padR = 46;
  const padB = 26;
  const padT = 30;
  const up = Math.max(...rows.map((r) => r[1]), 0.001);
  const down = Math.max(...rows.map((r) => -r[1]), 0.001);
  const w = Math.max(width - padR, 10);
  const h = height - padB;
  const gap = 8;
  const scale = (h - gap - padT - 22) / (up + down);
  const y0 = padT + up * scale;
  const slot = w / rows.length;
  const bar = Math.max(Math.min(slot / 2, 34), 1.5);
  const labelStep = Math.max(1, Math.ceil(46 / slot));
  const valued = slot >= 50; // room to print each day's figure over its fringe
  const cur = hover == null ? null : rows[hover];

  return (
    <figure className={className}>
      <Caption
        fig={copy.figs[1]}
        desc={copy.fringes.desc}
        right={
          cur ? (
            <span className="font-mono text-[11px] tabular-nums text-paper/60">
              {utc(cur[0], "ymd")} <b className={cn("ml-2 font-medium", cur[1] >= 0 ? "text-paper" : "text-accent")}>{pct(cur[1], 2)}</b>
            </span>
          ) : (
            <span className="flex items-center gap-5 font-mono text-[11px] text-paper/50">
              <span className="flex items-center gap-2">
                <span className="h-3 w-[3px] bg-paper" />
                {copy.fringes.up}
              </span>
              <span className="flex items-center gap-2">
                <span className="h-3 w-[3px] bg-accent" />
                {copy.fringes.down}
              </span>
            </span>
          )
        }
      />
      <div ref={ref} className="mt-6" style={{ height }}>
        {width > 0 && (
          <svg width={width} height={height} role="img" aria-label={copy.figs[1]} className="block select-none overflow-visible">
            {ticks(-down, up, 4).map((v) => (
              <g key={v}>
                {Math.abs(v) > 1e-9 && <line x1={0} x2={w} y1={y0 - v * scale} y2={y0 - v * scale} className="stroke-paper/10" />}
                <text x={w + 12} y={y0 - v * scale} dy="0.35em" fontSize={10.5} className="fill-paper/45 font-mono tabular-nums">
                  {pctAxis(v)}
                </text>
              </g>
            ))}
            <line x1={0} x2={w} y1={y0} y2={y0} className="stroke-paper/25" />
            {rows.map(([d, r, , partial], i) => {
              const size = Math.max(Math.abs(r) * scale, 1);
              const bx = i * slot + (slot - bar) / 2;
              const gain = r >= 0;
              const rest = { attrY: gain ? y0 - gap / 2 : y0 + gap / 2, height: 0 };
              const grown = { attrY: gain ? y0 - gap / 2 - size : y0 + gap / 2, height: size };
              const dim = (partial ? 0.4 : 1) * (hover == null || hover === i ? 1 : 0.5);
              const rect = (
                <motion.rect
                  x={bx}
                  width={bar}
                  style={{ fill: gain ? PAPER : ACCENT }}
                  opacity={dim}
                  initial={false}
                  animate={shown ? grown : rest}
                  transition={reduce ? { duration: 0 } : { duration: 0.8, ease: EASE, delay: Math.min(i * 0.05, 1.2) }}
                />
              );
              return (
                <g key={d}>
                  {gain ? rect : <motion.g style={{ x: reduce ? 0 : slip }}>{rect}</motion.g>}
                  {valued && (
                    <motion.text
                      x={bx + bar / 2}
                      y={gain ? y0 - gap / 2 - size - 8 : y0 + gap / 2 + size + 15}
                      textAnchor="middle"
                      fontSize={10.5}
                      className={cn("font-mono tabular-nums", gain ? "fill-paper/70" : "fill-accent")}
                      initial={false}
                      animate={{ opacity: shown ? dim : 0 }}
                      transition={reduce ? { duration: 0 } : { duration: 0.5, delay: Math.min(i * 0.05, 1.2) + 0.5 }}
                    >
                      {pct(r)}
                    </motion.text>
                  )}
                  {i % labelStep === 0 && (
                    <text x={bx + bar / 2} y={height - 6} textAnchor="middle" fontSize={10.5} className="fill-paper/45 font-mono tabular-nums">
                      {utc(d)}
                    </text>
                  )}
                  <rect x={i * slot} y={0} width={slot} height={h} fill="transparent" onPointerEnter={() => setHover(i)} onPointerLeave={() => setHover(null)} />
                </g>
              );
            })}
          </svg>
        )}
      </div>
    </figure>
  );
}

/** Table 1. The latest days, newest first. */
function Ledger({ rec, className }: { rec: PerformanceRecord; className?: string }) {
  const { lang } = useLanguage();
  const copy = performance[lang];
  const c = copy.daily;
  const rows = rec.daily.rows.slice(-LATEST_DAYS).reverse();
  const bmax = Math.max(...rows.map((r) => Math.abs(r[1])), 1e-9);
  const cols = "grid grid-cols-[92px_minmax(0,1fr)_62px_58px] items-center gap-x-3";
  return (
    <figure className={className}>
      <Caption fig={copy.figs[2]} desc={c.desc} />
      <div className="mt-6 font-mono text-[12px] tabular-nums">
        <div className={cn(cols, "label border-b border-paper/25 pb-3 text-paper/45")}>
          <span>{c.cols[0]}</span>
          <span />
          <span className="text-right">{c.cols[1]}</span>
          <span className="text-right">{c.cols[2]}</span>
        </div>
        {rows.map(([d, r, v, part]) => (
          <div key={d} className={cn(cols, "border-b border-paper/10 py-[9px] transition-colors hover:bg-paper/[0.04]", part && "text-paper/45")}>
            <span>
              {utc(d, "ymd")}
              {part ? " *" : ""}
            </span>
            <span className="relative h-2">
              <span className="absolute inset-y-[-5px] left-1/2 w-px bg-paper/25" />
              <span
                className={cn("absolute top-0 h-2", r >= 0 ? "bg-paper" : "bg-accent")}
                style={{
                  width: `${(Math.abs(r) / bmax) * 50}%`,
                  left: r >= 0 ? "50%" : `${50 - (Math.abs(r) / bmax) * 50}%`,
                  opacity: part ? 0.4 : 0.9,
                }}
              />
            </span>
            <span className={cn("text-right", r < 0 && "text-neg")}>{pct(r)}</span>
            <span className="text-right text-paper/70">{v.toFixed(3)}</span>
          </div>
        ))}
        <p className="pt-3 text-[10.5px] text-paper/40">{c.partial}</p>
      </div>
    </figure>
  );
}
