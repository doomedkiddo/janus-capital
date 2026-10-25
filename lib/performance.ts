// Live performance records: Binance from binance_mm's live_web_export.py, Bitget from scripts/export_bitget_performance.py (bg-dash's data). Only ratios are published (net value, drawdown,
// returns, leverage, turnover multiples): no dollar amount, position or coin. The page fetches the file at runtime, so replacing
// the JSON under public/data/performance/ (or out/data/performance/ on the server) updates the page without a rebuild.

export type Kpi = {
  cum_return: number;
  max_dd: number;
  dd_peak: number;
  dd_trough: number;
  sharpe: number | null;
  n_days: number;
  daily_vol: number | null;
  pos_days: number;
  best_day: number;
  worst_day: number;
  lev_mean: number;
  lev_now: number;
  turnover: number;
  turnover_per_day: number;
  maker: number;
};

export type PerformanceRecord = {
  asof: number;
  since: number;
  kpi: Kpi;
  series: { cols: string[]; rows: [number, number, number][] };
  leverage: { cols: string[]; rows: [number, number, number, number][] };
  turnover: { cols: string[]; rows: [number, number][] };
  daily: { cols: string[]; rows: [number, number, number, boolean][] };
};

export type StrategyEntry = { id: string; data: string };

export const STRATEGIES: StrategyEntry[] = [
  { id: "binance", data: "/data/performance/market-making-binance.json" },
  { id: "bitget", data: "/data/performance/market-making-bitget.json" },
];

export const pct = (v: number, digits = 1, sign = true) =>
  `${sign && v > 0 ? "+" : ""}${(v * 100).toFixed(digits)}%`.replace("-", "−");

export const mult = (v: number, digits = 1) =>
  `${v.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits })}×`;

const two = (n: number) => String(n).padStart(2, "0");

/** UTC date / time from unix seconds. */
export function utc(t: number, form: "md" | "ymd" | "ymdhm" | "mdhm" = "md") {
  const d = new Date(t * 1000);
  const ymd = `${d.getUTCFullYear()}-${two(d.getUTCMonth() + 1)}-${two(d.getUTCDate())}`;
  const md = `${two(d.getUTCMonth() + 1)}-${two(d.getUTCDate())}`;
  const hm = `${two(d.getUTCHours())}:${two(d.getUTCMinutes())}`;
  if (form === "ymd") return ymd;
  if (form === "ymdhm") return `${ymd} ${hm}`;
  if (form === "mdhm") return `${md} ${hm}`;
  return md;
}
