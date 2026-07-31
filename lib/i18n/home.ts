import type { Lang } from "./language-context";
import type { HomeCopy } from "./types";

export const home: Record<Lang, HomeCopy> = {
  en: {
    nav: {
      about: "About",
      team: "Team",
      strategy: "Strategy",
      story: "Janus",
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
      inscription: "At the threshold of every beginning",
      subtitle: "",
      ctaPrimary: "Explore Strategies",
      ctaSecondary: "Read Whitepaper",
      ticker: "Liquidity • Market Making • Stat Arb • DeFi • HFT • AI Signals • Options",
      scroll: "Scroll",
    },
    stats: [
      { value: "10μs", label: "Execution Latency" },
      { value: "24/7", label: "Market Liquidity" },
      { value: "200+", label: "Trading Pairs", ticker: 200, suffix: "+" },
    ],
    overview: {
      title1: "CORE",
      title2: "SYSTEMS",
      badge: "Sovereign Quant Stack",
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
      badge: "Unified Control Plane",
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
    teaser: {
      overline: "The Name",
      latin: "Me chaos antiqvi vocabant",
      title: "Before every beginning, there is a door.",
      body: "Rome gave the keeper of beginnings two faces — one upon what has happened, one upon what has not. We took his name, and his way of looking.",
      cta: "Read the story of Janus",
      chapters: ["Two Faces", "The Gates", "The Hinge", "The Golden Age", "The Maxims"],
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
          desc: "Extending our market making and statistical arbitrage capabilities into traditional finance venues, bridging TradFi and crypto liquidity.",
        },
        {
          title: "Multi-Factor + Transformer High-Dimensional Stat Arb",
          desc: "Multi-factor and transformer-driven high-dimensional statistical arbitrage across decentralized and centralized exchanges.",
        },
        {
          title: "Cross-Sectional Strategy",
          desc: "Factor-driven selection across baskets to harvest relative value signals.",
        },
        {
          title: "Time Series",
          desc: "Momentum and mean-reversion frameworks tuned for 24/7 crypto markets.",
        },
        {
          title: "Reinforcement Learning Market Making",
          desc: "Adaptive quoting with RL agents optimizing spread and inventory risk.",
        },
        {
          title: "Polymarket Market Making",
          desc: "Liquidity provision and pricing for prediction markets with tight risk controls.",
        },
      ],
    },
    infrastructure: {
      title1: "GLOBAL",
      title2: "INFRA",
      subtitle:
        "Always-on infrastructure with geographically distributed systems and layered controls.",
      pipeline: "Pipeline",
      regionsLabel: "Colocation & edge",
      regions: ["Tokyo", "Singapore", "Hong Kong", "Frankfurt", "London", "Ashburn"],
      stats: [
        { label: "Colocation Sites", value: "6+", ticker: 6, suffix: "+" },
        { label: "Risk Checks / Sec", value: "120K", ticker: 120, suffix: "K" },
        { label: "Venue Connections", value: "6+", ticker: 6, suffix: "+" },
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
      story: "Janus",
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
      inscription: "立于一切开始之处",
      subtitle: "",
      ctaPrimary: "查看策略",
      ctaSecondary: "阅读白皮书",
      ticker: "流动性 • 做市 • 统计套利 • DeFi • 高频 • AI信号 • 期权",
      scroll: "下滑",
    },
    stats: [
      { value: "10μs", label: "执行延迟" },
      { value: "24/7", label: "市场流动性" },
      { value: "200+", label: "交易对", ticker: 200, suffix: "+" },
    ],
    overview: {
      title1: "核心",
      title2: "系统",
      badge: "Sovereign Quant Stack",
      subtitle: "为速度、稳定性与智能适配构建的模块化交易体系。",
      items: [
        { title: "执行引擎", desc: "微观结构感知的路由系统，毫秒级响应。", tag: "超低延迟" },
        { title: "研究实验室", desc: "多因子、Transformer 与强化学习研究流水线。", tag: "AI Alpha" },
        { title: "风险控制", desc: "实时暴露、库存与交易场所健康监测。", tag: "一键熔断" },
        { title: "数据网格", desc: "多交易所数据流 + 深度历史回放。", tag: "PB 级" },
        { title: "流动性网络", desc: "跨 CeFi 与 DeFi 的最优流动性调度。", tag: "7x24" },
        { title: "LLM 智能", desc: "大语言模型深度参与研究与信号生成。", tag: "前沿 AI" },
      ],
    },
    dashboard: {
      title1: "实时",
      title2: "监控",
      badge: "Unified Control Plane",
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
    teaser: {
      overline: "名字的来处",
      latin: "Me chaos antiqvi vocabant",
      title: "每一次开始之前，都要先经过一扇门。",
      body: "罗马人把守门人塑成两张脸——一张看着已经发生的，一张看着尚未发生的。我们取了他的名字，也取了他看世界的方式。",
      cta: "阅读雅努斯的故事",
      chapters: ["双面", "门", "门轴", "黄金时代", "箴言"],
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
        { title: "多因子+Transformer高维统计套利", desc: "进行聚类并交易离群币对。" },
        { title: "截面策略", desc: "基于因子框架进行跨标的优选与相对价值捕捉。" },
        { title: "时序策略", desc: "面向 7x24 市场的动量与均值回归体系。" },
        { title: "强化学习做市", desc: "RL 智能体自适应报价，优化点差与库存风险。" },
        { title: "Polymarket 做市", desc: "在预测市场提供流动性，配合严格风控模型。" },
      ],
    },
    infrastructure: {
      title1: "全球",
      title2: "基建",
      subtitle: "全天候基础设施，分布式部署与分层风控。",
      pipeline: "Pipeline",
      regionsLabel: "机房与边缘节点",
      regions: ["东京", "新加坡", "香港", "法兰克福", "伦敦", "阿什本"],
      stats: [
        { label: "机房节点", value: "6+", ticker: 6, suffix: "+" },
        { label: "风险校验/秒", value: "120K", ticker: 120, suffix: "K" },
        { label: "交易所连接", value: "6+", ticker: 6, suffix: "+" },
      ],
      steps: ["信号接入与规范化", "聚类筛选离群币对", "自适应执行与对冲", "复盘与风险复核"],
    },
    footer: "© 2026 Janus Capital. 保留所有权利。",
  },
};

export type { HomeCopy } from "./types";
