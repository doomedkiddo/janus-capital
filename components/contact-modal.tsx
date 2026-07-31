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
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative mx-4 w-full max-w-md rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_24px_60px_-18px_rgba(15,23,42,0.32)] md:p-8">
            <button
              onClick={() => setOpen(false)}
              aria-label={copy.close}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-navy-100 bg-navy-50">
              <Mail className="h-5 w-5 text-navy-600" />
            </div>

            <h3 className="mb-2 text-xl font-bold text-slate-900 md:text-2xl">{copy.title}</h3>
            <p className="mb-5 text-sm leading-relaxed text-slate-500 md:text-base">{copy.desc}</p>

            <div className="mb-4 rounded-xl border border-slate-200 bg-slate-50 p-3 md:p-4">
              <p className="mb-2 text-xs text-slate-500 md:text-sm">{copy.fallback}</p>
              <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-3">
                <a
                  href={`mailto:${EMAIL}`}
                  className="break-all font-mono text-sm text-navy-600 transition-colors hover:text-navy-700 md:text-base"
                >
                  {copy.email}
                </a>
                <button
                  onClick={copyEmail}
                  className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-600 transition-colors hover:bg-slate-100"
                >
                  {copied ? (
                    <Check className="h-3 w-3 text-emerald-600" />
                  ) : (
                    <Copy className="h-3 w-3" />
                  )}
                  {copied ? copy.copied : copy.copy}
                </button>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="w-full rounded-xl border border-slate-200 bg-slate-100 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-200 md:py-3 md:text-base"
            >
              {copy.close}
            </button>
          </div>
        </div>
      )}
    </ContactContext.Provider>
  );
}
