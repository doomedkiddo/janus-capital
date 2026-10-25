"use client";

import { useEffect, useMemo, useState } from "react";
import { BlurFade } from "@/components/ui/blur-fade";
import { performance } from "@/lib/i18n/performance";
import { useLanguage } from "@/lib/i18n/language-context";
import { STRATEGIES, mult, pct, utc, type PerformanceRecord } from "@/lib/performance";
import { cn } from "@/lib/utils";
import { Frame, P, areaPath, at, linePath, ticks } from "./charts";

const fmt = (s: string, v: Record<string, string | number>) => s.replace(/\{(\w+)\}/g, (_, k) => String(v[k] ?? ""));
const pctAxis = (v: number) => `${Math.round(v * 100)}%`.replace("-", "−");

export function PerformanceView() {
  const { lang } = useLanguage();
  const copy = performance[lang];
  const [active, setActive] = useState(STRATEGIES[0].id);
  const [data, setData] = useState<Record<string, PerformanceRecord | "error">>({});
  const entry = STRATEGIES.find((s) => s.id === active) ?? STRATEGIES[0];
  const rec = data[entry.id];

  useEffect(() => {
    if (data[entry.id]) return;
    fetch(entry.data, { cache: "no-cache" })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j: PerformanceRecord) => setData((d) => ({ ...d, [entry.id]: j })))
      .catch(() => setData((d) => ({ ...d, [entry.id]: "error" })));
  }, [entry, data]);

  const meta = copy.strategies[entry.id];

  return (
    <main className="bg-[#f4efe4]">
      <section className="relative overflow-hidden bg-[#0f211b] px-4 pb-20 pt-20 text-center md:px-6 md:pb-28 md:pt-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 55% at 50% 0%, rgba(180,138,60,0.22), transparent 70%), radial-gradient(40% 40% at 85% 90%, rgba(47,102,82,0.45), transparent 70%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: "linear-gradient(#f4efe4 1px, transparent 1px), linear-gradient(90deg, #f4efe4 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage: "radial-gradient(70% 70% at 50% 40%, #000, transparent)",
            WebkitMaskImage: "radial-gradient(70% 70% at 50% 40%, #000, transparent)",
          }}
        />
        <div className="relative mx-auto max-w-4xl">
          <BlurFade>
            <span className="inline-flex items-center gap-2 rounded-full border border-[#b48a3c]/40 bg-white/[0.04] px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#d8bf8a]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-[#d8bf8a]" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#d8bf8a]" />
              </span>
              {copy.overline}
            </span>
          </BlurFade>
          <BlurFade delay={0.08}>
            <h1 className="mt-7 font-serif text-5xl leading-[1.05] text-[#f4efe4] sm:text-6xl md:text-8xl">{copy.title}</h1>
          </BlurFade>
          <BlurFade delay={0.16}>
            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#c9d3cc] md:text-lg">{copy.lede}</p>
          </BlurFade>
          {rec && rec !== "error" && (
            <BlurFade delay={0.24}>
              <p className="mt-8 text-xs tabular-nums tracking-wide text-[#8fa69a] md:text-sm">
                {fmt(copy.asof, { t: utc(rec.asof, "ymdhm") })}
                <span className="mx-2 text-[#b48a3c]">·</span>
                {fmt(copy.since, { t: utc(rec.since, "ymdhm") })}
              </p>
            </BlurFade>
          )}
        </div>
      </section>

      <div className="relative mx-auto -mt-10 max-w-7xl px-4 pb-20 md:-mt-14 md:px-6 md:pb-28">
        {STRATEGIES.length > 1 && (
          <div className="mb-5 flex flex-wrap justify-center gap-2">
            {STRATEGIES.map((s) => (
              <button
                key={s.id}
                onClick={() => setActive(s.id)}
                className={cn(
                  "rounded-full px-5 py-2 text-sm font-medium transition-colors",
                  s.id === entry.id ? "bg-[#f4efe4] text-[#13241e]" : "bg-white/10 text-[#c9d3cc] hover:bg-white/20",
                )}
              >
                {copy.strategies[s.id]?.name ?? s.id}
              </button>
            ))}
          </div>
        )}

        <BlurFade>
          <div className="rounded-[28px] bg-[#fbf8f1] p-6 shadow-[0_30px_80px_-40px_rgba(15,33,27,0.55)] ring-1 ring-[#e6e0d2] md:p-10">
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b48a3c]">{meta.kind}</p>
                <h2 className="mt-3 font-serif text-3xl leading-tight text-[#13241e] md:text-[2.6rem]">{meta.name}</h2>
              </div>
              <div className="flex flex-wrap gap-2 md:justify-end">
                {meta.tags.map((t) => (
                  <span key={t} className="rounded-full border border-[#1f4a3c]/20 px-3.5 py-1.5 text-xs font-medium text-[#1f4a3c]">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            {rec === undefined && <p className="mt-10 text-sm text-[#7c827a]">{copy.loading}</p>}
            {rec === "error" && <p className="mt-10 text-sm text-[#a3375a]">{copy.failed}</p>}
            {rec && rec !== "error" && <Kpis rec={rec} />}
          </div>
        </BlurFade>

        {rec && rec !== "error" && <Body rec={rec} />}
      </div>
    </main>
  );
}

function Kpis({ rec }: { rec: PerformanceRecord }) {
  const { lang } = useLanguage();
  const c = performance[lang].kpi;
  const k = rec.kpi;
  const items: { label: string; value: React.ReactNode; sub: string; tone?: "neg" }[] = [
    { label: c.cum[0], value: pct(k.cum_return), sub: c.cum[1] },
    { label: c.dd[0], value: pct(k.max_dd), sub: fmt(c.dd[1], { a: utc(k.dd_peak), b: utc(k.dd_trough) }), tone: "neg" },
    { label: c.sharpe[0], value: k.sharpe?.toFixed(2) ?? "—", sub: fmt(c.sharpe[1], { n: k.n_days }) },
    { label: c.vol[0], value: k.daily_vol == null ? "—" : pct(k.daily_vol, 1, false), sub: c.vol[1] },
    { label: c.pos[0], value: `${k.pos_days} / ${k.n_days}`, sub: fmt(c.pos[1], { w: Math.round((100 * k.pos_days) / Math.max(k.n_days, 1)) }) },
    {
      label: c.best[0],
      value: (
        <>
          {pct(k.best_day)} <span className="text-[#a3375a]">/ {pct(k.worst_day)}</span>
        </>
      ),
      sub: c.best[1],
    },
    { label: c.lev[0], value: mult(k.lev_mean), sub: fmt(c.lev[1], { c: mult(k.lev_now) }) },
    { label: c.turn[0], value: mult(k.turnover_per_day, 0), sub: fmt(c.turn[1], { c: mult(k.turnover, 0) }) },
  ];
  return (
    <div className="mt-10 grid grid-cols-2 border-t border-[#13241e] lg:grid-cols-4">
      {items.map((it, i) => (
        <div
          key={it.label}
          className={cn(
            "border-b border-[#e6e0d2] py-5 pr-3 md:py-7",
            i % 2 === 1 && "pl-4 md:pl-6 border-l",
            i % 4 !== 0 && "lg:border-l lg:pl-6",
            i % 4 === 0 && "lg:border-l-0 lg:pl-0",
          )}
        >
          <p className="text-xs text-[#7c827a] md:text-sm">{it.label}</p>
          <p
            className={cn(
              "mt-2 font-display font-semibold tabular-nums tracking-tight",
              i === 5 ? "text-xl md:text-[1.7rem]" : "text-2xl md:text-[2.1rem]",
              it.tone === "neg" ? "text-[#a3375a]" : "text-[#13241e]",
            )}
          >
            {it.value}
          </p>
          <p className="mt-1.5 text-[11px] text-[#9a9e95] md:text-xs">{it.sub}</p>
        </div>
      ))}
    </div>
  );
}

function Card({ title, desc, children, className }: { title: string; desc?: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("rounded-[28px] bg-[#fbf8f1] p-5 ring-1 ring-[#e6e0d2] md:p-8", className)}>
      <div className="mb-5 flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="font-serif text-xl text-[#13241e] md:text-2xl">{title}</h3>
        {desc && <span className="text-xs text-[#7c827a] md:text-sm">{desc}</span>}
      </div>
      {children}
    </div>
  );
}

function Body({ rec }: { rec: PerformanceRecord }) {
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
            <div className="pointer-events-none absolute left-0 top-0 z-10 min-h-[44px] text-xs tabular-nums text-[#5d655e]">
              {hi && (
                <div className="rounded-xl bg-white/90 px-3 py-2 shadow-sm ring-1 ring-[#e6e0d2]">
                  <div className="text-[#7c827a]">{utc(hi[0], "ymdhm")} UTC</div>
                  <div className="mt-0.5">
                    {copy.nav.tooltipNav} <b className="text-[#13241e]">{hi[1].toFixed(3)}</b>
                    <span className="mx-1.5 text-[#cfc8b8]">|</span>
                    {copy.nav.tooltipDd} <b className="text-[#a3375a]">{pct(hi[2])}</b>
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
            <Card title={copy.lev.title} desc={`${copy.lev.desc} · ${copy.lev.mean} ${mult(k.lev_mean)}`}>
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
            <Card title={copy.turn.title} desc={copy.turn.desc}>
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
        <div className="rounded-[28px] bg-[#0f211b] p-6 text-[13px] leading-relaxed text-[#b8c5bd] md:p-8">
          <ol className="grid gap-4 md:grid-cols-3 md:gap-8">
            {copy.notes.map((n, i) => (
              <li key={i} className="flex gap-3">
                <span className="font-serif text-[#d8bf8a]">{i + 1}</span>
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
  const { lang } = useLanguage();
  const c = performance[lang].daily;
  const rows = rec.daily.rows;
  const bmax = Math.max(...rows.map((r) => Math.abs(r[1])));
  return (
    <div>
      <div className="grid grid-cols-[112px_minmax(0,1fr)_68px_60px] gap-x-2 border-b border-[#13241e] pb-2 text-[11px] text-[#7c827a] md:text-xs">
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
            i % 2 === 0 && "bg-[#f4efe4]/70",
          )}
        >
          <span className={cn("pl-1", part ? "text-[#9a9e95]" : "text-[#13241e]")}>
            {utc(d, "ymd")}
            {part ? " *" : ""}
          </span>
          <span className="relative h-2.5">
            <span className="absolute inset-y-[-6px] left-1/2 w-px bg-[#cfc8b8]" />
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
          <span className={cn("text-right font-medium", r >= 0 ? "text-[#13241e]" : "text-[#a3375a]")}>{pct(r)}</span>
          <span className="pr-1 text-right text-[#13241e]">{v.toFixed(3)}</span>
        </div>
      ))}
      <div className="border-t border-[#13241e] pt-2 text-[11px] text-[#9a9e95]">{c.partial}</div>
    </div>
  );
}
