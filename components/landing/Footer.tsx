import { BadgeCheck, Mail, MapPin, Phone } from "lucide-react";
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
              {contact.phone ? (
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="text-text transition-colors hover:text-primary"
                >
                  {contact.phone}
                </a>
              ) : (
                <span className="text-muted">{footer.phoneLabel}</span>
              )}
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              {contact.email ? (
                <a
                  href={`mailto:${contact.email}`}
                  className="text-text transition-colors hover:text-primary"
                >
                  {contact.email}
                </a>
              ) : (
                <span className="text-muted">{footer.emailLabel}</span>
              )}
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
              <address className="space-y-1 text-muted not-italic">
                {contact.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
            </li>
          </ul>
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
              {footer.legalHeading}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {footer.legalLinks.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      className="text-muted transition-colors hover:text-text"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <span className="text-muted">
                      {link.label}{" "}
                      <span className="text-white/40">
                        ({footer.linkPlaceholderNote})
                      </span>
                    </span>
                  )}
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
