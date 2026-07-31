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
  Menu,
  ShieldCheck,
  Twitter,
  X,
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
    contact: {
      title: "Get in Touch",
      desc: "We'd love to hear from you. Send us an email and we'll get back to you as soon as possible.",
      email: "ricky@januscapital.ai",
      fallback: "Didn't redirect? You can email us directly at:",
      copy: "Copy Email",
      copied: "Copied!",
      close: "Close",
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
      { value: "10μs", label: "Execution Latency" },
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
        {
          title: "LLM Intelligence",
          desc: "Large Language Models deeply integrated into research and signal generation pipelines.",
          tag: "Frontier AI",
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
        { name: "Li", role: "Top Brokerage" },
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
          title: "TradFi Market Making & Arbitrage",
          desc:
            "Extending our market making and statistical arbitrage capabilities into traditional finance venues, bridging TradFi and crypto liquidity.",
        },
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
    contact: {
      title: "联系我们",
      desc: "期待您的来信，我们会尽快回复。",
      email: "ricky@januscapital.ai",
      fallback: "没有跳转？您可以直接发邮件至：",
      copy: "复制邮箱",
      copied: "已复制！",
      close: "关闭",
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
      { value: "10μs", label: "执行延迟" },
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
        {
          title: "LLM 智能",
          desc: "大语言模型深度参与研究与信号生成。",
          tag: "前沿 AI",
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
        { name: "Li", role: "头部券商" },
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
          title: "传统金融做市与套利",
          desc: "将做市与统计套利能力延伸至传统金融市场，打通 TradFi 与加密市场流动性。",
        },
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
  "/avatars/ricky.svg?v=2",
  "/avatars/liqi.svg?v=2",
  "/avatars/rainie.svg?v=2",
  "/avatars/peter.svg?v=2",
  "/avatars/zy.svg?v=2",
  "/avatars/evan.svg?v=2",
];

const teamIcons = [Crown, Landmark, BarChart3, ShieldCheck, Layers, Zap];

const overviewSpan = [
  "sm:col-span-2",
  "",
  "",
  "sm:col-span-2",
  "",
  "sm:col-span-2",
];

const dashboardImages = [
  "/Weixin%20Image_20260121134544_73_366.jpg",
  "/Weixin%20Image_20260121134547_74_366.jpg",
  "/Weixin%20Image_20260121134553_75_366.jpg",
];

const App = () => {
  const [lang, setLang] = useState("zh");
  const [showContactModal, setShowContactModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const copy = useMemo(() => translations[lang], [lang]);

  const handleContact = () => {
    setShowContactModal(true);
    setShowMobileMenu(false);
    window.location.href = "mailto:ricky@januscapital.ai?subject=Business%20Inquiry";
  };

  const copyEmail = () => {
    navigator.clipboard.writeText("ricky@januscapital.ai");
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2000);
  };

  const handleNavClick = (href) => {
    setShowMobileMenu(false);
    window.location.href = href;
  };

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  }, [lang]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (showMobileMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showMobileMenu]);

  return (
    <div className="relative bg-white">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 nav-surface">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-9 h-9 md:w-11 md:h-11 bg-white flex items-center justify-center rounded-lg md:rounded-xl border border-slate-200">
              <img
                src="/logo.png"
                alt="Janus Capital logo"
                className="w-6 h-6 md:w-8 md:h-8 object-contain"
              />
            </div>
            <span className="font-display text-sm md:text-lg font-bold tracking-tight text-slate-900 hidden xs:block">
              Janus Capital
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a
              href="#about"
              className="hover:text-navy-600 transition-colors cursor-pointer"
            >
              {copy.nav.about}
            </a>
            <a
              href="#team"
              className="hover:text-navy-600 transition-colors cursor-pointer"
            >
              {copy.nav.team}
            </a>
            <a
              href="#strategy"
              className="hover:text-navy-600 transition-colors cursor-pointer"
            >
              {copy.nav.strategy}
            </a>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              className="px-2 py-1.5 md:px-4 md:py-2 text-slate-600 font-semibold rounded-lg transition-all hover:bg-slate-100 text-[10px] md:text-xs uppercase tracking-wider border border-slate-200"
              onClick={() => setLang((prev) => (prev === "en" ? "zh" : "en"))}
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <button
              onClick={handleContact}
              className="hidden sm:flex px-4 md:px-6 py-1.5 md:py-2 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-lg transition-colors cursor-pointer text-xs md:text-sm items-center"
            >
              {copy.nav.cta}
            </button>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden w-9 h-9 flex items-center justify-center rounded-lg border border-slate-200"
            >
              {showMobileMenu ? (
                <X className="w-5 h-5 text-slate-600" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {showMobileMenu && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            onClick={() => setShowMobileMenu(false)}
          />
          <div className="absolute top-16 left-3 right-3 bg-white border border-slate-200 shadow-lg rounded-2xl p-6 space-y-6">
            <div className="flex flex-col gap-4">
              <a
                href="#about"
                onClick={() => handleNavClick("#about")}
                className="text-lg font-medium text-slate-700 hover:text-navy-600 transition-colors py-2 border-b border-slate-100"
              >
                {copy.nav.about}
              </a>
              <a
                href="#team"
                onClick={() => handleNavClick("#team")}
                className="text-lg font-medium text-slate-700 hover:text-navy-600 transition-colors py-2 border-b border-slate-100"
              >
                {copy.nav.team}
              </a>
              <a
                href="#strategy"
                onClick={() => handleNavClick("#strategy")}
                className="text-lg font-medium text-slate-700 hover:text-navy-600 transition-colors py-2 border-b border-slate-100"
              >
                {copy.nav.strategy}
              </a>
            </div>
            <button
              onClick={handleContact}
              className="w-full py-3 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-xl text-sm transition-colors"
            >
              {copy.nav.cta}
            </button>
          </div>
        </div>
      )}

      <main className="relative">
        {/* Hero Section */}
        <section className="min-h-[90vh] flex flex-col items-center justify-center pt-20 md:pt-24 pb-16 md:pb-20 px-4 md:px-6 relative bg-gradient-to-b from-slate-50 to-white">
          <div className="w-full max-w-4xl text-center space-y-6 md:space-y-8">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1 md:py-1.5 rounded-full border border-navy-200 bg-navy-50 text-navy-700 text-[10px] md:text-xs font-semibold uppercase tracking-wider mb-2 md:mb-4">
              <span className="relative flex h-2 w-2">
                <span className="relative inline-flex rounded-full h-2 w-2 bg-navy-600" />
              </span>
              <span className="line-clamp-1">{copy.hero.tagline}</span>
            </div>

            <div className="flex flex-col items-center gap-4 md:gap-8">
              <img
                src="/logo.png"
                alt="Janus Capital logo"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 object-contain"
              />
              <h1 className="font-display text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight text-slate-900">
                {copy.hero.title1} <br />
                <span className="text-navy-600">
                  {copy.hero.title2}
                </span>
              </h1>
            </div>

            {copy.hero.subtitle ? (
              <p className="text-base md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4">
                {copy.hero.subtitle}
              </p>
            ) : null}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 pt-2 md:pt-4 px-4">
              <button className="w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 bg-navy-600 hover:bg-navy-700 text-white font-semibold rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base">
                {copy.hero.ctaPrimary}
                <ArrowUpRight className="w-4 h-4" />
              </button>
              <button className="w-full sm:w-auto px-6 md:px-10 py-3 md:py-4 bg-white border border-slate-300 text-slate-700 font-semibold rounded-xl transition-colors hover:bg-slate-50 flex items-center justify-center gap-2 cursor-pointer text-sm md:text-base">
                {copy.hero.ctaSecondary}
                <Download className="w-4 h-4" />
              </button>
            </div>

            <div className="pt-4 md:pt-6 ticker-mask overflow-hidden">
              <div className="flex items-center gap-8 text-[10px] md:text-xs uppercase tracking-[0.2em] text-slate-400 animate-ticker whitespace-nowrap">
                <span>{copy.hero.ticker}</span>
                <span>{copy.hero.ticker}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="about" className="py-12 md:py-20 px-4 md:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-3 gap-3 md:gap-8">
            {copy.stats.map((stat) => (
              <div
                key={stat.label}
                className="card p-4 md:p-8 rounded-xl md:rounded-2xl space-y-1 md:space-y-2"
              >
                <div className="text-xl sm:text-2xl md:text-4xl font-display font-bold text-navy-600">
                  {stat.value}
                </div>
                <div className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-wider text-slate-500 font-semibold leading-tight">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="divider" />
        </div>

        {/* Overview Section */}
        <section id="overview" className="py-16 md:py-24 px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-12">
              <div>
                <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-bold text-slate-900">
                  {copy.overview.title1}{" "}
                  <span className="text-navy-600">{copy.overview.title2}</span>
                </h2>
                <p className="text-slate-500 mt-3 md:mt-4 max-w-2xl text-sm md:text-base">{copy.overview.subtitle}</p>
              </div>
              <div className="bg-navy-50 border border-navy-100 px-4 md:px-6 py-2 md:py-3 rounded-xl text-[10px] md:text-xs uppercase tracking-wider text-navy-700 font-semibold w-fit">
                Sovereign Quant Stack
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {copy.overview.items.map((item, index) => (
                <div
                  key={item.title}
                  className={`card p-4 md:p-6 rounded-2xl space-y-3 md:space-y-4 ${overviewSpan[index]}`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <h3 className="font-display text-base md:text-lg font-semibold text-slate-900">{item.title}</h3>
                    <span className="text-[9px] md:text-[10px] uppercase tracking-wider text-navy-600 font-semibold">
                      {item.tag}
                    </span>
                  </div>
                  <p className="text-slate-500 text-xs md:text-sm leading-relaxed">{item.desc}</p>
                  <div className="h-[4px] md:h-[6px] bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-navy-500 rounded-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section id="team" className="py-16 md:py-28 px-4 md:px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 md:mb-16 text-center md:text-left">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 text-slate-900">
                {copy.team.title1}{" "}
                <span className="text-navy-600">{copy.team.title2}</span>
              </h2>
              <p className="text-slate-500 max-w-2xl text-sm md:text-lg mx-auto md:mx-0">
                {copy.team.subtitle}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
              {copy.team.members.map((member, index) => {
                const Icon = teamIcons[index] || ShieldCheck;
                return (
                  <div
                    key={member.name}
                    className="card p-5 md:p-8 rounded-2xl transition-transform hover:-translate-y-1"
                  >
                    <div className="flex items-center gap-3 md:gap-5">
                      <img
                        src={teamAvatars[index]}
                        alt={`${member.name} avatar`}
                        className="w-12 h-12 md:w-16 md:h-16 rounded-xl border border-slate-200 bg-white flex-shrink-0"
                      />
                      <div className="w-9 h-9 md:w-11 md:h-11 rounded-xl bg-navy-50 flex items-center justify-center border border-navy-100 flex-shrink-0">
                        <Icon className="w-4 h-4 md:w-5 md:h-5 text-navy-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-slate-900">
                          {member.name}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-sm md:text-base mt-1 line-clamp-2">
                          {member.role}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Strategy Section */}
        <section id="strategy" className="py-16 md:py-28 px-4 md:px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-10 md:gap-16">
            <div className="lg:w-1/2 space-y-6 md:space-y-8">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-center lg:text-left text-slate-900">
                {copy.strategy.title1} <br />
                <span className="text-navy-600">{copy.strategy.title2}</span>
              </h2>
              <p className="text-slate-500 text-sm md:text-lg leading-relaxed text-center lg:text-left">
                {copy.strategy.subtitle}
              </p>

              <ul className="space-y-4 md:space-y-6">
                {copy.strategy.items.map((item) => (
                  <li key={item.title} className="flex items-start gap-3 md:gap-4">
                    <div className="mt-0.5 md:mt-1 w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center flex-shrink-0 bg-navy-50 text-navy-600 border border-navy-100">
                      <Check className="w-3 h-3 md:w-4 md:h-4" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm md:text-lg text-slate-900">{item.title}</h4>
                      <p className="text-slate-500 text-xs md:text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:w-1/2 w-full">
              <div className="card p-3 md:p-4 rounded-2xl md:rounded-3xl">
                <div className="bg-slate-50 rounded-xl md:rounded-2xl overflow-hidden aspect-video relative flex items-center justify-center border border-slate-100">
                  <BarChart3 className="w-12 h-12 md:w-20 md:h-20 text-navy-300" />
                  <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6 right-3 md:right-6 bg-white border border-slate-200 shadow-sm p-2 md:p-4 rounded-lg md:rounded-xl flex items-center justify-between">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-emerald-500" />
                      <span className="text-[8px] md:text-[10px] uppercase font-semibold tracking-wider text-slate-500">
                        {copy.strategy.feed}
                      </span>
                    </div>
                    <span className="font-display text-[10px] md:text-xs font-semibold text-emerald-600">
                      ETH/USDT +2.4%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dashboard Section */}
        <section id="dashboard" className="py-16 md:py-28 px-4 md:px-6 bg-slate-50">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-4 md:gap-6 mb-8 md:mb-12">
              <div>
                <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 text-center md:text-left">
                  {copy.dashboard.title1}{" "}
                  <span className="text-navy-600">{copy.dashboard.title2}</span>
                </h2>
                <p className="text-slate-500 mt-3 md:mt-4 max-w-2xl text-sm md:text-base text-center md:text-left mx-auto md:mx-0">{copy.dashboard.subtitle}</p>
              </div>
              <div className="bg-navy-50 border border-navy-100 px-4 md:px-6 py-2 md:py-3 rounded-xl text-[10px] md:text-xs uppercase tracking-wider text-navy-700 font-semibold w-fit mx-auto md:mx-0">
                Unified Control Plane
              </div>
            </div>

            {/* Mobile: Horizontal scroll, Desktop: Grid */}
            <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 overflow-x-auto scroll-touch pb-4 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 snap-x snap-proximity md:snap-none">
              {dashboardImages.map((src, index) => (
                <div
                  key={src}
                  className="card rounded-2xl p-4 md:p-5 hover:-translate-y-1 transition-transform flex-shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-center"
                >
                  <div className="text-[10px] md:text-xs uppercase tracking-wider text-slate-400 font-semibold mb-2 md:mb-3">
                    Panel 0{index + 1}
                  </div>
                  <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-900">
                    <img
                      src={src}
                      alt={`Monitoring dashboard ${index + 1}`}
                      className="w-full h-[200px] sm:h-[260px] md:h-[300px] object-contain"
                    />
                  </div>
                  <div className="mt-3 md:mt-4 flex items-center justify-between text-[10px] md:text-xs uppercase tracking-wider text-slate-400 font-medium">
                    <span>Live</span>
                    <span>Encrypted</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Infrastructure Section */}
        <section id="infrastructure" className="py-16 md:py-28 px-4 md:px-6">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center">
            <div className="space-y-6 md:space-y-8">
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-center lg:text-left text-slate-900">
                {copy.infrastructure.title1}{" "}
                <span className="text-navy-600">{copy.infrastructure.title2}</span>
              </h2>
              <p className="text-slate-500 max-w-2xl text-sm md:text-base text-center lg:text-left">{copy.infrastructure.subtitle}</p>

              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {copy.infrastructure.stats.map((stat) => (
                  <div key={stat.label} className="card p-3 md:p-5 rounded-xl text-center">
                    <div className="font-display text-lg sm:text-xl md:text-2xl font-bold text-navy-600">{stat.value}</div>
                    <div className="text-[8px] sm:text-[10px] md:text-xs uppercase tracking-wider text-slate-500 mt-1 md:mt-2 leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card p-5 md:p-8 rounded-2xl space-y-4 md:space-y-6">
              <div className="text-[10px] md:text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Pipeline
              </div>
              <div className="space-y-3 md:space-y-5">
                {copy.infrastructure.steps.map((step, index) => (
                  <div key={step} className="flex items-center gap-3 md:gap-4">
                    <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-navy-50 text-navy-600 flex items-center justify-center font-display text-xs md:text-sm border border-navy-100 flex-shrink-0 font-semibold">
                      {index + 1}
                    </div>
                    <div className="text-slate-700 text-xs md:text-base">{step}</div>
                  </div>
                ))}
              </div>
              <div className="mt-6 md:mt-8 h-[80px] md:h-[120px] rounded-xl bg-slate-50 border border-slate-200 relative overflow-hidden">
                <div className="absolute bottom-2 md:bottom-4 left-3 md:left-4 right-3 md:right-4 flex items-center justify-between text-[8px] md:text-xs text-slate-400 uppercase tracking-wider font-medium">
                  <span>Signal</span>
                  <span>Execution</span>
                  <span>Risk</span>
                </div>
                <div className="absolute top-3 md:top-6 left-3 md:left-6 h-1.5 md:h-2 w-[70%] bg-navy-400 rounded-full" />
                <div className="absolute top-7 md:top-12 left-3 md:left-6 h-1.5 md:h-2 w-[55%] bg-navy-300 rounded-full" />
                <div className="absolute top-11 md:top-20 left-3 md:left-6 h-1.5 md:h-2 w-[40%] bg-navy-200 rounded-full" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 md:py-16 px-4 md:px-6 border-t border-slate-200">
        <div className="max-w-7xl mx-auto flex flex-col gap-6 md:flex-row md:justify-between md:items-center">
          <div className="flex items-center justify-center md:justify-start gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 bg-white flex items-center justify-center rounded-lg border border-slate-200">
              <img
                src="/logo.png"
                alt="Janus Capital logo"
                className="w-5 h-5 md:w-7 md:h-7 object-contain"
              />
            </div>
            <span className="font-display text-base md:text-lg font-bold tracking-tight text-slate-900">
              Janus Capital
            </span>
          </div>

          <div className="text-slate-400 text-[10px] md:text-xs uppercase tracking-wider text-center order-last md:order-none">
            {copy.footer}
          </div>

          <div className="flex items-center justify-center gap-6">
            <a href="#" className="text-slate-400 hover:text-navy-600 transition-colors">
              <Twitter className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-navy-600 transition-colors">
              <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
            </a>
            <a href="#" className="text-slate-400 hover:text-navy-600 transition-colors">
              <Github className="w-4 h-4 md:w-5 md:h-5" />
            </a>
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setShowContactModal(false)}
          />
          <div className="relative bg-white border border-slate-200 rounded-2xl p-6 md:p-8 max-w-md w-full shadow-xl mx-4">
            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2 md:mb-3">
              {copy.contact.title}
            </h3>
            <p className="text-slate-500 mb-4 md:mb-6 text-sm md:text-base">
              {copy.contact.desc}
            </p>

            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 md:p-4 mb-4">
              <p className="text-slate-500 text-xs md:text-sm mb-2">
                {copy.contact.fallback}
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                <a
                  href="mailto:ricky@januscapital.ai"
                  className="text-navy-600 hover:text-navy-700 font-mono text-sm md:text-lg transition-colors break-all"
                >
                  {copy.contact.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="px-3 py-1 text-xs bg-white hover:bg-slate-100 text-slate-600 rounded-lg transition-colors border border-slate-300 whitespace-nowrap"
                >
                  {emailCopied ? copy.contact.copied : copy.contact.copy}
                </button>
              </div>
            </div>

            <button
              onClick={() => setShowContactModal(false)}
              className="w-full py-2.5 md:py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl transition-colors border border-slate-200 text-sm md:text-base"
            >
              {copy.contact.close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
