import type { Lang } from "./language-context";
import type { HomeCopy } from "./types";

export const home: Record<Lang, HomeCopy> = {
  en: {
    nav: {
      team: "Team",
      strategy: "Strategy",
      performance: "Performance",
      story: "Sagnac",
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
      inscription: "In the smallest difference, the turning of the world",
      subtitle: "",
      ctaPrimary: "See the live record",
      ctaSecondary: "Get in touch",
      ticker: "Liquidity • Market Making • Stat Arb • DeFi • HFT • AI Signals • Options",
      scroll: "Scroll",
      lines: ["In the smallest difference,", "the turning of the world"],
      lede: "One coherent source. A closed loop. Counter-propagating paths.",
      fig: "Fig. 0 · A name written in phase",
      caption: "No fringe here is brighter or darker than the rest. The letters are only half a period out of step.",
      live: "Live record",
    },
    chapters: ["Source", "Readout", "Loop", "Observers", "Origin", "Depart"],
    loop: {
      line: "Strategy line",
      hint: "Two pulses leave together, go round once each way, and meet again at the same point.",
    },
    team: {
      title1: "RESEARCH &",
      title2: "SYSTEMS",
      subtitle:
        "Veterans from tier-one global market makers and quantitative hedge funds including Optiver and QRT — uniting mathematical research rigor with bare-metal systems engineering.",
      members: [
        { name: "Ricky", role: "Founder · Bitget · 20M USDT AUM" },
        { name: "Louise Lee", role: "Optiver Senior Dev" },
        { name: "Peter", role: "Former QRT Quant Researcher" },
      ],
    },
    teaser: {
      overline: "The Name",
      title: "He set out to prove the ether. He measured rotation itself.",
      body: "In 1913, Georges Sagnac sent two beams of light around a rotating loop to look for the ether. There was no ether — yet the fifty-attosecond lag stayed, becoming a physical baseline of modern navigation and the origin of our name.",
      cta: "Read the story of Sagnac",
    },
    strategy: {
      title1: "SYSTEMATIC",
      title2: "PRECISION",
      subtitle:
        "Across microsecond high-frequency and mid-to-low-frequency horizons: deterministic low-latency execution written in Rust, paired with mathematical and machine-learning directional signals across timescales.",
      feed: "Live Strategy Feed",
      items: [
        {
          title: "TradFi Market Making & Arbitrage",
          desc: "Extending our low-latency market-making and statistical arbitrage stack into traditional venues, capturing cross-market pricing dislocations between TradFi and crypto.",
        },
        {
          title: "Multi-Factor & Transformer Stat Arb",
          desc: "Combining multi-factor models with Transformer sequence representations to cluster high-dimensional return spaces and trade residual mean reversion across CeFi and DeFi.",
        },
        {
          title: "Cross-Sectional Strategy",
          desc: "High-dimensional factor models and non-linear learners ranking the cross-section in real time, stripping out market beta to isolate relative directional signals.",
        },
        {
          title: "Time Series",
          desc: "Continuous 24/7 directional models spanning microsecond order-book imbalance to mid- and low-frequency momentum and mean-reversion regimes.",
        },
        {
          title: "Reinforcement Learning Market Making",
          desc: "Built on a Rust zero-allocation execution core, RL models jointly estimate short-horizon price direction, adverse selection, and inventory risk to quote dynamically.",
        },
        {
          title: "Polymarket Market Making",
          desc: "Probability calibration, Bayesian updating, and strict tail-risk controls for continuous two-sided liquidity across event-driven prediction markets.",
        },
      ],
    },
    footer: "© 2026 Sagnac Trading. All Rights Reserved.",
  },
  zh: {
    nav: {
      team: "团队",
      strategy: "策略",
      performance: "实盘业绩",
      story: "Sagnac",
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
      inscription: "于毫厘之差，见天地之转",
      subtitle: "",
      ctaPrimary: "查看实盘业绩",
      ctaSecondary: "联系我们",
      ticker: "流动性 • 做市 • 统计套利 • DeFi • 高频 • AI信号 • 期权",
      scroll: "下滑",
      lines: ["于毫厘之差，", "见天地之转"],
      lede: "同源之光，闭合之环，逆向而行。",
      fig: "图 0 · 以相位写成的名字",
      caption: "这里没有哪一道条纹更亮，或更暗。字迹所在，只是错开了半个周期。",
      live: "实盘记录",
    },
    chapters: ["光源", "读数", "闭环", "观测", "来处", "出发"],
    loop: {
      line: "策略线",
      hint: "两束光同时出发，各绕一周，在同一点重逢。",
    },
    team: {
      title1: "数理",
      title2: "与工程",
      subtitle:
        "团队成员来自 Optiver、QRT 等全球一线量化做市商与对冲基金，兼具扎实的数理统计研究背景与超低延迟系统工程经验。",
      members: [
        { name: "Ricky", role: "创始人 · Bitget · 2000 万 USDT AUM" },
        { name: "Louise Lee", role: "Optiver 资深开发" },
        { name: "Peter", role: "前 QRT 量化研究员" },
      ],
    },
    teaser: {
      overline: "名字的来处",
      title: "他执意证明以太，却测出了旋转本身。",
      body: "1913 年，萨尼亚克令两束光沿旋转的闭环相向穿行，试图捕捉假想中的以太。以太从未存在，那五十阿秒的时差却留存至今，成为现代惯性导航与卫星授时的物理基准，亦是我们名字的来处。",
      cta: "阅读萨尼亚克的故事",
    },
    strategy: {
      title1: "系统化",
      title2: "精度",
      subtitle:
        "横跨微秒级高频与中低频多时间尺度：高频端以 Rust 构建确定性超低延迟执行引擎，全周期以数学建模与机器学习提取方向性信号。",
      feed: "实时策略流",
      items: [
        {
          title: "传统金融做市与套利",
          desc: "将低延迟做市与统计套利体系延伸至传统金融市场，捕捉跨市场微观定价偏差，连接 TradFi 与加密资产流动性。",
        },
        {
          title: "Transformer 高维统计套利",
          desc: "结合多因子模型与自注意力序列结构，在高维收益空间中动态聚类，跨中心化与去中心化市场交易残差回归。",
        },
        {
          title: "截面策略",
          desc: "基于高维因子与非线性机器学习模型对全市场标的实时排序，剥离市场 Beta，提取跨资产的相对方向信号。",
        },
        {
          title: "时序策略",
          desc: "面向 7×24 连续市场，从微秒级订单簿失衡到中低频动量与均值回归，在不同时间尺度上捕捉方向性收益。",
        },
        {
          title: "强化学习做市",
          desc: "基于 Rust 零分配低延迟执行底座，由强化学习模型联合估计短期价格方向、逆向选择风险与库存偏离，实时动态报价。",
        },
        {
          title: "Polymarket 做市",
          desc: "针对事件驱动型合约建立概率校准与贝叶斯更新模型，在严格的尾部风控约束下提供双边流动性。",
        },
      ],
    },
    footer: "© 2026 Sagnac Trading. 保留所有权利。",
  },
};

export type { HomeCopy } from "./types";
