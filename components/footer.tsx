"use client";

import Image from "next/image";
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

const socials = [
  { Icon: Twitter, label: "Twitter" },
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Github, label: "GitHub" },
];

export function Footer() {
  const { lang } = useLanguage();
  const copy = home[lang];

  return (
    <footer className="border-t border-slate-200 px-4 py-12 md:px-6 md:py-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <Link href="/" className="flex items-center justify-center gap-3 md:justify-start">
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

        <div className="order-last text-center text-[10px] uppercase tracking-wider text-slate-400 md:order-none md:text-xs">
          {copy.footer}
        </div>

        <div className="flex items-center justify-center gap-6">
          {socials.map(({ Icon, label }) => (
            <a
              key={label}
              href="#"
              aria-label={label}
              className="text-slate-400 transition-colors hover:text-navy-600"
            >
              <Icon className="h-4 w-4 md:h-5 md:w-5" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
