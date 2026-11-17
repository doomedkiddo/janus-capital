export type TitledItem = {
  title: string;
  desc: string;
};

export type HomeCopy = {
  nav: { team: string; strategy: string; performance: string; story: string; cta: string };
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
    fig: string;
    live: string;
  };
  /** the page's chapters, in order: source, readout, loop, observers, origin, depart */
  chapters: string[];
  loop: { line: string; hint: string };
  team: {
    title1: string;
    title2: string;
    subtitle: string;
    members: { name: string; role: string }[];
  };
  teaser: {
    overline: string;
    title: string;
    body: string;
    cta: string;
  };
  strategy: {
    title1: string;
    title2: string;
    subtitle: string;
    feed: string;
    items: TitledItem[];
  };
  footer: string;
};

export type AboutChapter = {
  marker: string;
  overline: string;
  title: string;
  paragraphs: string[];
  pull: string;
  figure: string;
  spec: string;
};

export type AboutCopy = {
  meta: { title: string; description: string };
  hero: {
    wordmark: string;
    source: string;
    title: string;
    lede: string;
    scroll: string;
  };
  prologue: { overline: string; paragraphs: string[]; closing: string };
  chapters: AboutChapter[];
  name: { overline: string; lines: string[] };
  instruments: {
    overline: string;
    title: string;
    items: { label: string; title: string; desc: string; code: string }[];
    closing: string;
  };
  epilogue: { overline: string; paragraphs: string[]; signature: string; tagline: string };
  cta: { title: string; desc: string; primary: string; secondary: string };
  nav: { back: string; chapterLabel: string };
};
