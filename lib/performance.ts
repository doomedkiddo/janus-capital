// Live performance record: the combined net value of the live market-making accounts, written once a day by Oculus
// (`python -m oculus.ledger.composite site --out ...` in ~/JanusOculus/backend, see AGENTS.md). Only ratios are published
// (net value, drawdown, daily returns): no dollar amount, account, position or coin. The page fetches the file at runtime, so
// replacing the JSON under out/data/performance/ on the server updates the page without a rebuild.

export type Kpi = {
  cum_return: number;
  max_dd: number;
  dd_peak: number;
  dd_trough: number;
  sharpe: number | null;
  n_days: number;
  daily_vol: number | null;
  pos_days: number;
  best_day: number | null;
  worst_day: number | null;
};

export type PerformanceRecord = {
  asof: number;
  since: number;
  kpi: Kpi;
  /** hourly: unix seconds, net value (1 at the start), drawdown from the prior peak */
  series: { cols: string[]; rows: [number, number, number][] };
  /** UTC days: start, return, closing net value, partial (the record does not span the whole day) */
  daily: { cols: string[]; rows: [number, number, number, boolean][] };
};

export const RECORD_URL = "/data/performance/live.json";

/** The secondary strategy lines (Oculus `composite lines`): one record each, a rolling window of `days` days whose
 *  net value starts at 1. Same rule: ratios only. */
export type LinesFile = { days: number; lines: Record<string, PerformanceRecord> };

export const LINES_URL = "/data/performance/lines.json";

export const pct = (v: number, digits = 1, sign = true) =>
  `${sign && v > 0 ? "+" : ""}${(v * 100).toFixed(digits)}%`.replace("-", "−");

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
