"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "glass border-b border-gray-200/50 shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-600 shadow-md shadow-brand-600/25">
            <span className="text-lg font-bold text-white">P</span>
          </div>
          <span className={`text-lg font-bold transition-colors duration-300 ${
            scrolled ? "text-gray-900" : "text-white"
          }`}>
            Printvertise
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          <Link
            href="/werbetechnik"
            className={`text-sm font-medium transition-colors duration-300 ${
              scrolled
                ? "text-gray-600 hover:text-brand-700"
                : "text-white/80 hover:text-white"
            }`}
          >
            Standorte
          </Link>
          <Link
            href="#kontakt"
            className="btn-primary !py-2.5 !px-5 !text-xs"
          >
            Jetzt anfragen
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </nav>

        {/* Mobile menu button */}
        <Link
          href="#kontakt"
          className={`sm:hidden text-sm font-medium transition-colors ${
            scrolled ? "text-brand-600" : "text-white"
          }`}
        >
          Anfragen
        </Link>
      </div>
    </header>
  );
}
