import type { Lang } from "./language-context";

export type PerformanceCopy = {
  overline: string;
  title: string;
  lede: string;
  asof: string;
  since: string;
  loading: string;
  failed: string;
  strategies: Record<string, { name: string; kind: string; tags: string[] }>;
  kpi: {
    cum: [string, string];
    dd: [string, string];
    sharpe: [string, string];
    vol: [string, string];
    pos: [string, string];
    best: [string, string];
    lev: [string, string];
    turn: [string, string];
  };
  nav: { title: string; desc: string; dd: string; mdd: string; peak: string; tooltipNav: string; tooltipDd: string };
  daily: { title: string; desc: string; cols: [string, string, string]; partial: string };
  lev: { title: string; desc: string; mean: string };
  turn: { title: string; desc: string };
  notes: string[];
};

export const performance: Record<Lang, PerformanceCopy> = {
  en: {
    overline: "Live record",
    title: "Live Performance",
    lede: "Every figure below comes from the exchange's own trade records on a live account, marked to market. Amounts are not disclosed.",
    asof: "As of {t} UTC",
    since: "Since {t} UTC (last restart)",
    loading: "Loading the live record…",
    failed: "The live record could not be loaded. Please try again later.",
    strategies: {
      "market-making": {
        name: "Market-Making Strategy",
        kind: "High-frequency maker",
        tags: ["USDT-margined perpetuals", "Passive execution"],
      },
    },
    kpi: {
      cum: ["Cumulative return", "since restart"],
      dd: ["Max drawdown", "{a} to {b}"],
      sharpe: ["Sharpe ratio", "daily, annualised · n = {n}"],
      vol: ["Daily volatility", "sd of daily returns"],
      pos: ["Positive days", "hit rate {w}%"],
      best: ["Best / worst day", "complete UTC days"],
      lev: ["Average leverage", "now {c}"],
      turn: ["Daily turnover", "cumulative {c}"],
    },
    nav: {
      title: "Net value",
      desc: "marked to market, open positions included",
      dd: "Drawdown from prior peak",
      mdd: "max drawdown",
      peak: "peak",
      tooltipNav: "Net value",
      tooltipDd: "Drawdown",
    },
    daily: { title: "Daily performance", desc: "UTC days", cols: ["Date", "Return", "Net value"], partial: "* partial day" },
    lev: { title: "Leverage", desc: "gross position ÷ equity, hourly mean and range", mean: "mean" },
    turn: { title: "Cumulative turnover", desc: "notional ÷ starting equity" },
    notes: [
      "Net value marked to market (open positions included), 1 = equity at the restart, not compounded; order size was raised twice (Oct 15, Oct 18).",
      "Sharpe from complete UTC days, annualised by √365; the record is under a year, so returns are not annualised. Passive fills {m}%. Amounts not disclosed. Times in UTC.",
      "Live account record, for information only. Past performance is not indicative of future results.",
    ],
  },
  zh: {
    overline: "实盘记录",
    title: "实盘业绩",
    lede: "以下数据均来自实盘账户在交易所的成交记录，按市价计值。金额不披露。",
    asof: "截至 {t} UTC",
    since: "自 {t} UTC 起（最近一次重启）",
    loading: "正在载入实盘记录…",
    failed: "实盘记录暂时无法载入，请稍后再试。",
    strategies: {
      "market-making": {
        name: "Market-Making 策略",
        kind: "高频做市",
        tags: ["USDT 本位永续合约", "全挂单执行"],
      },
    },
    kpi: {
      cum: ["累计收益", "自重启以来"],
      dd: ["最大回撤", "{a} → {b}"],
      sharpe: ["夏普比率", "日收益年化 · n = {n}"],
      vol: ["日波动率", "日收益标准差"],
      pos: ["正收益日", "胜率 {w}%"],
      best: ["最佳 / 最差日", "完整 UTC 日"],
      lev: ["平均杠杆", "当前 {c}"],
      turn: ["日均换手", "累计 {c}"],
    },
    nav: {
      title: "净值",
      desc: "按市价计，含未平仓头寸浮动盈亏",
      dd: "回撤 · 自前高",
      mdd: "最大回撤",
      peak: "前高",
      tooltipNav: "净值",
      tooltipDd: "回撤",
    },
    daily: { title: "逐日表现", desc: "UTC 日", cols: ["日期", "日收益", "期末净值"], partial: "* 不足一日" },
    lev: { title: "持仓杠杆", desc: "总持仓名义 ÷ 权益，小时均值与区间", mean: "均值" },
    turn: { title: "累计换手", desc: "成交额 ÷ 起始权益" },
    notes: [
      "净值按市价计（含未平仓头寸浮动盈亏），以重启时权益为 1，不复投；期间两次上调单笔规模（10-15、10-18）。",
      "夏普比率以完整 UTC 日收益计算，按 √365 年化；样本不足一年，收益率不作年化。挂单成交占 {m}%。金额不披露。时间均为 UTC。",
      "以上为实盘账户记录，仅供参考；过往业绩不代表未来表现。",
    ],
  },
};
