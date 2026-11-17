"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { Check, Copy, Mail, X } from "lucide-react";
import { home } from "@/lib/i18n/home";
import { useLanguage } from "@/lib/i18n/language-context";

const EMAIL = "ricky@januscapital.ai";

const ContactContext = createContext<{ open: () => void } | null>(null);

export function useContact() {
  const ctx = useContext(ContactContext);
  if (!ctx) throw new Error("useContact must be used within ContactProvider");
  return ctx;
}

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const { lang } = useLanguage();
  const copy = home[lang].contact;
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const openModal = useCallback(() => {
    setOpen(true);
    window.location.href = `mailto:${EMAIL}?subject=Business%20Inquiry`;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const copyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <ContactContext.Provider value={{ open: openModal }}>
      {children}
      {open && (
        <div className="ink-surface fixed inset-0 z-[70] flex items-center justify-center p-4 text-paper">
          <div className="absolute inset-0 bg-ink/80 backdrop-blur-md" onClick={() => setOpen(false)} />
          <div role="dialog" aria-modal="true" aria-label={copy.title} className="reg relative w-full max-w-md border border-paper/20 bg-ink p-7 md:p-9">
            <button
              onClick={() => setOpen(false)}
              aria-label={copy.close}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center text-paper/50 transition-colors hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
            >
              <X className="h-4 w-4" />
            </button>

            <p className="label flex items-center gap-3 text-accent">
              <Mail className="h-3.5 w-3.5" />
              Sagnac Trading
            </p>
            <h3 className="display mt-6 text-4xl">{copy.title}</h3>
            <p className="mt-4 text-sm leading-relaxed text-paper/65">{copy.desc}</p>

            <div className="mt-7 border-t border-paper/15 pt-5">
              <p className="text-xs text-paper/45">{copy.fallback}</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <a href={`mailto:${EMAIL}`} className="beam-link break-all font-mono text-sm text-paper">
                  {copy.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex shrink-0 items-center gap-2 border border-paper/25 px-3 py-2 font-mono text-[11px] text-paper/80 transition-colors hover:border-paper/70 hover:text-paper focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                >
                  {copied ? <Check className="h-3 w-3 text-accent" /> : <Copy className="h-3 w-3" />}
                  {copied ? copy.copied : copy.copy}
                </button>
              </div>
            </div>

            <button onClick={() => setOpen(false)} className="btn-beam mt-7 w-full">
              {copy.close}
            </button>
          </div>
        </div>
      )}
    </ContactContext.Provider>
  );
}
