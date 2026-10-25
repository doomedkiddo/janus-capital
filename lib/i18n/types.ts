export type StatItem = {
  value: string;
  label: string;
  ticker?: number;
  suffix?: string;
};

export type TitledItem = {
  title: string;
  desc: string;
};

export type TaggedItem = TitledItem & { tag: string };

export type HomeCopy = {
  nav: { about: string; team: string; strategy: string; performance: string; story: string; cta: string };
  contact: {
    title: string;
    desc: string;
    email: string;
    fallback: string;
    copy: string;
    copied: string;
    close: string;
  };
  hero: {
    tagline: string;
    title1: string;
    title2: string;
    inscription: string;
    subtitle: string;
    ctaPrimary: string;
    ctaSecondary: string;
    ticker: string;
    scroll: string;
  };
  stats: StatItem[];
  overview: {
    title1: string;
    title2: string;
    badge: string;
    subtitle: string;
    items: TaggedItem[];
  };
  team: {
    title1: string;
    title2: string;
    subtitle: string;
    members: { name: string; role: string }[];
  };
  teaser: {
    overline: string;
    latin: string;
    title: string;
    body: string;
    cta: string;
    chapters: string[];
  };
  strategy: {
    title1: string;
    title2: string;
    subtitle: string;
    feed: string;
    items: TitledItem[];
  };
  infrastructure: {
    title1: string;
    title2: string;
    subtitle: string;
    pipeline: string;
    regionsLabel: string;
    regions: string[];
    stats: StatItem[];
    steps: string[];
  };
  footer: string;
};

export type AboutChapter = {
  numeral: string;
  overline: string;
  title: string;
  paragraphs: string[];
  pull: string;
};

export type AboutCopy = {
  meta: { title: string; description: string };
  hero: {
    wordmark: string;
    latin: string;
    latinSource: string;
    title: string;
    lede: string;
    scroll: string;
  };
  prologue: { overline: string; paragraphs: string[]; nameLine: string };
  chapters: AboutChapter[];
  maxim: {
    overline: string;
    intro: string;
    lead: string;
    items: { title: string; desc: string }[];
  };
  epilogue: { overline: string; paragraphs: string[]; signature: string; tagline: string };
  cta: { title: string; desc: string; primary: string; secondary: string };
  nav: { back: string; chapterLabel: string };
};
