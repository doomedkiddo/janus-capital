"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useContact } from "@/components/contact-modal";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

export function Nav() {
  const { lang, toggle } = useLanguage();
  const copy = home[lang].nav;
  const pathname = usePathname();
  const contact = useContact();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const onHome = pathname === "/";
  const prefix = onHome ? "" : "/";

  const links = [
    { href: `${prefix}#about`, label: copy.about },
    { href: `${prefix}#team`, label: copy.team },
    { href: `${prefix}#strategy`, label: copy.strategy },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => setMobileOpen(false), [pathname]);

  const handleContact = () => {
    setMobileOpen(false);
    contact.open();
  };

  return (
    <>
      <nav
        className={cn(
          "nav-surface sticky top-0 z-50 transition-shadow duration-300",
          scrolled && "shadow-[0_1px_20px_-8px_rgba(15,23,42,0.16)]",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 md:py-4">
          <Link href="/" className="group flex items-center gap-2.5 md:gap-3">
            <Image
              src="/mark.png"
              alt="Janus Capital"
              width={44}
              height={44}
              priority
              className="h-7 w-7 object-contain transition-transform duration-300 group-hover:scale-105 md:h-9 md:w-9"
            />
            <span className="hidden font-display text-sm font-bold tracking-tight text-slate-900 xs:block md:text-lg">
              Janus Capital
            </span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative rounded py-1 transition-colors hover:text-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-400/60 after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-navy-600 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/performance"
              className={cn(
                "relative rounded py-1 transition-colors hover:text-navy-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-400/60 after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:bg-navy-600 after:transition-all after:duration-300 hover:after:w-full",
                pathname === "/performance" ? "text-navy-600 after:w-full" : "after:w-0",
              )}
            >
              {copy.performance}
            </Link>
            <Link
              href="/about"
              className={cn(
                "relative inline-flex items-center gap-1.5 rounded py-1 font-serif text-[15px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-400/60",
                pathname === "/about"
                  ? "text-bronze-600"
                  : "text-slate-600 hover:text-bronze-600",
              )}
            >
              <span className="h-1 w-1 rounded-full bg-bronze-400" />
              {copy.story}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggle}
              aria-label="Switch language"
              className="min-w-[3rem] rounded-lg border border-slate-200 px-2 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-slate-600 transition-all hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-400/60 md:min-w-[4.25rem] md:px-3 md:py-2 md:text-xs"
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <button
              onClick={handleContact}
              className="group hidden items-center gap-1.5 rounded-lg bg-navy-600 px-4 py-1.5 text-xs font-semibold text-white transition-all hover:bg-navy-700 hover:shadow-[0_6px_18px_-6px_rgba(46,76,127,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-400/60 focus-visible:ring-offset-2 sm:flex md:px-6 md:py-2 md:text-sm"
            >
              {copy.cta}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-400/60 md:hidden"
            >
              {mobileOpen ? (
                <X className="h-5 w-5 text-slate-600" />
              ) : (
                <Menu className="h-5 w-5 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-3 right-3 top-16 space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.3)]">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-slate-100 py-3 text-lg font-medium text-slate-700 transition-colors hover:text-navy-600"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/performance"
                onClick={() => setMobileOpen(false)}
                className="border-b border-slate-100 py-3 text-lg font-medium text-slate-700 transition-colors hover:text-navy-600"
              >
                {copy.performance}
              </Link>
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-3 font-serif text-lg text-bronze-700"
              >
                <span className="h-1 w-1 rounded-full bg-bronze-400" />
                {copy.story}
              </Link>
            </div>
            <button
              onClick={handleContact}
              className="w-full rounded-xl bg-navy-600 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
            >
              {copy.cta}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
