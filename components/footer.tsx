"use client";

import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

export function Footer() {
  const { lang } = useLanguage();
  const copy = home[lang];

  const links = [
    { href: "/#about", label: copy.nav.about },
    { href: "/#team", label: copy.nav.team },
    { href: "/#strategy", label: copy.nav.strategy },
    { href: "/performance", label: copy.nav.performance },
    { href: "/about", label: copy.nav.story },
  ];

  return (
    <footer className="px-4 pb-12 md:px-6 md:pb-16">
      <div aria-hidden className="divider-bronze" />
      <div className="mx-auto mt-12 flex max-w-7xl flex-col gap-8 md:mt-16 md:flex-row md:items-center md:justify-between">
        <Link
          href="/"
          className="flex items-center justify-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-400/60 focus-visible:ring-offset-2 md:justify-start"
        >
          <Image
            src="/mark.png"
            alt="Janus Capital"
            width={40}
            height={40}
            className="h-7 w-7 object-contain md:h-9 md:w-9"
          />
          <span className="flex flex-col">
            <span className="font-display text-base font-bold tracking-tight text-slate-900 md:text-lg">
              Janus Capital
            </span>
            <span className="font-serif text-[11px] italic tracking-wide text-bronze-600">
              {copy.hero.inscription}
            </span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-slate-500 md:text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded transition-colors hover:text-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-400/60 focus-visible:ring-offset-2"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${copy.contact.email}`}
            className="flex items-center gap-1.5 rounded text-slate-500 transition-colors hover:text-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-400/60 focus-visible:ring-offset-2"
          >
            <Mail className="h-3.5 w-3.5" />
            {copy.contact.email}
          </a>
        </nav>

        <div className="text-center text-[10px] uppercase tracking-wider text-slate-400 md:text-right md:text-xs">
          {copy.footer}
        </div>
      </div>
    </footer>
  );
}
