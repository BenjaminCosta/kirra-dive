import {
  BadgeCheck,
  Clock3,
  ExternalLink,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { contact, footer, navLinks, siteConfig } from "@/data/landing-content";
import { KirraLogo } from "./KirraLogo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-surface/30">
      <div className="container-page grid gap-12 py-16 sm:py-20 md:grid-cols-2 lg:grid-cols-4">
        <div className="lg:col-span-2">
          <div className="flex items-center gap-3">
            <KirraLogo className="h-12 w-12 shrink-0" decorative />
            <span className="leading-tight">
              <span className="block text-sm font-bold tracking-[0.18em] text-text uppercase">
                {siteConfig.name}
              </span>
              <span className="block text-[0.625rem] font-semibold tracking-[0.3em] text-primary uppercase">
                Since {siteConfig.established}
              </span>
            </span>
          </div>
          <p className="mt-6 max-w-sm text-muted">{footer.tagline}</p>

          <p className="mt-8 flex items-start gap-2.5 text-sm">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>
              <span className="block font-semibold text-text">
                {footer.padi.label}
              </span>
              <span className="block text-muted">{footer.padi.note}</span>
            </span>
          </p>
        </div>

        {/* Anchor target for the hero's "Ask a question" CTA. */}
        <div id="contact">
          <h2 className="text-sm font-bold tracking-[0.18em] text-text uppercase">
            {footer.contactHeading}
          </h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <a
                href={`tel:${contact.phone.replace(/\s/g, "")}`}
                className="text-text transition-colors hover:text-primary"
              >
                {contact.phone}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <a
                href={`mailto:${contact.email}`}
                className="text-text transition-colors hover:text-primary"
              >
                {contact.email}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <div>
                <address className="space-y-1 text-muted not-italic">
                  {contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
                <a
                  href={contact.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1.5 text-primary transition-colors hover:text-primary-bright"
                >
                  {footer.mapLabel}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <span className="text-muted">
                <span className="block text-text">{contact.hours}</span>
                <span className="block mt-1">{contact.timeZoneNote}</span>
              </span>
            </li>
          </ul>

          <p className="mt-6 text-xs text-muted">{contact.locationNote}</p>
          <div className="mt-6">
            <h3 className="text-xs font-bold tracking-[0.16em] text-text uppercase">
              {footer.socialHeading}
            </h3>
            <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {contact.socialLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-primary transition-colors hover:text-primary-bright"
                >
                  {link.label}
                  <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-1 lg:gap-10">
          <nav aria-label="Footer">
            <h2 className="text-sm font-bold tracking-[0.18em] text-text uppercase">
              {footer.exploreHeading}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted transition-colors hover:text-text"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-sm font-bold tracking-[0.18em] text-text uppercase">
              {footer.usefulHeading}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {footer.usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
                  >
                    {link.label}
                    <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                    <span className="sr-only">(opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>{footer.copyright(year)}</p>
          <p className="font-semibold tracking-[0.24em] text-primary uppercase">
            Since {siteConfig.established}
          </p>
        </div>
      </div>
    </footer>
  );
}
