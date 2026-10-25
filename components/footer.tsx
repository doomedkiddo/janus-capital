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
    { href: "/#performance", label: copy.nav.performance },
    { href: "/#strategy", label: copy.nav.strategy },
    { href: "/#team", label: copy.nav.team },
    { href: "/about", label: copy.nav.story },
  ];

  return (
    <footer className="bg-ink px-4 pb-12 pt-12 text-paper md:px-6 md:pb-16 md:pt-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-paper/10 pt-10 md:flex-row md:items-center md:justify-between md:pt-12">
        <Link
          href="/"
          className="flex items-center justify-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 md:justify-start"
        >
          <Image src="/mark.png" alt="Janus Capital" width={40} height={40} className="h-7 w-7 object-contain md:h-9 md:w-9" />
          <span className="flex flex-col">
            <span className="headline text-base tracking-wide md:text-lg">Janus Capital</span>
            <span className="headline text-[11px] italic tracking-wide text-accent">{copy.hero.inscription}</span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-paper/60 md:text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${copy.contact.email}`}
            className="flex items-center gap-1.5 rounded transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
          >
            <Mail className="h-3.5 w-3.5" />
            {copy.contact.email}
          </a>
        </nav>

        <p className="text-center text-[11px] text-paper/40 md:text-right md:text-xs">{copy.footer}</p>
      </div>
    </footer>
  );
}
