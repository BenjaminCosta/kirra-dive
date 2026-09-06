import { BadgeCheck, Clock3, ExternalLink, Mail, MapPin, Phone } from "lucide-react";
import { contact, footer, siteConfig } from "@/data/landing-content";
import { KirraLogo } from "./KirraLogo";

/** Simple line-icon glyphs, drawn to match the Lucide stroke style used everywhere else. */
function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

const socialIcons: Record<string, typeof InstagramIcon> = {
  Instagram: InstagramIcon,
  Facebook: FacebookIcon,
};

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer id="site-footer" className="relative">
      <div className="container-page pt-10 pb-14 sm:pt-12 sm:pb-16">
        <div className="flex items-center gap-3">
          <KirraLogo className="h-11 w-11 shrink-0" decorative />
          <span className="leading-tight">
            <span className="block text-sm font-bold tracking-[0.18em] text-text uppercase">
              {siteConfig.name}
            </span>
            <span className="block text-[0.625rem] font-semibold tracking-[0.3em] text-primary uppercase">
              Since {siteConfig.established}
            </span>
          </span>
        </div>
        <p className="mt-5 max-w-sm text-sm text-muted">{footer.tagline}</p>

        {/* Explore / Contact — two columns even on mobile, per the minimalist brief. */}
        <div className="mt-12 grid grid-cols-2 gap-8 border-t border-white/10 pt-10 sm:gap-16 md:max-w-md">
          <nav aria-label="Footer">
            <h2 className="text-xs font-bold tracking-[0.18em] text-text uppercase">
              {footer.exploreHeading}
            </h2>
            <ul className="mt-5 space-y-3 text-sm">
              {footer.exploreLinks.map((link) => (
                <li key={link.label}>
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

          <div id="contact">
            <h2 className="text-xs font-bold tracking-[0.18em] text-text uppercase">
              {footer.contactHeading}
            </h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={`tel:${contact.phone.replace(/\s/g, "")}`}
                  className="text-text transition-colors hover:text-primary"
                >
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <a
                  href={`mailto:${contact.email}`}
                  className="text-text break-all transition-colors hover:text-primary"
                >
                  {contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
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
              <li className="flex items-start gap-2.5">
                <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                <span className="text-muted">
                  <span className="block text-text">{contact.hours}</span>
                  <span className="mt-1 block">{contact.timeZoneNote}</span>
                </span>
              </li>
            </ul>
            <p className="mt-5 text-xs text-muted">{contact.locationNote}</p>
          </div>
        </div>

        {footer.padi.confirmed ? (
          <p className="mt-10 flex items-start gap-2.5 border-t border-white/10 pt-8 text-sm">
            <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
            <span>
              <span className="block font-semibold text-text">
                {footer.padi.label}
              </span>
              <span className="block text-muted">{footer.padi.note}</span>
            </span>
          </p>
        ) : null}

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
            {footer.legalLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-text"
                >
                  {link.label}
                </a>
            ))}
          </div>

          {footer.socialLinks.length > 0 ? (
            <div className="flex items-center gap-4">
              {footer.socialLinks.map((link) => {
                const Icon = socialIcons[link.label];
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="text-muted transition-colors hover:text-primary"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          ) : null}
        </div>

        <p className="mt-8 text-xs text-muted">{footer.copyright(year)}</p>
      </div>
    </footer>
  );
}
