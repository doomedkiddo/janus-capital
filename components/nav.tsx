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
    { href: `${prefix}#performance`, label: copy.performance },
    { href: `${prefix}#strategy`, label: copy.strategy },
    { href: `${prefix}#team`, label: copy.team },
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
          "sticky top-0 z-50 bg-pine-900 text-ivory-100 transition-shadow duration-300",
          scrolled && "shadow-[0_1px_0_0_rgba(244,239,228,0.1)]",
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
            <span className="hidden font-serif text-base tracking-wide xs:block md:text-xl">Janus Capital</span>
          </Link>

          <div className="hidden items-center gap-8 text-sm font-medium text-ivory-100/70 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative rounded py-1 transition-colors hover:text-ivory-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-300/60 after:absolute after:-bottom-0.5 after:left-0 after:h-[1.5px] after:w-0 after:bg-brass-300 after:transition-all after:duration-300 hover:after:w-full"
              >
                {link.label}
              </a>
            ))}
            <Link
              href="/about"
              className={cn(
                "relative inline-flex items-center gap-1.5 rounded py-1 font-serif text-[15px] tracking-wide transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-300/60",
                pathname === "/about" ? "text-brass-300" : "text-ivory-100/70 hover:text-brass-300",
              )}
            >
              <span className="h-1 w-1 rounded-full bg-brass-300" />
              {copy.story}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-3">
            <button
              onClick={toggle}
              aria-label="Switch language"
              className="min-w-[3rem] rounded-full border border-ivory-100/25 px-2 py-1.5 text-center text-[10px] font-semibold uppercase tracking-wider text-ivory-100/80 transition-colors hover:border-ivory-100/60 hover:text-ivory-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-300/60 md:min-w-[4.25rem] md:px-3 md:py-2 md:text-xs"
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <button
              onClick={handleContact}
              className="group hidden items-center gap-1.5 rounded-full bg-ivory-100 px-4 py-1.5 text-xs font-semibold text-pine-900 transition-colors hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-300/60 sm:flex md:px-6 md:py-2 md:text-sm"
            >
              {copy.cta}
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory-100/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brass-300/60 md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-pine-950/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-3 right-3 top-16 space-y-5 rounded-[28px] bg-pine-800 p-6 text-ivory-100 shadow-[0_20px_50px_-20px_rgba(11,26,21,0.6)]">
            <div className="flex flex-col gap-1">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="border-b border-ivory-100/10 py-3 text-lg font-medium transition-colors hover:text-brass-300"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/about"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2 py-3 font-serif text-lg text-brass-300"
              >
                <span className="h-1 w-1 rounded-full bg-brass-300" />
                {copy.story}
              </Link>
            </div>
            <button
              onClick={handleContact}
              className="w-full rounded-full bg-ivory-100 py-3 text-sm font-semibold text-pine-900 transition-colors hover:bg-white"
            >
              {copy.cta}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
