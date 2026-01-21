import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Check,
  Crown,
  Download,
  Github,
  Landmark,
  Layers,
  Linkedin,
  ShieldCheck,
  Twitter,
  Zap,
} from "lucide-react";

const translations = {
  en: {
    nav: {
      about: "About",
      team: "Team",
      strategy: "Strategy",
      cta: "Connect",
    },
    hero: {
      tagline: "Empowering the Future of Crypto Trading",
      title1: "DECODING THE",
      title2: "DIGITAL FRONTIER",
      subtitle: "",
      ctaPrimary: "Explore Strategies",
      ctaSecondary: "Read Whitepaper",
      ticker:
        "Liquidity • Market Making • Stat Arb • DeFi • HFT • AI Signals • Options",
      scroll: "Scroll",
    },
    stats: [
      { value: "10ms", label: "Execution Latency" },
      { value: "24/7", label: "Market Liquidity" },
      { value: "200+", label: "Trading Pairs" },
    ],
    overview: {
      title1: "CORE",
      title2: "SYSTEMS",
      subtitle:
        "A modular trading stack built for speed, resilience, and adaptive intelligence.",
      items: [
        {
          title: "Execution Engine",
          desc: "Microstructure-aware routing with millisecond-level responsiveness.",
          tag: "Ultra-Low Latency",
        },
        {
          title: "Research Lab",
          desc: "Multi-factor, transformer, and RL research pipelines at scale.",
          tag: "AI Alpha",
        },
        {
          title: "Risk Control",
          desc: "Real-time exposure, inventory, and venue health monitoring.",
          tag: "Kill-Switch",
        },
        {
          title: "Data Mesh",
          desc: "Multi-venue feeds with deep historical archives for replay.",
          tag: "Petabyte-Ready",
        },
        {
          title: "Liquidity Network",
          desc: "Cross-venue optimization across CeFi and DeFi liquidity pools.",
          tag: "24/7",
        },
      ],
    },
    dashboard: {
      title1: "REAL-TIME",
      title2: "MONITORING",
      subtitle: "Multi-venue surveillance, risk overlays, and live execution telemetry.",
    },
    team: {
      title1: "ELITE",
      title2: "PEDIGREE",
      subtitle:
        "Our team brings together veterans from the world's most sophisticated quantitative trading firms and hedge funds. We combine traditional finance rigor with crypto-native agility. All members are 985+ or equivalent.",
      members: [
        { name: "Ricky", role: "Founder • Alfa1 PM • 20M USDT AUM" },
        { name: "Li Qi", role: "CICC" },
        { name: "Louise Lee", role: "Optiver Senior Dev" },
        { name: "Peter", role: "Former QRT Quant Researcher" },
        { name: "ZY", role: "A Top 10B RMB Hedge Fund • Senior Portfolio Optimization Expert" },
        { name: "Evan", role: "High-Frequency Market Making" },
      ],
    },
    strategy: {
      title1: "SYSTEMATIC",
      title2: "PRECISION",
      subtitle:
        "We don't bet on hype. We trade on data. Our proprietary algorithms analyze millions of data points every second to execute trades with surgical accuracy.",
      feed: "Live Strategy Feed",
      items: [
        {
          title: "Multi-Factor + Transformer High-Dimensional Stat Arb",
          desc:
            "Multi-factor and transformer-driven high-dimensional statistical arbitrage across decentralized and centralized exchanges.",
        },
        {
          title: "Cross-Sectional Strategy",
          desc:
            "Factor-driven selection across baskets to harvest relative value signals.",
        },
        {
          title: "Time Series",
          desc:
            "Momentum and mean-reversion frameworks tuned for 24/7 crypto markets.",
        },
        {
          title: "Reinforcement Learning Market Making",
          desc:
            "Adaptive quoting with RL agents optimizing spread and inventory risk.",
        },
        {
          title: "Polymarket Market Making",
          desc:
            "Liquidity provision and pricing for prediction markets with tight risk controls.",
        },
      ],
    },
    infrastructure: {
      title1: "GLOBAL",
      title2: "INFRA",
      subtitle:
        "Always-on infrastructure with geographically distributed systems and layered controls.",
      stats: [
        { label: "Colocation Sites", value: "6+" },
        { label: "Risk Checks / Sec", value: "120K" },
        { label: "Venue Connections", value: "6+" },
      ],
      steps: [
        "Signal ingestion & normalization",
        "Clustered outlier selection",
        "Adaptive execution & hedging",
        "Post-trade analytics & risk review",
      ],
    },
    footer: "© 2026 Janus Capital. All Rights Reserved.",
  },
  zh: {
    nav: {
      about: "关于我们",
      team: "团队",
      strategy: "策略",
      cta: "联系",
    },
    hero: {
      tagline: "驱动未来的加密交易",
      title1: "DECODING THE",
      title2: "DIGITAL FRONTIER",
      subtitle: "",
      ctaPrimary: "查看策略",
      ctaSecondary: "阅读白皮书",
      ticker: "流动性 • 做市 • 统计套利 • DeFi • 高频 • AI信号 • 期权",
      scroll: "下滑",
    },
    stats: [
      { value: "10ms", label: "执行延迟" },
      { value: "24/7", label: "市场流动性" },
      { value: "200+", label: "交易对" },
    ],
    overview: {
      title1: "核心",
      title2: "系统",
      subtitle: "为速度、稳定性与智能适配构建的模块化交易体系。",
      items: [
        {
          title: "执行引擎",
          desc: "微观结构感知的路由系统，毫秒级响应。",
          tag: "超低延迟",
        },
        {
          title: "研究实验室",
          desc: "多因子、Transformer 与强化学习研究流水线。",
          tag: "AI Alpha",
        },
        {
          title: "风险控制",
          desc: "实时暴露、库存与交易场所健康监测。",
          tag: "一键熔断",
        },
        {
          title: "数据网格",
          desc: "多交易所数据流 + 深度历史回放。",
          tag: "PB 级",
        },
        {
          title: "流动性网络",
          desc: "跨 CeFi 与 DeFi 的最优流动性调度。",
          tag: "7x24",
        },
      ],
    },
    dashboard: {
      title1: "实时",
      title2: "监控",
      subtitle: "多交易所监控、风控覆盖与实时执行遥测。",
    },
    team: {
      title1: "顶级",
      title2: "履历",
      subtitle:
        "团队成员来自全球顶尖量化交易机构与对冲基金，融合传统金融严谨与加密原生效率。全员985以上及同等学力。",
      members: [
        { name: "Ricky", role: "创始人 · Alfa1 PM · 2000万USDT AUM" },
        { name: "Li Qi", role: "中金（CICC）" },
        { name: "Louise Lee", role: "Optiver 资深开发" },
        { name: "Peter", role: "前 QRT 量化研究员" },
        { name: "ZY", role: "某百亿私募 · 资深组合优化专家" },
        { name: "Evan", role: "高频做市（MM）" },
      ],
    },
    strategy: {
      title1: "系统化",
      title2: "精度",
      subtitle:
        "不靠情绪交易，依靠数据。自研算法每秒解析数百万数据点，以外科手术式精度执行。",
      feed: "实时策略流",
      items: [
        {
          title: "多因子+Transformer高维统计套利",
          desc: "进行聚类并交易离群币对。",
        },
        {
          title: "截面策略",
          desc: "基于因子框架进行跨标的优选与相对价值捕捉。",
        },
        {
          title: "时序策略",
          desc: "面向 7x24 市场的动量与均值回归体系。",
        },
        {
          title: "强化学习做市",
          desc: "RL 智能体自适应报价，优化点差与库存风险。",
        },
        {
          title: "Polymarket 做市",
          desc: "在预测市场提供流动性，配合严格风控模型。",
        },
      ],
    },
    infrastructure: {
      title1: "全球",
      title2: "基建",
      subtitle: "全天候基础设施，分布式部署与分层风控。",
      stats: [
        { label: "机房节点", value: "6+" },
        { label: "风险校验/秒", value: "120K" },
        { label: "交易所连接", value: "6+" },
      ],
      steps: ["信号接入与规范化", "聚类筛选离群币对", "自适应执行与对冲", "复盘与风险复核"],
    },
    footer: "© 2026 Janus Capital. 保留所有权利。",
  },
};

const teamAvatars = [
  "/avatars/ricky.svg",
  "/avatars/liqi.svg",
  "/avatars/rainie.svg",
  "/avatars/peter.svg",
  "/avatars/zy.svg",
  "/avatars/evan.svg",
];

const teamIcons = [Crown, Landmark, BarChart3, ShieldCheck, Layers, Zap];
const teamIconColors = [
  "text-blue-400",
  "text-navy-400",
  "text-silver-400",
  "text-blue-400",
  "text-navy-400",
  "text-silver-400",
];

const overviewSpan = [
  "md:col-span-2",
  "",
  "",
  "md:col-span-2",
  "",
];

const statGlow = ["text-blue-400", "text-silver-300", "text-blue-400", "text-silver-300"];

const strategyBadgeColors = [
  "bg-navy-600/30 text-blue-400 border border-navy-500/40",
  "bg-blue-600/20 text-blue-300 border border-blue-500/30",
  "bg-silver-700/25 text-silver-300 border border-silver-600/30",
  "bg-navy-600/30 text-blue-400 border border-navy-500/40",
  "bg-blue-600/20 text-blue-300 border border-blue-500/30",
];

const dashboardImages = [
  "/Weixin%20Image_20260121134544_73_366.jpg",
  "/Weixin%20Image_20260121134547_74_366.jpg",
  "/Weixin%20Image_20260121134553_75_366.jpg",
];

const App = () => {
  const [lang, setLang] = useState("zh");
  const copy = useMemo(() => translations[lang], [lang]);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const cursorGlow = document.getElementById("cursor-glow");
    if (prefersReducedMotion || !cursorGlow) {
      return;
    }

    const handleMove = (event) => {
      cursorGlow.style.left = `${event.clientX}px`;
      cursorGlow.style.top = `${event.clientY}px`;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div className="relative">
      <div className="fixed inset-0 bg-grid pointer-events-none -z-10 grid-drift" />
      <div className="fixed inset-0 bg-circuit pointer-events-none -z-10 opacity-40 grid-drift" />
      <div className="fixed inset-0 mesh-gradient pointer-events-none -z-10" />
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-navy-600/15 blur-[120px] rounded-full -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full -z-10" />
      <div className="fixed top-[20%] right-[10%] w-64 h-64 bg-silver-500/8 blur-[100px] rounded-full -z-10 animate-pulse-soft" />
      <div className="fixed bottom-[15%] left-[8%] w-48 h-48 bg-navy-500/12 blur-[80px] rounded-full -z-10 animate-float-slow" />
      <div id="cursor-glow" className="fixed pointer-events-none -z-10" />

      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center p-6">
        <div className="glass inner-highlight max-w-7xl w-full px-6 py-4 rounded-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-navy-800 flex items-center justify-center rounded-xl border border-silver-800 brand-glow">
              <img
                src="/logo.png"
                alt="Janus Capital logo"
                className="w-9 h-9 object-contain"
              />
            </div>
            <span className="font-display text-xl font-bold tracking-tighter uppercase text-silver-100">
              Janus Capital
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-silver-400 uppercase tracking-widest">
            <a
              href="#about"
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              {copy.nav.about}
            </a>
            <a
              href="#team"
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              {copy.nav.team}
            </a>
            <a
              href="#strategy"
              className="hover:text-blue-400 transition-colors cursor-pointer"
            >
              {copy.nav.strategy}
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="px-4 py-2 glass text-silver-300 font-bold rounded-lg transition-all hover:bg-navy-700/30 text-xs uppercase tracking-widest border border-silver-800"
              onClick={() => setLang((prev) => (prev === "en" ? "zh" : "en"))}
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <button className="px-6 py-2 bg-gradient-to-r from-navy-600 to-blue-500 hover:from-navy-500 hover:to-blue-400 text-silver-100 font-bold rounded-lg transition-all transform hover:scale-105 brand-glow cursor-pointer text-sm">
              {copy.nav.cta}
            </button>
          </div>
        </div>
      </nav>

      <main className="relative">
        <section className="min-h-screen flex flex-col items-center justify-center pt-32 pb-20 px-6 relative">
          <div className="beam-sweep" />
          <img
            src="/logo.png"
            alt="Janus Capital logo watermark"
            className="pointer-events-none absolute top-1/2 left-1/2 w-[520px] md:w-[720px] opacity-[0.05] -translate-x-1/2 -translate-y-1/2"
          />
          <div className="max-w-4xl text-center space-y-8 animate-float scanline">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold uppercase tracking-widest mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span>{copy.hero.tagline}</span>
            </div>

            <div className="flex flex-col items-center gap-8 relative">
              <div className="absolute -inset-10 md:-inset-16 orbital opacity-50" />
              <div className="absolute -inset-20 md:-inset-28 orbital opacity-30" />
              <div className="logo-ring">
                <img
                  src="/logo.png"
                  alt="Janus Capital logo"
                  className="w-48 h-48 md:w-72 md:h-72 object-contain logo-halo"
                />
              </div>
              <h1 className="font-display text-4xl md:text-7xl font-bold leading-tight tracking-tighter text-silver-100">
                {copy.hero.title1} <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy-400 via-blue-400 to-silver-300 neon-text">
                  {copy.hero.title2}
                </span>
              </h1>
            </div>

            {copy.hero.subtitle ? (
              <p className="text-lg md:text-xl text-silver-400 max-w-2xl mx-auto leading-relaxed">
                {copy.hero.subtitle}
              </p>
            ) : null}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button className="w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-navy-600 to-blue-500 text-silver-100 font-bold rounded-xl transition-all transform hover:scale-105 brand-glow-intense flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest text-sm">
                {copy.hero.ctaPrimary}
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button className="w-full sm:w-auto px-10 py-4 glass inner-highlight text-silver-200 font-bold rounded-xl transition-all hover:bg-navy-700/30 flex items-center justify-center gap-2 cursor-pointer uppercase tracking-widest text-sm border border-silver-800">
                {copy.hero.ctaSecondary}
                <Download className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-6 ticker-mask">
              <div className="flex items-center gap-8 text-xs uppercase tracking-[0.4em] text-silver-600 animate-ticker">
                <span>{copy.hero.ticker}</span>
                <span>{copy.hero.ticker}</span>
              </div>
            </div>
          </div>

          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-silver-700">
            <span className="text-[10px] uppercase tracking-[0.3em]">
              {copy.hero.scroll}
            </span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-blue-400/50 to-transparent" />
          </div>
        </section>

        {/* Metallic Divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="metallic-bar" />
        </div>

        <section id="about" className="py-20 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8">
            {copy.stats.map((stat, index) => (
              <div
                key={stat.label}
                className="glass inner-highlight brand-shadow brand-shadow-hover p-8 rounded-3xl space-y-2 group hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className={`text-4xl font-display font-bold ${statGlow[index]}`}>
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-silver-500 font-bold">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Metallic Divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="metallic-bar" />
        </div>

        <section id="overview" className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <h2 className="font-display text-3xl md:text-5xl font-bold text-silver-100">
                  {copy.overview.title1}{" "}
                  <span className="text-blue-400">{copy.overview.title2}</span>
                </h2>
                <p className="text-silver-500 mt-4 max-w-2xl">{copy.overview.subtitle}</p>
              </div>
              <div className="glass inner-highlight px-6 py-4 rounded-2xl text-xs uppercase tracking-[0.3em] text-silver-500">
                Sovereign Quant Stack
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {copy.overview.items.map((item, index) => (
                <div
                  key={item.title}
                  className={`glass lux-sheen inner-highlight brand-shadow brand-shadow-hover p-6 rounded-3xl space-y-4 hover:border-navy-500/40 transition-all ${overviewSpan[index]}`}
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-display text-lg text-silver-200">{item.title}</h3>
                    <span className="text-[10px] uppercase tracking-[0.3em] text-silver-600">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-silver-400 text-sm leading-relaxed">{item.desc}</p>
                  <div className="h-[6px] bg-navy-800 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-navy-500 to-blue-400" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="team" className="py-32 px-6 depth-layer relative">
          <div className="max-w-7xl mx-auto">
            <div className="mb-20 text-center md:text-left">
              <h2 className="font-display text-4xl md:text-6xl font-bold mb-6">
                {copy.team.title1}{" "}
                <span className="text-brand-gradient">{copy.team.title2}</span>
              </h2>
              <p className="text-silver-500 max-w-2xl text-lg">
                {copy.team.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {copy.team.members.map((member, index) => {
                const Icon = teamIcons[index] || ShieldCheck;
                return (
                  <div
                    key={member.name}
                    className="glass holo-card inner-highlight brand-shadow brand-shadow-hover p-8 md:p-10 rounded-3xl group relative overflow-hidden transition-all hover:-translate-y-2"
                  >
                    <div className="absolute top-0 right-0 w-40 h-40 bg-navy-500/15 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      <div className="flex items-center gap-5">
                        <img
                          src={teamAvatars[index]}
                          alt={`${member.name} avatar`}
                          className="w-16 h-16 md:w-20 md:h-20 rounded-3xl border border-silver-800 bg-surface shadow-inner pixel-border"
                        />
                        <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-navy-800 flex items-center justify-center border border-silver-900 shadow-inner">
                          <Icon className={`w-6 h-6 md:w-7 md:h-7 ${teamIconColors[index]}`} />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display text-2xl md:text-3xl font-bold uppercase text-silver-100">
                          {member.name}
                        </h3>
                        <p className="text-silver-400 text-lg md:text-xl mt-2">
                          {member.role}
                        </p>
                      </div>
                      <div className="hidden md:flex items-center text-xs uppercase tracking-[0.3em] text-silver-600">
                        Verified
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Metallic Divider */}
        <div className="max-w-4xl mx-auto px-6">
          <div className="metallic-bar" />
        </div>

        <section id="strategy" className="py-32 px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 space-y-8">
              <h2 className="font-display text-4xl md:text-6xl font-bold leading-tight">
                {copy.strategy.title1} <br />
                <span className="text-blue-400 neon-text">{copy.strategy.title2}</span>
              </h2>
              <p className="text-silver-400 text-lg leading-relaxed">
                {copy.strategy.subtitle}
              </p>

              <ul className="space-y-6">
                {copy.strategy.items.map((item, index) => (
                  <li key={item.title} className="flex items-start gap-4">
                    <div
                      className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${strategyBadgeColors[index]}`}
                    >
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-silver-200">{item.title}</h4>
                      <p className="text-silver-500 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="glass p-4 rounded-[40px] relative">
                <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full -z-10" />
                <div className="bg-surface rounded-[32px] overflow-hidden aspect-video relative flex items-center justify-center">
                  <div className="absolute inset-0 opacity-30 flex items-center justify-center">
                    <div className="w-full h-full bg-grid" />
                  </div>
                  <BarChart3 className="w-20 h-20 text-primary opacity-50" />
                  <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                      <span className="text-[10px] uppercase font-bold tracking-widest text-silver-600">
                        {copy.strategy.feed}
                      </span>
                    </div>
                    <span className="font-display text-xs font-bold">
                      ETH/USDT +2.4%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metallic Divider */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="metallic-bar" />
        </div>

        <section id="dashboard" className="py-32 px-6 relative">
          <div className="absolute inset-0 pointer-events-none aurora-sweep opacity-60" />
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
              <div>
                <h2 className="font-display text-4xl md:text-6xl font-bold text-silver-100">
                  {copy.dashboard.title1}{" "}
                  <span className="text-blue-400">{copy.dashboard.title2}</span>
                </h2>
                <p className="text-silver-500 mt-4 max-w-2xl">{copy.dashboard.subtitle}</p>
              </div>
              <div className="glass lux-sheen inner-highlight px-6 py-4 rounded-2xl text-xs uppercase tracking-[0.3em] text-silver-500">
                Unified Control Plane
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-10">
              {dashboardImages.map((src, index) => (
                <div
                  key={src}
                  className="panel-card glass lux-sheen inner-highlight brand-shadow brand-shadow-hover rounded-3xl p-6 hover:translate-y-[-4px] transition-transform duration-300 cursor-pointer"
                >
                  <div className="text-xs uppercase tracking-[0.3em] text-silver-600 mb-3">
                    Panel 0{index + 1}
                  </div>
                  <div className="rounded-2xl overflow-hidden border border-silver-900 bg-navy-900/60">
                    <img
                      src={src}
                      alt={`Monitoring dashboard ${index + 1}`}
                      className="w-full h-[340px] object-contain"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-silver-600">
                    <span>Live</span>
                    <span>Encrypted</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="infrastructure" className="py-32 px-6 bg-surface/30">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-12 items-center">
            <div className="space-y-8">
              <h2 className="font-display text-4xl md:text-6xl font-bold">
                {copy.infrastructure.title1}{" "}
                <span className="text-blue-400">{copy.infrastructure.title2}</span>
              </h2>
              <p className="text-silver-500 max-w-2xl">{copy.infrastructure.subtitle}</p>

              <div className="grid sm:grid-cols-3 gap-4">
                {copy.infrastructure.stats.map((stat) => (
                  <div key={stat.label} className="glass lux-sheen inner-highlight brand-shadow p-5 rounded-2xl text-center">
                    <div className="font-display text-2xl text-blue-400">{stat.value}</div>
                    <div className="text-xs uppercase tracking-[0.25em] text-silver-600 mt-2">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="glass lux-sheen inner-highlight brand-shadow p-8 rounded-3xl space-y-6 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-navy-700/20 via-transparent to-blue-700/10" />
              <div className="relative">
                <div className="text-xs uppercase tracking-[0.3em] text-silver-600 mb-4">
                  Pipeline
                </div>
                <div className="space-y-5">
                  {copy.infrastructure.steps.map((step, index) => (
                    <div key={step} className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-full bg-navy-600/30 text-blue-400 flex items-center justify-center font-display text-sm border border-navy-500/30">
                        {index + 1}
                      </div>
                      <div className="text-silver-300">{step}</div>
                    </div>
                  ))}
                </div>
                <div className="mt-8 h-[120px] rounded-2xl bg-navy-900/60 border border-silver-900 relative overflow-hidden">
                  <div className="absolute inset-0 bg-grid opacity-40" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-silver-600 uppercase tracking-[0.3em]">
                    <span>Signal</span>
                    <span>Execution</span>
                    <span>Risk</span>
                  </div>
                  <div className="absolute top-6 left-6 h-2 w-[70%] bg-gradient-to-r from-navy-500 to-blue-400 rounded-full" />
                  <div className="absolute top-12 left-6 h-2 w-[55%] bg-gradient-to-r from-silver-500 to-navy-500 rounded-full" />
                  <div className="absolute top-20 left-6 h-2 w-[40%] bg-gradient-to-r from-navy-500 to-silver-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Metallic Divider */}
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="metallic-bar" />
        </div>

      </main>

      <footer className="py-20 px-6 border-t border-silver-900">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-navy-800 flex items-center justify-center rounded-xl border border-silver-800 brand-glow">
              <img
                src="/logo.png"
                alt="Janus Capital logo"
                className="w-7 h-7 object-contain"
              />
            </div>
            <span className="font-display text-lg font-bold tracking-tighter uppercase text-silver-200">
              Janus Capital
            </span>
          </div>

          <div className="text-silver-600 text-xs uppercase tracking-[0.2em]">
            {copy.footer}
          </div>

          <div className="flex items-center gap-6">
            <a href="#" className="text-silver-600 hover:text-blue-400 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-silver-600 hover:text-blue-400 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="text-silver-600 hover:text-blue-400 transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
