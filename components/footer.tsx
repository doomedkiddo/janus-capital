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
    <footer className="bg-pine-900 px-4 pb-12 pt-12 text-ivory-100 md:px-6 md:pb-16 md:pt-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 border-t border-ivory-100/10 pt-10 md:flex-row md:items-center md:justify-between md:pt-12">
        <Link
          href="/"
          className="flex items-center justify-center gap-3 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-300/60 md:justify-start"
        >
          <Image src="/mark.png" alt="Janus Capital" width={40} height={40} className="h-7 w-7 object-contain md:h-9 md:w-9" />
          <span className="flex flex-col">
            <span className="font-serif text-base tracking-wide md:text-lg">Janus Capital</span>
            <span className="font-serif text-[11px] italic tracking-wide text-brass-300">{copy.hero.inscription}</span>
          </span>
        </Link>

        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-medium text-ivory-100/60 md:text-sm">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded transition-colors hover:text-ivory-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-300/60"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={`mailto:${copy.contact.email}`}
            className="flex items-center gap-1.5 rounded transition-colors hover:text-ivory-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-300/60"
          >
            <Mail className="h-3.5 w-3.5" />
            {copy.contact.email}
          </a>
        </nav>

        <p className="text-center text-[11px] text-ivory-100/40 md:text-right md:text-xs">{copy.footer}</p>
      </div>
    </footer>
  );
}
