"use client";

import Link from "next/link";
import { Logo } from "@/components/logo";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

export function Footer() {
  const { lang } = useLanguage();
  const copy = home[lang];

  const links = [
    { href: "/#performance", label: copy.nav.performance },
    { href: "/#strategy", label: copy.nav.strategy },
    { href: "/#team", label: copy.nav.team },
    { href: "/about", label: copy.nav.story },
  ];

  return (
    <footer className="ink-surface bg-ink px-5 pb-10 pt-12 text-paper md:px-10 md:pb-12 md:pt-16">
      <div className="mx-auto grid max-w-[1240px] gap-10 md:grid-cols-12 md:items-end">
        <Link href="/" aria-label="Sagnac Trading" className="flex flex-col gap-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent md:col-span-5">
          <Logo className="h-10 w-auto self-start md:h-11" />
          <span className="font-serif text-[15px] italic text-paper/60">{copy.hero.inscription}</span>
        </Link>

        <nav className="flex flex-wrap gap-x-8 gap-y-3 text-[13px] tracking-[0.06em] text-paper/60 md:col-span-7 md:justify-end">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="beam-link py-1 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent">
              {link.label}
            </Link>
          ))}
          <a href={`mailto:${copy.contact.email}`} className="beam-link py-1 font-mono text-[12px] tracking-normal transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent">
            {copy.contact.email}
          </a>
        </nav>

        <p className="label border-t border-paper/15 pt-6 text-paper/35 md:col-span-12">{copy.footer}</p>
      </div>
    </footer>
  );
}
