"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useContact } from "@/components/contact-modal";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";
import { cn } from "@/lib/utils";

const FOCUS = "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent";

export function Nav() {
  const { lang, toggle } = useLanguage();
  const copy = home[lang].nav;
  const pathname = usePathname();
  const contact = useContact();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const prefix = pathname === "/" ? "" : "/";
  // on the pages built on the stage the bar is clear until the page moves; elsewhere it is a solid block
  const bench = pathname === "/" || pathname.startsWith("/performance");
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
          "ink-surface sticky top-0 z-50 border-b text-paper transition-[background-color,border-color] duration-500",
          !bench ? "border-paper/10 bg-ink" : scrolled ? "border-paper/10 bg-ink/75 backdrop-blur-md" : "border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between px-5 md:h-20 md:px-10">
          <Link href="/" aria-label="Sagnac Trading" className={cn("transition-opacity duration-300 hover:opacity-80", FOCUS)}>
            <Logo variant="mark" className="h-7 w-7 xs:hidden" />
            <Logo className="hidden h-8 w-auto xs:block md:h-9" />
          </Link>

          <div className="hidden items-center gap-9 text-[13px] tracking-[0.08em] text-paper/65 md:flex">
            {links.map((link, i) => (
              <a key={link.href} href={link.href} className={cn("beam-link flex items-baseline gap-2 py-1 transition-colors hover:text-paper", FOCUS)}>
                <span className="font-mono text-[10px] text-paper/35">{String(i + 1).padStart(2, "0")}</span>
                {link.label}
              </a>
            ))}
            <Link
              href="/about"
              className={cn(
                "beam-link flex items-baseline gap-2 py-1 font-serif text-[16px] italic tracking-normal transition-colors",
                pathname === "/about" ? "text-accent" : "hover:text-accent",
                FOCUS,
              )}
            >
              {copy.story}
            </Link>
          </div>

          <div className="flex items-center gap-2 md:gap-2.5">
            <ThemeToggle />
            <button
              onClick={toggle}
              aria-label="Switch language"
              className={cn(
                "flex h-9 min-w-[2.75rem] items-center justify-center border border-paper/25 px-2 font-mono text-[11px] tracking-[0.12em] text-paper/80 transition-colors hover:border-paper/70 hover:text-paper",
                FOCUS,
              )}
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
            <button onClick={handleContact} className="btn-beam hidden !gap-2 !px-4 !py-0 sm:inline-flex sm:h-9">
              {copy.cta}
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label="Toggle menu"
              className={cn("flex h-9 w-9 items-center justify-center border border-paper/25 md:hidden", FOCUS)}
            >
              {mobileOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="ink-surface fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-ink/90 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
          <div className="absolute inset-x-5 top-20 text-paper">
            {links.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-baseline gap-4 border-b border-paper/15 py-5 display text-3xl"
              >
                <span className="font-mono text-[11px] text-accent">{String(i + 1).padStart(2, "0")}</span>
                {link.label}
              </a>
            ))}
            <Link href="/about" onClick={() => setMobileOpen(false)} className="flex items-baseline gap-4 border-b border-paper/15 py-5 font-serif text-3xl italic text-accent">
              <span className="font-mono text-[11px] not-italic">04</span>
              {copy.story}
            </Link>
            <button onClick={handleContact} className="btn-beam btn-beam--solid mt-8 w-full">
              {copy.cta}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
