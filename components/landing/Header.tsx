"use client";

import { useEffect, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import { contact, header, navLinks } from "@/data/landing-content";
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

    // Full-screen drawer: keep the page behind it still.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const solid = scrolled || menuOpen;
  const whatsappHref = contact.whatsappUrl ?? contact.fallbackAnchors.whatsapp;
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 md:top-3">
        <div
          className={cn(
            "mx-auto flex h-[var(--header-height)] items-center justify-between gap-4 border-b px-5 transition-all duration-300 sm:px-8",
            "md:grid md:h-[4.75rem] md:max-w-4xl md:grid-cols-[auto_1fr_auto] md:gap-8 md:rounded-full md:border-x md:border-t md:px-7",
            solid
              ? "border-white/10 bg-background/85 backdrop-blur-md"
              : "border-transparent bg-transparent md:border-white/15 md:bg-background/25 md:backdrop-blur-md",
          )}
        >
          <a
            href="#top"
            className="flex items-center gap-3"
            aria-label={header.homeLabel}
          >
            <KirraLogo className="h-9 w-9 shrink-0 md:h-11 md:w-11" />
            <span className="leading-tight">
              <span className="block text-xs font-bold tracking-[0.16em] text-text uppercase sm:text-sm">
                Kirra Dive
              </span>
              <span className="block text-[0.6rem] font-semibold tracking-[0.28em] text-primary uppercase sm:text-[0.625rem]">
                Since 1988
              </span>
            </span>
          </a>

          <nav className="hidden md:flex md:justify-center" aria-label="Primary">
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
              className="hidden btn btn-sm btn-primary md:inline-flex"
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
      </header>

      {/* Full-screen mobile drawer. Sits above the sticky CTA bar, below the header bar. */}
      <div
        id="mobile-nav"
        aria-hidden={!menuOpen || undefined}
        inert={!menuOpen}
        className={cn(
          "fixed inset-0 z-[45] flex flex-col bg-background/98 backdrop-blur-md transition-opacity duration-300 md:hidden",
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      >
        <div aria-hidden className="h-[var(--header-height)] shrink-0" />
        <nav
          aria-label="Primary mobile"
          className="container-page flex flex-1 flex-col overflow-y-auto py-10"
        >
          <ul className="flex flex-col divide-y divide-white/10 border-y border-white/10">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="block py-5 text-2xl font-bold tracking-tight text-text uppercase transition-colors hover:text-primary"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-col gap-3">
            <a
              href={header.ctaHref}
              onClick={closeMenu}
              className="btn btn-primary w-full"
              data-event={trackingEvents.headerCta}
            >
              {header.ctaLabel}
            </a>
            <a
              href={whatsappHref}
              onClick={closeMenu}
              className="btn btn-secondary w-full"
              data-event={trackingEvents.whatsappClick}
            >
              <MessageCircle className="h-4 w-4" aria-hidden />
              {header.whatsappLabel}
            </a>
          </div>
        </nav>
      </div>
    </>
  );
}
