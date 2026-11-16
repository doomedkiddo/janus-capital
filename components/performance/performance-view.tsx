"use client";

import { useEffect, useMemo, useState } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { performance } from "@/lib/i18n/performance";
import { useLanguage } from "@/lib/i18n/language-context";
import { RECORD_URL, pct, utc, type PerformanceRecord } from "@/lib/performance";
import { cn } from "@/lib/utils";
import { Frame, areaPath, at, linePath, ticks, useChartPalette, useWidth } from "./charts";

const fmt = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));
const pctAxis = (v: number) => `${Math.round(v * 100)}%`.replace("-", "−");
const EASE = [0.22, 1, 0.36, 1] as const;
const LATEST_DAYS = 14;

export function PerformanceView({ variant = "page" }: { variant?: "page" | "home" }) {
  const { lang } = useLanguage();
  const copy = performance[lang];
  const [rec, setRec] = useState<PerformanceRecord | "error">();
  const home = variant === "home";

  useEffect(() => {
    fetch(RECORD_URL, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j: PerformanceRecord) => setRec(j))
      .catch(() => setRec("error"));
  }, []);

  const asof = rec && rec !== "error" && (
    <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs tabular-nums tracking-wide text-paper/50 md:text-sm">
      <span className="relative mr-1 flex h-1.5 w-1.5">
        <span className="absolute inset-0 animate-pulse-ring rounded-full bg-accent" />
        <span className="relative h-1.5 w-1.5 rounded-full bg-accent" />
      </span>
      {fmt(copy.asof, { t: utc(rec.asof, "ymdhm") })}
      <span className="text-accent-2">·</span>
      {fmt(copy.since, { t: utc(rec.since, "ymdhm") })}
      <span className="text-accent-2">·</span>
      {copy.cadence}
    </p>
  );

  return (
    <div className="bg-paper">
      {home ? (
        <div className="ink-surface bg-ink px-4 pb-24 pt-4 text-paper md:px-6 md:pb-32 md:pt-6">
          <div className="mx-auto grid max-w-7xl gap-10 pt-14 md:grid-cols-[1.3fr_1fr] md:items-end md:pt-20">
            <div>
              <BlurFade>
                <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent md:text-xs">{copy.overline}</p>
              </BlurFade>
              <BlurFade delay={0.06}>
                <h2 className="mt-5 headline text-4xl leading-[1.05] sm:text-5xl md:text-7xl">{copy.title}</h2>
              </BlurFade>
              <BlurFade delay={0.12}>
                <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/70 md:text-lg">{copy.lede}</p>
              </BlurFade>
            </div>
            <BlurFade delay={0.16} className="flex flex-col items-start gap-5 md:items-end md:text-right">
              {asof}
            </BlurFade>
          </div>
        </div>
      ) : (
        <div className="ink-surface bg-ink px-4 pb-20 pt-20 text-center text-paper md:px-6 md:pb-28 md:pt-28">
          <div className="mx-auto max-w-4xl">
            <BlurFade>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent md:text-xs">{copy.overline}</p>
            </BlurFade>
            <BlurFade delay={0.08}>
              <h1 className="mt-7 headline text-5xl leading-[1.02] sm:text-6xl md:text-8xl">{copy.title}</h1>
            </BlurFade>
            <BlurFade delay={0.16}>
              <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-paper/70 md:text-lg">{copy.lede}</p>
            </BlurFade>
            <BlurFade delay={0.2} className="mt-9 flex flex-col items-center gap-5">
              {asof}
            </BlurFade>
          </div>
        </div>
      )}

      <div className="relative mx-auto -mt-12 max-w-7xl px-4 pb-20 md:-mt-16 md:px-6 md:pb-28">
        <BlurFade>
          <div className="rounded-[28px] bg-paper-2 p-6 ring-1 ring-rule md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-2">{copy.record.kind}</p>
                <h3 className="mt-3 headline text-3xl leading-tight text-ink md:text-[2.6rem]">{copy.record.name}</h3>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {copy.record.tags.map((t) => (
                  <span key={t} className="rounded-full border border-ink-3/20 px-3.5 py-1.5 text-xs font-medium text-ink-3">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {rec === undefined && <Loading label={copy.loading} />}
            {rec === "error" && <p className="mt-10 text-sm text-neg">{copy.failed}</p>}
            {rec && rec !== "error" && <Kpis rec={rec} />}
          </div>
        </BlurFade>

        {rec && rec !== "error" && <Body rec={rec} />}
      </div>
    </div>
  );
}

/** Two pulses round a ring in opposite directions while the record is on its way. */
function Loading({ label }: { label: string }) {
  return (
    <p className="mt-10 flex items-center gap-3 text-sm text-mute">
      <svg viewBox="-12 -12 24 24" className="h-5 w-5 text-accent-2" aria-hidden>
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

function Kpis({ rec }: { rec: PerformanceRecord }) {
  const { lang } = useLanguage();
  const copy = performance[lang];
  const c = copy.kpi;
  const k = rec.kpi;
  const items: { label: string; value: React.ReactNode; sub: string; tone?: "neg"; small?: boolean }[] = [
    { label: c.cum, value: pct(k.cum_return), sub: fmt(copy.record.cumSub, { t: utc(rec.since, "ymd") }) },
    { label: c.dd[0], value: pct(k.max_dd), sub: fmt(c.dd[1], { a: utc(k.dd_peak), b: utc(k.dd_trough) }), tone: "neg" },
    { label: c.sharpe[0], value: k.sharpe?.toFixed(2) ?? "—", sub: fmt(c.sharpe[1], { n: k.n_days }) },
    { label: c.vol[0], value: k.daily_vol == null ? "—" : pct(k.daily_vol, 1, false), sub: c.vol[1] },
    { label: c.pos[0], value: `${k.pos_days} / ${k.n_days}`, sub: fmt(c.pos[1], { w: Math.round((100 * k.pos_days) / Math.max(k.n_days, 1)) }) },
    {
      label: c.best[0],
      value:
        k.best_day == null || k.worst_day == null ? (
          "—"
        ) : (
          <>
            {pct(k.best_day)} <span className="text-neg">/ {pct(k.worst_day)}</span>
          </>
        ),
      sub: c.best[1],
      small: true,
    },
  ];
  return (
    <div className="mt-10 grid grid-cols-2 border-t border-ink lg:grid-cols-3">
      {items.map((it, i) => (
        <div
          key={it.label}
          className={cn(
            "border-b border-rule py-5 pr-3 md:py-7",
            i % 2 === 1 && "border-l pl-4 md:pl-6",
            i % 3 !== 0 ? "lg:border-l lg:pl-6" : "lg:border-l-0 lg:pl-0",
          )}
        >
          <p className="text-xs text-mute md:text-sm">{it.label}</p>
          <p
            className={cn(
              "mt-2 font-display font-semibold tabular-nums tracking-tight",
              it.small ? "text-xl md:text-[1.7rem]" : "text-2xl md:text-[2.1rem]",
              it.tone === "neg" ? "text-neg" : "text-ink",
            )}
          >
            {it.value}
          </p>
          <p className="mt-1.5 text-[11px] text-mute/80 md:text-xs">{it.sub}</p>
        </div>
      ))}
    </div>
  );
}

function Card({ title, desc, right, children, className }: { title: string; desc?: string; right?: React.ReactNode; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[28px] bg-paper-2 p-5 ring-1 ring-rule md:p-8", className)}>
      <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="headline text-xl text-ink md:text-2xl">{title}</h3>
        {desc && <span className="text-xs text-mute md:text-sm">{desc}</span>}
        {right && <span className="ml-auto">{right}</span>}
      </div>
      {children}
    </div>
  );
}

function Body({ rec }: { rec: PerformanceRecord }) {
  const P = useChartPalette();
  const reduce = useReducedMotion();
  const { lang } = useLanguage();
  const copy = performance[lang];
  const [hover, setHover] = useState<number | null>(null);
  const rows = rec.series.rows;
  const t0 = rows[0][0];
  const t1 = rows[rows.length - 1][0];
  const k = rec.kpi;

  const nav = useMemo(() => {
    const vals = rows.map((r) => r[1]);
    const lo = Math.min(1, ...vals);
    const hi = Math.max(...vals);
    const pad = 0.08 * (hi - lo);
    let pk = 1;
    const peak = rows.map((r) => (pk = Math.max(pk, r[1])));
    return { lo: lo - pad, hi: hi + pad, peak };
  }, [rows]);
  const ddLo = Math.min(...rows.map((r) => r[2]), -0.005) * 1.15;
  const nDays = (t1 - t0) / 86400;
  const step = nDays > 16 ? Math.ceil(nDays / 12) : 1;
  const hi = hover == null ? null : rows[at(rows, hover)];
  const last = rows[rows.length - 1];
  const iPeak = at(rows, k.dd_peak);
  const iTrough = at(rows, k.dd_trough);
  // the curve draws itself from the start, the way the record was made: once, when it scrolls into view
  const drawn = reduce ? false : { pathLength: 0 };
  const faded = reduce ? false : { opacity: 0 };
  const view = { once: true, margin: "-80px" } as const;

  return (
    <div className="mt-6 space-y-6">
      <BlurFade>
        <Card title={copy.nav.title} desc={copy.nav.desc}>
          <div className="relative">
            <div className="pointer-events-none absolute left-0 top-0 z-10 min-h-[44px] text-xs tabular-nums text-ink/70">
              {hi && (
                <div className="rounded-xl bg-paper-2/95 px-3 py-2 shadow-sm ring-1 ring-rule">
                  <div className="text-mute">{utc(hi[0], "ymdhm")} UTC</div>
                  <div className="mt-0.5">
                    {copy.nav.tooltipNav} <b className="text-ink">{hi[1].toFixed(3)}</b>
                    <span className="mx-1.5 text-rule-2">|</span>
                    {copy.nav.tooltipDd} <b className="text-neg">{pct(hi[2])}</b>
                  </div>
                </div>
              )}
            </div>
            <Frame
              t0={t0}
              t1={t1}
              lo={nav.lo}
              hi={nav.hi}
              height={360}
              yTicks={ticks(nav.lo, nav.hi, 5)}
              yFormat={(v) => v.toFixed(2)}
              xLabels={false}
              hoverT={hover}
              onHover={setHover}
              ariaLabel={copy.nav.title}
            >
              {({ x, y, h }) => {
                const pts = rows.map((r) => [x(r[0]), y(r[1])] as [number, number]);
                const xp = x(rows[iPeak][0]);
                const xt = x(rows[iTrough][0]);
                return (
                  <>
                    <defs>
                      <linearGradient id="navFill" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={P.brass} stopOpacity={0.2} />
                        <stop offset="100%" stopColor={P.brass} stopOpacity={0.01} />
                      </linearGradient>
                    </defs>
                    <rect x={xp} y={0} width={Math.max(xt - xp, 1)} height={h} fill={P.claret} opacity={0.06} />
                    <motion.path d={areaPath(pts, h)} fill="url(#navFill)" initial={faded} whileInView={{ opacity: 1 }} viewport={view} transition={{ duration: 1.2, delay: 0.9 }} />
                    <path
                      d={linePath(rows.map((r, i) => [x(r[0]), y(nav.peak[i])]))}
                      fill="none"
                      stroke={P.brass}
                      strokeWidth={1}
                      strokeDasharray="1.5 3"
                      opacity={0.8}
                    />
                    <line x1={0} x2={x(t1)} y1={y(1)} y2={y(1)} stroke={P.ink} strokeOpacity={0.5} />
                    <motion.path
                      d={linePath(pts)}
                      fill="none"
                      stroke={P.forest}
                      strokeWidth={1.6}
                      strokeLinejoin="round"
                      initial={drawn}
                      whileInView={{ pathLength: 1 }}
                      viewport={view}
                      transition={{ duration: 1.8, ease: EASE }}
                    />
                    <circle cx={xp} cy={y(rows[iPeak][1])} r={4} fill="#fff" stroke={P.claret} strokeWidth={1.3} />
                    <circle cx={xt} cy={y(rows[iTrough][1])} r={4} fill="#fff" stroke={P.claret} strokeWidth={1.3} />
                    <text x={(xp + xt) / 2} y={12} textAnchor="middle" fontSize={12} fontWeight={600} fill={P.claret}>
                      {copy.nav.mdd} {pct(k.max_dd)}
                    </text>
                    <motion.g initial={faded} whileInView={{ opacity: 1 }} viewport={view} transition={{ duration: 0.5, delay: 1.5 }}>
                      <circle cx={x(last[0])} cy={y(last[1])} r={5} fill={P.brass} stroke="#fff" strokeWidth={1.5} />
                      <text x={x(last[0]) - 8} y={y(last[1]) - 10} textAnchor="end" fontSize={14} fontWeight={600} fill={P.ink} className="tabular-nums">
                        {last[1].toFixed(3)}
                      </text>
                    </motion.g>
                  </>
                );
              }}
            </Frame>
            <Frame
              t0={t0}
              t1={t1}
              lo={ddLo}
              hi={0}
              height={128}
              yTicks={ticks(ddLo, 0, 2)}
              yFormat={pctAxis}
              dayStep={step}
              hoverT={hover}
              onHover={setHover}
              className="mt-3"
              ariaLabel={copy.nav.dd}
            >
              {({ x, y }) => {
                const pts = rows.map((r) => [x(r[0]), y(r[2])] as [number, number]);
                return (
                  <>
                    <path d={areaPath(pts, y(0))} fill={P.claret} opacity={0.16} />
                    <path d={linePath(pts)} fill="none" stroke={P.claret} strokeWidth={1} />
                    <text x={x(t1) - 4} y={y(ddLo) - 8} textAnchor="end" fontSize={11} fill={P.mute}>
                      {copy.nav.dd}
                    </text>
                  </>
                );
              }}
            </Frame>
          </div>
        </Card>
      </BlurFade>

      <div className="grid gap-6 lg:grid-cols-12">
        <BlurFade className="lg:col-span-7">
          <Card
            title={copy.fringes.title}
            desc={copy.fringes.desc}
            className="h-full"
            right={
              <span className="flex items-center gap-4 text-[11px] text-mute md:text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-1.5 rounded-[1px]" style={{ background: P.ink }} />
                  {copy.fringes.up}
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2.5 w-1.5 rounded-[1px]" style={{ background: P.brass }} />
                  {copy.fringes.down}
                </span>
              </span>
            }
          >
            <DailyFringes rec={rec} />
          </Card>
        </BlurFade>
        <BlurFade className="lg:col-span-5">
          <Card title={copy.daily.title} desc={copy.daily.desc} className="h-full">
            <Daily rec={rec} />
          </Card>
        </BlurFade>
      </div>

      <BlurFade>
        <div className="ink-surface rounded-[28px] bg-ink p-6 text-[13px] leading-relaxed text-ink-soft md:p-8">
          <ol className="grid gap-4 md:grid-cols-3 md:gap-8">
            {copy.notes.map((n, i) => (
              <li key={i} className="flex gap-3">
                <span className="headline text-accent">{i + 1}</span>
                <span>{n}</span>
              </li>
            ))}
          </ol>
        </div>
      </BlurFade>
    </div>
  );
}

/** Daily returns drawn as the mark draws its fringes: one bar a day, gains standing on the line, losses hanging
 *  from it in the accent colour. */
function DailyFringes({ rec }: { rec: PerformanceRecord }) {
  const P = useChartPalette();
  const reduce = useReducedMotion();
  const [ref, width] = useWidth<HTMLDivElement>();
  const shown = useInView(ref, { once: true, margin: "-60px" }) || !!reduce; // the bars grow from the line, once
  const [hover, setHover] = useState<number | null>(null);
  const rows = rec.daily.rows;
  const height = 330;
  const padR = 46;
  const padB = 24;
  const up = Math.max(...rows.map((r) => r[1]), 0.001);
  const down = Math.max(...rows.map((r) => -r[1]), 0.001);
  const w = Math.max(width - padR, 10);
  const h = height - padB;
  const gap = 3; // the slit between the two halves, as in the mark
  const scale = (h - gap - 28) / (up + down);
  const y0 = 22 + up * scale;
  const slot = w / rows.length;
  const bar = Math.max(Math.min(slot / 2, 30), 1.5);
  const labelStep = Math.max(1, Math.ceil(44 / slot));
  const marks = [...ticks(-down, up, 4).filter((v) => Math.abs(v) > 1e-9), 0];
  const cur = hover == null ? null : rows[hover];

  return (
    <div ref={ref} className="relative" style={{ height }}>
      {cur && (
        <div className="pointer-events-none absolute left-0 top-0 z-10 rounded-xl bg-paper-2/95 px-3 py-2 text-xs tabular-nums shadow-sm ring-1 ring-rule">
          <span className="text-mute">{utc(cur[0], "ymd")}</span>
          <b className={cn("ml-2", cur[1] >= 0 ? "text-ink" : "text-neg")}>{pct(cur[1], 2)}</b>
        </div>
      )}
      {width > 0 && (
        <svg width={width} height={height} role="img" aria-label="Daily returns" className="block select-none overflow-visible">
          {marks.map((v) => (
            <g key={v}>
              <line x1={0} x2={w} y1={y0 - v * scale} y2={y0 - v * scale} stroke={v === 0 ? P.ink : P.rule} strokeOpacity={v === 0 ? 0.55 : 1} />
              <text x={w + 10} y={y0 - v * scale} dy="0.35em" fontSize={11} fill={P.mute} className="tabular-nums">
                {pctAxis(v)}
              </text>
            </g>
          ))}
          {rows.map(([d, r, , partial], i) => {
            const size = Math.max(Math.abs(r) * scale, 1);
            const x = i * slot + (slot - bar) / 2;
            const top = r >= 0 ? y0 - gap / 2 - size : y0 + gap / 2;
            return (
              <g key={d}>
                <motion.rect
                  x={x}
                  width={bar}
                  rx={Math.min(1.5, bar / 4)}
                  fill={r >= 0 ? P.ink : P.brass}
                  opacity={(partial ? 0.4 : 1) * (hover == null || hover === i ? 1 : 0.55)}
                  initial={false}
                  animate={shown ? { attrY: top, height: size } : { attrY: r >= 0 ? y0 - gap / 2 : y0 + gap / 2, height: 0 }}
                  transition={reduce ? { duration: 0 } : { duration: 0.7, ease: EASE, delay: Math.min(i * 0.05, 1.2) }}
                />
                {i % labelStep === 0 && (
                  <text x={x + bar / 2} y={h + 16} textAnchor="middle" fontSize={11} fill={P.mute} className="tabular-nums">
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
  );
}

function Daily({ rec }: { rec: PerformanceRecord }) {
  const P = useChartPalette();
  const { lang } = useLanguage();
  const c = performance[lang].daily;
  const rows = rec.daily.rows.slice(-LATEST_DAYS).reverse();
  const bmax = Math.max(...rows.map((r) => Math.abs(r[1])), 1e-9);
  return (
    <div>
      <div className="grid grid-cols-[104px_minmax(0,1fr)_64px_56px] gap-x-2 border-b border-ink pb-2 text-[11px] text-mute md:text-xs">
        <span>{c.cols[0]}</span>
        <span />
        <span className="text-right">{c.cols[1]}</span>
        <span className="text-right">{c.cols[2]}</span>
      </div>
      {rows.map(([d, r, v, part], i) => (
        <div
          key={d}
          className={cn(
            "grid grid-cols-[104px_minmax(0,1fr)_64px_56px] items-center gap-x-2 py-[7px] text-[13px] tabular-nums",
            i % 2 === 0 && "bg-paper/70",
          )}
        >
          <span className={cn("pl-1", part ? "text-mute/80" : "text-ink")}>
            {utc(d, "ymd")}
            {part ? " *" : ""}
          </span>
          <span className="relative h-2.5">
            <span className="absolute inset-y-[-6px] left-1/2 w-px bg-rule-2" />
            <span
              className="absolute top-0 h-2.5 rounded-[2px]"
              style={{
                width: `${(Math.abs(r) / bmax) * 50}%`,
                left: r >= 0 ? "50%" : `${50 - (Math.abs(r) / bmax) * 50}%`,
                background: r >= 0 ? P.ink : P.brass,
                opacity: part ? 0.4 : 0.85,
              }}
            />
          </span>
          <span className={cn("text-right font-medium", r >= 0 ? "text-ink" : "text-neg")}>{pct(r)}</span>
          <span className="pr-1 text-right text-ink">{v.toFixed(3)}</span>
        </div>
      ))}
      <div className="border-t border-ink pt-2 text-[11px] text-mute/80">{c.partial}</div>
    </div>
  );
}
