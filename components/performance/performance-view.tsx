"use client";

import { useEffect, useMemo, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { performance, type StrategyCopy } from "@/lib/i18n/performance";
import { useLanguage } from "@/lib/i18n/language-context";
import { STRATEGIES, mult, pct, utc, type PerformanceRecord } from "@/lib/performance";
import { cn } from "@/lib/utils";
import { Frame, areaPath, at, linePath, ticks, useChartPalette } from "./charts";

const fmt = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));
const pctAxis = (v: number) => `${Math.round(v * 100)}%`.replace("-", "−");

export function PerformanceView({ variant = "page" }: { variant?: "page" | "home" }) {
  const { lang } = useLanguage();
  const copy = performance[lang];
  const [active, setActive] = useState(STRATEGIES[0].id);
  const [data, setData] = useState<Record<string, PerformanceRecord | "error">>({});
  const entry = STRATEGIES.find((s) => s.id === active) ?? STRATEGIES[0];
  const rec = data[entry.id];
  const home = variant === "home";

  useEffect(() => {
    if (data[entry.id]) return;
    fetch(entry.data, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j: PerformanceRecord) => setData((d) => ({ ...d, [entry.id]: j })))
      .catch(() => setData((d) => ({ ...d, [entry.id]: "error" })));
  }, [entry, data]);

  const meta = copy.strategies[entry.id];

  const tabs = STRATEGIES.length > 1 && (
    <div role="tablist" className="inline-flex rounded-full bg-paper/[0.06] p-1 ring-1 ring-paper/10">
      {STRATEGIES.map((s) => (
        <button
          key={s.id}
          role="tab"
          aria-selected={s.id === entry.id}
          onClick={() => setActive(s.id)}
          className={cn(
            "rounded-full px-6 py-2 text-sm font-medium transition-colors md:px-8",
            s.id === entry.id ? "bg-paper text-ink" : "text-paper/70 hover:text-paper",
          )}
        >
          {copy.strategies[s.id].venue}
        </button>
      ))}
    </div>
  );
  const asof = rec && rec !== "error" && (
    <p className="text-xs tabular-nums tracking-wide text-paper/50 md:text-sm">
      {fmt(copy.asof, { t: utc(rec.asof, "ymdhm") })}
      <span className="mx-2 text-accent-2">·</span>
      {fmt(copy.since, { t: utc(rec.since, "ymdhm"), note: meta.sinceNote })}
    </p>
  );

  return (
    <div className="bg-paper">
      {home ? (
        <div className="bg-ink px-4 pb-24 pt-4 text-paper md:px-6 md:pb-32 md:pt-6">
          <div className="mx-auto grid max-w-7xl gap-10 border-t border-paper/10 pt-14 md:grid-cols-[1.3fr_1fr] md:items-end md:pt-20">
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
              {tabs}
              {asof}
            </BlurFade>
          </div>
        </div>
      ) : (
        <div className="bg-ink px-4 pb-20 pt-20 text-center text-paper md:px-6 md:pb-28 md:pt-28">
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
              {tabs}
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
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-2">{meta.kind}</p>
                <h3 className="mt-3 headline text-3xl leading-tight text-ink md:text-[2.6rem]">
                  {meta.name}
                  <span className="mt-1 block font-display text-base font-semibold tracking-wide text-ink-3 md:ml-3 md:mt-0 md:inline md:align-middle md:text-lg">
                    <span className="hidden md:inline">· </span>
                    {meta.venue}
                  </span>
                </h3>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {meta.tags.map((t) => (
                  <span key={t} className="rounded-full border border-ink-3/20 px-3.5 py-1.5 text-xs font-medium text-ink-3">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {rec === undefined && <p className="mt-10 text-sm text-mute">{copy.loading}</p>}
            {rec === "error" && <p className="mt-10 text-sm text-neg">{copy.failed}</p>}
            {rec && rec !== "error" && <Kpis rec={rec} meta={meta} />}
          </div>
        </BlurFade>

        {rec && rec !== "error" && <Body key={entry.id} rec={rec} meta={meta} notes={[...meta.notes, ...copy.notes]} />}
      </div>
    </div>
  );
}

function Kpis({ rec, meta }: { rec: PerformanceRecord; meta: StrategyCopy }) {
  const { lang } = useLanguage();
  const c = performance[lang].kpi;
  const k = rec.kpi;
  const items: { label: string; value: React.ReactNode; sub: string; tone?: "neg" }[] = [
    { label: c.cum, value: pct(k.cum_return), sub: meta.cumSub },
    { label: c.dd[0], value: pct(k.max_dd), sub: fmt(c.dd[1], { a: utc(k.dd_peak), b: utc(k.dd_trough) }), tone: "neg" },
    { label: c.sharpe[0], value: k.sharpe?.toFixed(2) ?? "—", sub: fmt(c.sharpe[1], { n: k.n_days }) },
    { label: c.vol[0], value: k.daily_vol == null ? "—" : pct(k.daily_vol, 1, false), sub: c.vol[1] },
    { label: c.pos[0], value: `${k.pos_days} / ${k.n_days}`, sub: fmt(c.pos[1], { w: Math.round((100 * k.pos_days) / Math.max(k.n_days, 1)) }) },
    {
      label: c.best[0],
      value: (
        <>
          {pct(k.best_day)} <span className="text-neg">/ {pct(k.worst_day)}</span>
        </>
      ),
      sub: c.best[1],
    },
    { label: c.lev[0], value: mult(k.lev_mean), sub: fmt(c.lev[1], { c: mult(k.lev_now) }) },
    { label: c.turn[0], value: mult(k.turnover_per_day, 0), sub: fmt(c.turn[1], { c: mult(k.turnover, 0) }) },
  ];
  return (
    <div className="mt-10 grid grid-cols-2 border-t border-ink lg:grid-cols-4">
      {items.map((it, i) => (
        <div
          key={it.label}
          className={cn(
            "border-b border-rule py-5 pr-3 md:py-7",
            i % 2 === 1 && "pl-4 md:pl-6 border-l",
            i % 4 !== 0 && "lg:border-l lg:pl-6",
            i % 4 === 0 && "lg:border-l-0 lg:pl-0",
          )}
        >
          <p className="text-xs text-mute md:text-sm">{it.label}</p>
          <p
            className={cn(
              "mt-2 font-display font-semibold tabular-nums tracking-tight",
              i === 5 ? "text-xl md:text-[1.7rem]" : "text-2xl md:text-[2.1rem]",
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

function Card({ title, desc, children, className }: { title: string; desc?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[28px] bg-paper-2 p-5 ring-1 ring-rule md:p-8", className)}>
      <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="headline text-xl text-ink md:text-2xl">{title}</h3>
        {desc && <span className="text-xs text-mute md:text-sm">{desc}</span>}
      </div>
      {children}
    </div>
  );
}

function Body({ rec, meta, notes }: { rec: PerformanceRecord; meta: StrategyCopy; notes: string[] }) {
  const P = useChartPalette();
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
  const ddLo = Math.min(...rows.map((r) => r[2])) * 1.15;
  const lev = rec.leverage.rows;
  const levHi = Math.max(...lev.map((r) => r[3])) * 1.1;
  const turn = rec.turnover.rows;
  const turnHi = turn[turn.length - 1][1] * 1.18;
  const nDays = (t1 - t0) / 86400;
  const step = nDays > 16 ? 2 : 1;
  const hi = hover == null ? null : rows[at(rows, hover)];
  const last = rows[rows.length - 1];
  const iPeak = at(rows, k.dd_peak);
  const iTrough = at(rows, k.dd_trough);

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
                        <stop offset="0%" stopColor={P.forest2} stopOpacity={0.28} />
                        <stop offset="100%" stopColor={P.forest2} stopOpacity={0.02} />
                      </linearGradient>
                    </defs>
                    <rect x={xp} y={0} width={Math.max(xt - xp, 1)} height={h} fill={P.claret} opacity={0.06} />
                    <path d={areaPath(pts, h)} fill="url(#navFill)" />
                    <path
                      d={linePath(rows.map((r, i) => [x(r[0]), y(nav.peak[i])]))}
                      fill="none"
                      stroke={P.brass}
                      strokeWidth={1}
                      strokeDasharray="1.5 3"
                      opacity={0.8}
                    />
                    <line x1={0} x2={x(t1)} y1={y(1)} y2={y(1)} stroke={P.ink} strokeOpacity={0.5} />
                    <path d={linePath(pts)} fill="none" stroke={P.forest} strokeWidth={1.6} strokeLinejoin="round" />
                    <circle cx={xp} cy={y(rows[iPeak][1])} r={4} fill="#fff" stroke={P.claret} strokeWidth={1.3} />
                    <circle cx={xt} cy={y(rows[iTrough][1])} r={4} fill="#fff" stroke={P.claret} strokeWidth={1.3} />
                    <text x={(xp + xt) / 2} y={12} textAnchor="middle" fontSize={12} fontWeight={600} fill={P.claret}>
                      {copy.nav.mdd} {pct(k.max_dd)}
                    </text>
                    <circle cx={x(last[0])} cy={y(last[1])} r={5} fill={P.brass} stroke="#fff" strokeWidth={1.5} />
                    <text x={x(last[0]) - 8} y={y(last[1]) - 10} textAnchor="end" fontSize={14} fontWeight={600} fill={P.ink} className="tabular-nums">
                      {last[1].toFixed(3)}
                    </text>
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
        <BlurFade className="lg:col-span-5">
          <Card title={copy.daily.title} desc={copy.daily.desc} className="h-full">
            <Daily rec={rec} />
          </Card>
        </BlurFade>
        <div className="space-y-6 lg:col-span-7">
          <BlurFade>
            <Card title={copy.lev.title} desc={`${meta.levDesc} · ${copy.lev.mean} ${mult(k.lev_mean)}`}>
              <Frame t0={t0} t1={t1} lo={0} hi={levHi} height={200} yTicks={ticks(0, levHi, 3)} yFormat={(v) => `${v}×`} dayStep={2 * step} ariaLabel={copy.lev.title}>
                {({ x, y }) => {
                  const band = [...lev.map((r) => [x(r[0]), y(r[3])] as [number, number]), ...[...lev].reverse().map((r) => [x(r[0]), y(r[2])] as [number, number])];
                  return (
                    <>
                      <path d={`${linePath(band)}Z`} fill={P.wash} />
                      <path d={linePath(lev.map((r) => [x(r[0]), y(r[1])]))} fill="none" stroke={P.forest} strokeWidth={1.1} />
                      <line x1={0} x2={x(t1)} y1={y(k.lev_mean)} y2={y(k.lev_mean)} stroke={P.brass} strokeWidth={1.2} strokeDasharray="4 3" />
                    </>
                  );
                }}
              </Frame>
            </Card>
          </BlurFade>
          <BlurFade>
            <Card title={copy.turn.title} desc={meta.turnDesc}>
              <Frame t0={t0} t1={t1} lo={0} hi={turnHi} height={200} yTicks={ticks(0, turnHi, 3)} yFormat={(v) => `${v.toLocaleString("en-US")}×`} dayStep={2 * step} ariaLabel={copy.turn.title}>
                {({ x, y, h }) => {
                  const pts = turn.map((r) => [x(r[0]), y(r[1])] as [number, number]);
                  const e = turn[turn.length - 1];
                  return (
                    <>
                      <path d={areaPath(pts, h)} fill={P.wash} opacity={0.8} />
                      <path d={linePath(pts)} fill="none" stroke={P.forest} strokeWidth={1.5} />
                      <circle cx={x(e[0])} cy={y(e[1])} r={4.5} fill={P.brass} stroke="#fff" strokeWidth={1.3} />
                      <text x={x(e[0]) - 8} y={y(e[1]) - 8} textAnchor="end" fontSize={13} fontWeight={600} fill={P.ink} className="tabular-nums">
                        {mult(e[1], 0)}
                      </text>
                    </>
                  );
                }}
              </Frame>
            </Card>
          </BlurFade>
        </div>
      </div>

      <BlurFade>
        <div className="rounded-[28px] bg-ink p-6 text-[13px] leading-relaxed text-ink-soft md:p-8">
          <ol className="grid gap-4 md:grid-cols-3 md:gap-8">
            {notes.map((n, i) => (
              <li key={i} className="flex gap-3">
                <span className="headline text-accent">{i + 1}</span>
                <span>{fmt(n, { m: k.maker.toFixed(1) })}</span>
              </li>
            ))}
          </ol>
        </div>
      </BlurFade>
    </div>
  );
}

function Daily({ rec }: { rec: PerformanceRecord }) {
  const P = useChartPalette();
  const { lang } = useLanguage();
  const c = performance[lang].daily;
  const rows = rec.daily.rows;
  const bmax = Math.max(...rows.map((r) => Math.abs(r[1])));
  return (
    <div>
      <div className="grid grid-cols-[112px_minmax(0,1fr)_68px_60px] gap-x-2 border-b border-ink pb-2 text-[11px] text-mute md:text-xs">
        <span>{c.cols[0]}</span>
        <span />
        <span className="text-right">{c.cols[1]}</span>
        <span className="text-right">{c.cols[2]}</span>
      </div>
      {rows.map(([d, r, v, part], i) => (
        <div
          key={d}
          className={cn(
            "grid grid-cols-[112px_minmax(0,1fr)_68px_60px] gap-x-2 items-center py-[7px] text-[13px] tabular-nums",
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
                background: r >= 0 ? P.forest : P.claret,
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
