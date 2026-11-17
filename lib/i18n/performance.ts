import type { Lang } from "./language-context";

export type PerformanceCopy = {
  overline: string;
  title: string;
  lede: string;
  asof: string;
  since: string;
  cadence: string;
  loading: string;
  failed: string;
  record: { kind: string; name: string; tags: string[]; cumSub: string };
  kpi: {
    cum: string;
    dd: [string, string];
    sharpe: [string, string];
    vol: [string, string];
    pos: [string, string];
    best: [string, string];
  };
  nav: { title: string; desc: string; dd: string; mdd: string; tooltipNav: string; tooltipDd: string };
  fringes: { title: string; desc: string; up: string; down: string };
  daily: { title: string; desc: string; cols: [string, string, string]; partial: string };
  /** captions of the two figures and the table */
  figs: [string, string, string];
  scan: string;
  notes: string[];
};

export const performance: Record<Lang, PerformanceCopy> = {
  en: {
    overline: "Live record",
    title: "Live Performance",
    lede: "The combined net value of our live market-making accounts, marked to market. Amounts are not disclosed.",
    asof: "As of {t} UTC",
    since: "Since {t} UTC",
    cadence: "synchronised daily",
    loading: "Loading the live record…",
    failed: "The live record could not be loaded. Please try again later.",
    record: {
      kind: "Live accounts · combined",
      name: "Market-Making Strategy",
      tags: ["Three live accounts", "Time-weighted", "Updated daily"],
      cumSub: "since {t}",
    },
    kpi: {
      cum: "Cumulative return",
      dd: ["Max drawdown", "{a} to {b}"],
      sharpe: ["Sharpe ratio", "daily, annualised · n = {n}"],
      vol: ["Daily volatility", "sd of daily returns"],
      pos: ["Positive days", "hit rate {w}%"],
      best: ["Best / worst day", "complete UTC days"],
    },
    nav: {
      title: "Net value",
      desc: "marked to market, open positions included",
      dd: "Drawdown from prior peak",
      mdd: "max drawdown",
      tooltipNav: "Net value",
      tooltipDd: "Drawdown",
    },
    fringes: { title: "Daily returns", desc: "one fringe per UTC day", up: "gain", down: "loss" },
    daily: { title: "Latest days", desc: "UTC days, newest first", cols: ["Date", "Return", "Net value"], partial: "* partial day" },
    figs: ["Fig. 1 · Net-value interferogram", "Fig. 2 · Daily fringes", "Table 1 · Latest days"],
    scan: "Move across the record to read it",
    notes: [
      "Three live accounts taken together. Net value from five-minute equity snapshots, open positions included: each interval's return is the accounts' summed profit over their summed equity at its start, compounded. Deposits and withdrawals change the weights, not the net value; an account counts from the moment it joins. Bitcoin held as collateral in one account is left out.",
      "Sharpe from complete UTC days, annualised by √365; the record is under a year, so returns are not annualised. Amounts are not disclosed. Times in UTC.",
      "Live account record, for information only. Past performance is not indicative of future results.",
    ],
  },
  zh: {
    overline: "实盘记录",
    title: "实盘业绩",
    lede: "实盘做市账户的合并净值，按市价计值。金额不披露。",
    asof: "截至 {t} UTC",
    since: "自 {t} UTC 起",
    cadence: "每日同步",
    loading: "正在载入实盘记录…",
    failed: "实盘记录暂时无法载入，请稍后再试。",
    record: {
      kind: "实盘账户 · 合并净值",
      name: "Market-Making 策略",
      tags: ["三个实盘账户合并", "时间加权", "每日更新"],
      cumSub: "自 {t} 起",
    },
    kpi: {
      cum: "累计收益",
      dd: ["最大回撤", "{a} → {b}"],
      sharpe: ["夏普比率", "日收益年化 · n = {n}"],
      vol: ["日波动率", "日收益标准差"],
      pos: ["正收益日", "胜率 {w}%"],
      best: ["最佳 / 最差日", "完整 UTC 日"],
    },
    nav: {
      title: "净值",
      desc: "按市价计，含未平仓头寸浮动盈亏",
      dd: "回撤 · 自前高",
      mdd: "最大回撤",
      tooltipNav: "净值",
      tooltipDd: "回撤",
    },
    fringes: { title: "逐日收益", desc: "每个 UTC 日一道条纹", up: "盈", down: "亏" },
    daily: { title: "最近各日", desc: "UTC 日，由近及远", cols: ["日期", "日收益", "期末净值"], partial: "* 不足一日" },
    figs: ["图 1 · 净值干涉图", "图 2 · 逐日条纹", "表 1 · 最近各日"],
    scan: "在记录上移动以读数",
    notes: [
      "三个实盘账户合并计算。净值取自每 5 分钟的账户权益快照（含未平仓头寸浮动盈亏）：每一段的收益 = 各账户盈亏之和 ÷ 该段起点的权益之和，逐段连乘（复利）。入金与出金只改变权重，不计入净值；账户自加入之时起计入。其中一个账户内作为保证金的比特币不计入。",
      "夏普比率以完整 UTC 日收益计算，按 √365 年化；样本不足一年，收益率不作年化。金额不披露。时间均为 UTC。",
      "以上为实盘账户记录，仅供参考；过往业绩不代表未来表现。",
    ],
  },
};
