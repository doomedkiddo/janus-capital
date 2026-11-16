import type { Lang } from "./language-context";
import type { AboutCopy } from "./types";

const MARKERS = ["1913", "1925", "1963", "2023"];

const SPECS = [
  "λ ≈ 436 nm · A = 860 cm² · f ≈ 2 Hz",
  "613 m × 339 m · Δ = 0.230",
  "Δt = 4NAΩ / c²",
  "δt = 2Ω · A / c²",
];

export const about: Record<Lang, AboutCopy> = {
  zh: {
    meta: {
      title: "于毫厘之差，见天地之转 | Sagnac Trading",
      description:
        "1913 年，萨尼亚克令两束光沿旋转闭环相向穿行，试图捕捉假想中的以太。以太从未存在，那五十阿秒的时差却留存至今。这是 Sagnac Trading 名字的来处。",
    },
    hero: {
      wordmark: "SAGNAC",
      source: "萨尼亚克效应 · C. R. Acad. Sci., 1913",
      title: "于毫厘之差，见天地之转",
      lede: "同源之光，闭合之环，逆向而行。",
      scroll: "向下",
    },
    prologue: {
      overline: "序",
      paragraphs: [
        "巴黎，1913 年。经典物理学留下一个执念：光既为波，宇宙深处便当充盈着某种绝对静止的介质。学界称之为“以太”，数十年间穷尽观测，却始终未见踪迹。",
      ],
      closing: "萨尼亚克舍弃了往返的直线。他在暗室里将光路闭合成环，令整座干涉仪旋转。",
    },
    chapters: [
      {
        marker: MARKERS[0],
        overline: "1913 · 巴黎",
        title: "分束",
        paragraphs: [
          "直径半米的转台边缘，四面反射镜围出闭合多边形。一束靛色光在此一分为二，顺转与逆转沿同一环路反向穿行，最终叠合于同一张感光底片。",
          "转台以每秒两周匀速旋转。逆行之光先至，顺行之光迟抵：时差仅五十阿秒，真空中的光尚不足以走过十五纳米。然而底片显影之后，干涉条纹已然偏移。",
          "他在呈交法兰西科学院的论文中落笔：发光以太，至此证实。",
        ],
        pull: "假说错了。但那五十阿秒的偏移，千真万确。",
        figure: "图 1 · 萨尼亚克干涉仪，1913",
        spec: SPECS[0],
      },
      {
        marker: MARKERS[1],
        overline: "1925 · 伊利诺伊",
        title: "盲测",
        paragraphs: [
          "十二年后，迈克耳孙与盖尔在伊利诺伊州的旷野上铺设抽成真空的铸铁长管，围出周长近两公里的巨型闭合光路。",
          "铁管幽闭，隔绝星辰与天光。仅凭管内两束光的条纹位移（Δ = 0.230），他们便在暗处独立推演出整颗行星的自转角速度。",
          "同一年代，相对论揭示了更深层的图景：宇宙间并无以太。这道微小的时差源于旋转参考系自身的时空度规：沿闭合环路一周，同时性本身不再闭合。",
        ],
        pull: "从半米转台到整颗行星，支配相位的仍是同一行公式。",
        figure: "图 2 · 迈克耳孙–盖尔环路，1925",
        spec: SPECS[1],
      },
      {
        marker: MARKERS[2],
        overline: "1963 · 激光与光纤",
        title: "谐振",
        paragraphs: [
          "此后半个世纪，这一微弱至极的效应静卧于纸面：非因理论有瑕，只因世间尚无足够纯粹的光源。",
          "1963 年，相干激光被锁入环形谐振腔，阿秒级的时差化作可精确计数的拍频；十余年后，数公里光纤被密绕成 N 匝线圈，将环路等效面积放大千倍。",
          "不借星象，不赖信标。穿行于平流层的洲际客机与潜航深海的潜艇，仅凭舱内一圈闭合的相干光，便在绝对静默中感知每一次细微的转向。",
        ],
        pull: "公式在 1913 年便已完备；此后五十年，是工程在追赶物理。",
        figure: "图 3 · 光纤线圈，N 匝",
        spec: SPECS[2],
      },
      {
        marker: MARKERS[3],
        overline: "2023 · 韦特策尔",
        title: "本底",
        paragraphs: [
          "时至今日，这一修正已深植于全球授时与导航的底层。卫星信号自两万公里高空落抵地面仅需 0.07 秒，地球却已在这一瞬转过微小的弧度；若略去萨尼亚克项，地面坐标立偏数十米。",
          "而在德国巴伐利亚地下五米的花岗岩基岩上，一座由整块零膨胀微晶玻璃雕琢的四米环形激光仪昼夜不息，将地球自转速率的起伏分辨至十亿分之五，连大洋潮汐与大气角动量的微妙摄动亦历历可辨。",
        ],
        pull: "他执意寻找一种静止的介质，却为一切旋转铸就了标尺。",
        figure: "图 4 · 卫星授时的萨尼亚克修正",
        spec: SPECS[3],
      },
    ],
    name: {
      overline: "名字",
      lines: [
        "我们以 Sagnac 为名，并非因为他猜中了谜底。",
        "他的假说错了，宇宙间本无以太。",
        "假说终将退场，读数却会留存。一次诚实的测量，远比信念更为长久。",
      ],
    },
    instruments: {
      overline: "Sagnac Trading",
      title: "市场亦如旋转的闭环。",
      items: [
        {
          label: "01 · 观测",
          title: "只认读数，不信叙事。",
          desc: "加密市场从不缺乏“以太”式的叙事。任何构想在历经严苛的样本外检验与实盘摩擦之前，皆只是待证伪的假说；滑点、冲击与回撤皆为真实读数，从不粉饰，唯作归因。",
          code: "assert!(signal.out_of_sample());",
        },
        {
          label: "02 · 延迟",
          title: "逼近 c。",
          desc: "高频交易的窗口在微秒与纳秒间闭合。核心执行系统以 Rust 构建：零堆分配热路径、无锁并发与缓存行对齐，在硬件与物理允许的边界内，剔除每一纳秒冗余时延。",
          code: "#[repr(C, align(64))] // zero-alloc",
        },
        {
          label: "03 · 方向",
          title: "于噪声中提取方向。",
          desc: "波动幅度易于拟合，难在判定符号。从微秒级的订单簿失衡，到中低频的截面演化与时序结构，我们以数学建模与机器学习在极低信噪比中，持续分离正期望的方向性信号。",
          code: "sgn(E[Δp_τ | F_t])",
        },
      ],
      closing: "物理允许的极限，是我们唯一的标准。",
    },
    epilogue: {
      overline: "尾声",
      paragraphs: [
        "此刻，两束光仍在闭合的环路里逆向穿行。",
        "我们守在干涉条纹浮现的地方。",
      ],
      signature: "Sagnac Trading",
      tagline: "于毫厘之差，见天地之转",
    },
    cta: {
      title: "光已经出发。",
      desc: "如果你也相信，最重要的信息藏在最小的差里，我们大概说的是同一种语言。",
      primary: "查看我们的策略",
      secondary: "联系我们",
    },
    nav: { back: "返回首页", chapterLabel: "章节" },
  },
  en: {
    meta: {
      title: "In the Smallest Difference, the Turning of the World | Sagnac Trading",
      description:
        "In 1913, Georges Sagnac sent two beams of light counter-propagating around a rotating loop to seek the ether. There was no ether; the fifty-attosecond lag remained. This is where our name comes from.",
    },
    hero: {
      wordmark: "SAGNAC",
      source: "The Sagnac Effect · C. R. Acad. Sci., 1913",
      title: "In the smallest difference, the turning of the world",
      lede: "One coherent source. A closed loop. Counter-propagating paths.",
      scroll: "Scroll",
    },
    prologue: {
      overline: "Prologue",
      paragraphs: [
        "Paris, 1913. Classical physics still clung to a quiet conviction: if light is a wave, the cosmos must be pervaded by an immobile medium to bear it. Physicists called it the ether, yet decades of measurement had yielded not a trace.",
      ],
      closing: "Georges Sagnac abandoned the out-and-back line. In a darkened room he closed the light path into a ring, and set the interferometer turning.",
    },
    chapters: [
      {
        marker: MARKERS[0],
        overline: "1913 · Paris",
        title: "The Split",
        paragraphs: [
          "Along the rim of a half-metre turntable, four mirrors enclosed a polygonal loop. A beam of indigo light was split in two, sent counter-propagating around the selfsame circuit, and recombined upon a photographic plate.",
          "At two revolutions per second, the retrograde beam arrived early and the prograde beam arrived late: a lag of fifty attoseconds, less time than light in vacuum takes to cross fifteen nanometres. Yet when the plate was developed, the fringes had unmistakably shifted.",
          "In his memoir to the French Academy of Sciences, he inscribed his conclusion: the luminiferous ether, demonstrated.",
        ],
        pull: "The hypothesis was false. Those fifty attoseconds were real.",
        figure: "Fig. 1 · Sagnac's interferometer, 1913",
        spec: SPECS[0],
      },
      {
        marker: MARKERS[1],
        overline: "1925 · Illinois",
        title: "Blind Loop",
        paragraphs: [
          "Twelve years on, across the plains of Illinois, Michelson and Gale laid evacuated cast-iron pipes to enclose a rectangular optical circuit nearly two kilometres around.",
          "Sealed in total darkness, cut off from stars and horizon alike, a fringe displacement of Δ = 0.230 sufficed to deduce the angular velocity of the planet itself.",
          "In those same years, relativity unveiled the deeper architecture: there is no ether. The lag belongs to the metric of rotating spacetime itself — around a closed contour, simultaneity fails to close.",
        ],
        pull: "From a half-metre table to a turning planet, the same equation governed the phase.",
        figure: "Fig. 2 · The Michelson–Gale loop, 1925",
        spec: SPECS[1],
      },
      {
        marker: MARKERS[2],
        overline: "1963 · Laser & Fibre",
        title: "Resonance",
        paragraphs: [
          "For half a century, an exact yet vanishingly faint effect lay still on the page — not for any flaw in theory, but because no light source on Earth was yet pure enough.",
          "In 1963, coherent laser light was locked inside a ring resonator, converting attosecond lags into a countable beat frequency; a decade later, kilometres of optical fibre wound into N turns multiplied the effective area a thousandfold.",
          "Without celestial sightings or external beacons, intercontinental airliners and submerged submarines sense every infinitesimal turn in total silence, guided by a closed ring of light.",
        ],
        pull: "The equation was complete in 1913. For the next fifty years, engineering was catching up to physics.",
        figure: "Fig. 3 · A fibre coil of N turns",
        spec: SPECS[2],
      },
      {
        marker: MARKERS[3],
        overline: "2023 · Wettzell",
        title: "Baseline",
        paragraphs: [
          "Today that relativistic term sits beneath every global timing and navigation fix. A radio wave falls twenty thousand kilometres from orbit in 0.07 seconds, while the Earth turns through a slight arc beneath it; omit the Sagnac term, and every coordinate shifts by tens of metres.",
          "Five metres below Bavarian ground, anchored to granite bedrock on a monolithic block of zero-expansion Zerodur, a four-metre ring laser runs unceasingly — resolving Earth's rotational fluctuations to five parts in a billion, registering the subtle perturbations of ocean tides and atmospheric angular momentum.",
        ],
        pull: "He went in search of a motionless medium, and left behind the gauge of all rotation.",
        figure: "Fig. 4 · GNSS Sagnac correction",
        spec: SPECS[3],
      },
    ],
    name: {
      overline: "The Name",
      lines: [
        "We did not take Sagnac's name because he guessed the answer.",
        "His hypothesis failed — there was never an ether.",
        "Theories recede; readings remain. A rigorous measurement outlives the belief behind it.",
      ],
    },
    instruments: {
      overline: "Sagnac Trading",
      title: "A market, too, is a closed loop in motion.",
      items: [
        {
          label: "01 · Observation",
          title: "Readings over narratives.",
          desc: "Crypto markets are never short of “ether”-like narratives. Until a model survives strict out-of-sample testing and live microstructure friction, it remains an unverified conjecture. Slippage, impact, and drawdown are raw readings: never retouched, only attributed.",
          code: "assert!(signal.out_of_sample());",
        },
        {
          label: "02 · Latency",
          title: "Toward c.",
          desc: "High-frequency windows close in microseconds and nanoseconds. Our core execution stack is built in Rust: zero-allocation hot paths, lock-free concurrency, and cache-line-aligned state, stripping out every nanosecond of avoidable latency within physical limits.",
          code: "#[repr(C, align(64))] // zero-alloc",
        },
        {
          label: "03 · Direction",
          title: "Direction from noise.",
          desc: "Volatility magnitude is easy to fit; isolating the sign is hard. From microsecond order-book imbalances to mid- and low-frequency cross-sectional and time-series structure, mathematics and machine learning extract positive-expectation directional signals at low signal-to-noise.",
          code: "sgn(E[Δp_τ | F_t])",
        },
      ],
      closing: "The limit physics allows is the only standard we keep.",
    },
    epilogue: {
      overline: "Coda",
      paragraphs: [
        "At this moment, two beams of light are still coursing in opposite directions around the ring.",
        "We keep watch where the interference fringes form.",
      ],
      signature: "Sagnac Trading",
      tagline: "In the smallest difference, the turning of the world.",
    },
    cta: {
      title: "The light is already on its way.",
      desc: "If you also believe the most important information hides in the smallest difference, we are probably speaking the same language.",
      primary: "See our strategies",
      secondary: "Get in touch",
    },
    nav: { back: "Back to home", chapterLabel: "Chapters" },
  },
};
