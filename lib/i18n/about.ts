import type { Lang } from "./language-context";
import type { AboutCopy } from "./types";

export const about: Record<Lang, AboutCopy> = {
  zh: {
    meta: {
      title: "立于一切开始之处 | Janus Capital",
      description:
        "雅努斯，罗马的守门之神。一张脸回望，一张脸前瞻。这是 Janus Capital 名字的来处，也是我们看待市场的方式。",
    },
    hero: {
      wordmark: "IANVS",
      latin: "Me chaos antiqvi vocabant",
      latinSource: "古人曾称我为混沌。——奥维德《岁时记》",
      title: "立于一切开始之处",
      lede: "每一次开始之前，都要先经过一扇门。",
      scroll: "向下",
    },
    prologue: {
      overline: "序",
      paragraphs: [
        "每天清晨，罗马人睁开眼睛，做的第一件事是说出一个名字。播种之前说，出征之前说，开门之前说——这个名字甚至排在众神之王朱庇特之前。",
        "因为在罗马人看来，凡事皆是开始。而每一个开始，都需要一个守门人。",
      ],
      nameLine: "他叫雅努斯。",
    },
    chapters: [
      {
        numeral: "I",
        overline: "Chapter I",
        title: "双面",
        paragraphs: [
          "他有两张脸。一张看着已经发生的，一张看着尚未发生的。他从不回头——因为他从不背对任何一个方向。",
          "希腊的万神殿里没有他的位置。他不来自任何地方，他完完全全是罗马自己的神。",
          "诗人奥维德问他：你为什么是这副模样？他回答：古人曾称我为混沌——秩序出现之前，我是万物。",
        ],
        pull: "只看一张脸的判断，是半盲。",
      },
      {
        numeral: "II",
        overline: "Chapter II",
        title: "门",
        paragraphs: [
          "罗马广场上有一座他的小神庙，青铜大门朝向市集。罗马人立下规矩：战争开始，把门打开；和平降临，把门关上。",
          "此后的数百年里，这扇门几乎一直开着。关闭的次数，一只手数得过来。",
          "罗马人接受了这个事实：世界的常态不是平静，是过渡。",
        ],
        pull: "门是常开的。波动不是意外，是世界的默认状态。系统，要为常开的门而建造。",
      },
      {
        numeral: "III",
        overline: "Chapter III",
        title: "门轴",
        paragraphs: [
          "罗马人把他铸在最早的铜币上：正面是他的双面，背面是一艘船的船头。每一次交换，都要先经过他的脸。",
          "这是为了让人记住：每一笔交易都有两面——得到的那一面，和失去的那一面。",
          "他的雕像把手指摆成三百六十五——一年的天数。一年的第一个月以他命名。诗人说，他是世界的门轴，时间从他身上经过。",
        ],
        pull: "量化交易是时间的学问：数据沿着时间到来，机会沿着时间消失。我们站在门轴上。",
      },
      {
        numeral: "IV",
        overline: "Chapter IV",
        title: "黄金时代",
        paragraphs: [
          "旧王萨图恩被儿子推翻，逃出奥林匹斯，一路流亡到意大利。诸神无人收留他。",
          "雅努斯分出了半个王座。",
          "那段共治的岁月，后来被罗马人称为黄金时代——不是没有混沌的时代，而是秩序收留了混沌的时代。",
        ],
        pull: "信号活在噪声里。我们从不驱逐噪声。我们收留它，从中辨认秩序。",
      },
      {
        numeral: "V",
        overline: "Chapter V",
        title: "箴言",
        paragraphs: [
          "雅努斯没有留下箴言。他留下的是做法。",
          "从他那里，我们得到三句话。",
        ],
        pull: "他留下的不是箴言，是做法。",
      },
    ],
    maxim: {
      overline: "三句话",
      intro: "从雅努斯那里，我们得到三句话：",
      lead: "Tria Praecepta",
      items: [
        { title: "先看两个方向。", desc: "一张脸回望，一张脸前瞻。只看一张脸的判断，是半盲。" },
        { title: "门是常开的。", desc: "不为平静设计系统。平静才是例外。" },
        { title: "每一枚钱币都有两面。", desc: "永远先看另一面。" },
      ],
    },
    epilogue: {
      overline: "尾声",
      paragraphs: [
        "预言家只看前方。我们同时看着两个方向。",
        "罗马人把每一个开始交给他。我们把每一分钟交给他。",
        "我们不住在圣殿。我们住在门口。",
      ],
      signature: "Janus Capital",
      tagline: "立于一切开始之处",
    },
    cta: {
      title: "门已经开着。",
      desc: "如果你也认为波动是常态而不是意外，我们大概说的是同一种语言。",
      primary: "查看我们的策略",
      secondary: "联系我们",
    },
    nav: { back: "返回首页", chapterLabel: "章节" },
  },
  en: {
    meta: {
      title: "At the Threshold of Every Beginning | Janus Capital",
      description:
        "Janus, the Roman keeper of beginnings. One face looks back, one looks ahead. This is where our name comes from — and how we read the market.",
    },
    hero: {
      wordmark: "IANVS",
      latin: "Me chaos antiqvi vocabant",
      latinSource: "“The ancients called me Chaos.” — Ovid, Fasti",
      title: "At the threshold of every beginning",
      lede: "Before every beginning, there is a door.",
      scroll: "Scroll",
    },
    prologue: {
      overline: "Prologue",
      paragraphs: [
        "Every morning, the Romans opened their eyes and spoke one name first. Before sowing. Before sailing to war. Before opening a door. This name came even before Jupiter, king of all gods.",
        "For to the Romans, everything is a beginning. And every beginning needs a keeper.",
      ],
      nameLine: "His name is Janus.",
    },
    chapters: [
      {
        numeral: "I",
        overline: "Chapter I",
        title: "Two Faces",
        paragraphs: [
          "He has two faces. One looks upon what has happened. The other, upon what has not. He never turns around — because he never turns his back on either direction.",
          "The Greek pantheon has no seat for him. He came from nowhere else. He is Rome's own god.",
          "The poet Ovid asked him: why do you look this way? He answered — the ancients called me Chaos. Before there was order, I was everything.",
        ],
        pull: "A judgment made with a single face is half-blind.",
      },
      {
        numeral: "II",
        overline: "Chapter II",
        title: "The Gates",
        paragraphs: [
          "In the Roman Forum stood his small temple, its bronze gates facing the marketplace. The Romans made a rule: when war begins, open the gates; when peace arrives, close them.",
          "For centuries afterward, the gates stood open. The times they were closed could be counted on one hand.",
          "The Romans accepted what this meant: the natural state of the world is not calm. It is transition.",
        ],
        pull: "The gates stay open. Volatility is not the accident — it is the default. Systems are built for open gates.",
      },
      {
        numeral: "III",
        overline: "Chapter III",
        title: "The Hinge",
        paragraphs: [
          "The Romans cast him onto their earliest bronze coins: his two faces on the front, the prow of a ship on the back. Every exchange first passed across his face.",
          "It was a reminder: every trade has two sides — the side you gain, and the side you lose.",
          "His statue holds its fingers to show three hundred and sixty-five — the days of a year. The first month of the year bears his name. The poet said he is the hinge of the world, and time passes through him.",
        ],
        pull: "Quantitative trading is the discipline of time. Data arrives along time. Opportunity departs along time. We stand upon the hinge.",
      },
      {
        numeral: "IV",
        overline: "Chapter IV",
        title: "The Golden Age",
        paragraphs: [
          "Saturn, the old king, was overthrown by his son and fled Olympus — a fugitive, all the way to Italy. No god would take him in.",
          "Janus gave up half his throne.",
          "The years of that shared reign came to be called the Golden Age — not an age without chaos, but an age in which order gave chaos shelter.",
        ],
        pull: "The signal lives inside the noise. We do not drive the noise out. We take it in, and read the order within.",
      },
      {
        numeral: "V",
        overline: "Chapter V",
        title: "The Maxims",
        paragraphs: [
          "Janus left no maxims. He left a way of doing things.",
          "From him, we take three sentences.",
        ],
        pull: "He left no maxims. He left a way of doing things.",
      },
    ],
    maxim: {
      overline: "Three Sentences",
      intro: "From him, we take three sentences:",
      lead: "Tria Praecepta",
      items: [
        {
          title: "Look in both directions first.",
          desc: "One face looks back. One face looks ahead. A judgment made with a single face is half-blind.",
        },
        {
          title: "The gates stay open.",
          desc: "Do not design systems for calm. Calm is the exception.",
        },
        { title: "Every coin has two faces.", desc: "Always look at the other side first." },
      ],
    },
    epilogue: {
      overline: "Coda",
      paragraphs: [
        "Prophets look forward. We look in both directions at once.",
        "The Romans entrusted every beginning to him. We entrust every minute.",
        "We do not live in the temple. We live at the threshold.",
      ],
      signature: "Janus Capital",
      tagline: "At the threshold of every beginning.",
    },
    cta: {
      title: "The gates are already open.",
      desc: "If you also believe volatility is the default rather than the accident, we are probably speaking the same language.",
      primary: "See our strategies",
      secondary: "Get in touch",
    },
    nav: { back: "Back to home", chapterLabel: "Chapters" },
  },
};
