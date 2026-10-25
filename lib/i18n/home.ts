import type { Lang } from "./language-context";
import type { HomeCopy } from "./types";

export const home: Record<Lang, HomeCopy> = {
  en: {
    nav: {
      team: "Team",
      strategy: "Strategy",
      performance: "Performance",
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
      title1: "Decoding the",
      title2: "digital frontier",
      inscription: "At the threshold of every beginning",
      subtitle: "",
      ctaPrimary: "See the live record",
      ctaSecondary: "Request Whitepaper",
      ticker: "Liquidity • Market Making • Stat Arb • DeFi • HFT • AI Signals • Options",
      scroll: "Scroll",
    },
    team: {
      title1: "ELITE",
      title2: "PEDIGREE",
      subtitle:
        "Our team brings together veterans from the world's most sophisticated quantitative trading firms and hedge funds. We combine traditional finance rigor with crypto-native agility. All members are 985+ or equivalent.",
      members: [
        { name: "Ricky", role: "Founder • Bitget • 20M USDT AUM" },
        { name: "Louise Lee", role: "Optiver Senior Dev" },
        { name: "Peter", role: "Former QRT Quant Researcher" },
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
    footer: "© 2026 Janus Capital. All Rights Reserved.",
  },
  zh: {
    nav: {
      team: "团队",
      strategy: "策略",
      performance: "实盘业绩",
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
      title1: "Decoding the",
      title2: "digital frontier",
      inscription: "立于一切开始之处",
      subtitle: "",
      ctaPrimary: "查看实盘业绩",
      ctaSecondary: "索取白皮书",
      ticker: "流动性 • 做市 • 统计套利 • DeFi • 高频 • AI信号 • 期权",
      scroll: "下滑",
    },
    team: {
      title1: "顶级",
      title2: "履历",
      subtitle:
        "团队成员来自全球顶尖量化交易机构与对冲基金，融合传统金融严谨与加密原生效率。全员985以上及同等学力。",
      members: [
        { name: "Ricky", role: "创始人 · Bitget · 2000万USDT AUM" },
        { name: "Louise Lee", role: "Optiver 资深开发" },
        { name: "Peter", role: "前 QRT 量化研究员" },
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
    footer: "© 2026 Janus Capital. 保留所有权利。",
  },
};

export type { HomeCopy } from "./types";
