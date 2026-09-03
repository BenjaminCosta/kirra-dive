"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { header, navLinks } from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";
import { cn } from "@/lib/cn";
import { KirraLogo } from "./KirraLogo";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const solid = scrolled || menuOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solid
          ? "border-white/10 bg-background/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-[var(--header-height)] items-center justify-between gap-4">
        <a
          href="#top"
          className="flex items-center gap-3 rounded-full"
          aria-label={header.homeLabel}
        >
          <KirraLogo className="h-10 w-10 shrink-0 md:h-12 md:w-12" />
          <span className="hidden leading-tight sm:block">
            <span className="block text-sm font-bold tracking-[0.18em] text-text uppercase">
              Kirra Dive
            </span>
            <span className="block text-[0.625rem] font-semibold tracking-[0.3em] text-primary uppercase">
              Since 1988
            </span>
          </span>
        </a>

        <nav className="hidden md:block" aria-label="Primary">
          <ul className="flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm font-semibold text-muted transition-colors hover:text-text"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={header.ctaHref}
            className="btn btn-sm btn-primary"
            data-event={trackingEvents.headerCta}
          >
            {header.ctaLabel}
          </a>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-text transition-colors hover:border-primary hover:text-primary md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? header.menuCloseLabel : header.menuOpenLabel}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? (
              <X className="h-5 w-5" aria-hidden />
            ) : (
              <Menu className="h-5 w-5" aria-hidden />
            )}
          </button>
        </div>
      </div>

      <nav
        id="mobile-nav"
        hidden={!menuOpen}
        aria-label="Primary mobile"
        className="border-t border-white/10 bg-background md:hidden"
      >
        <ul className="container-page flex flex-col py-2">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="block border-b border-white/5 py-3.5 text-sm font-semibold text-muted transition-colors last:border-b-0 hover:text-text"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
