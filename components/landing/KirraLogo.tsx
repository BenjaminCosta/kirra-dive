type KirraLogoProps = {
  className?: string;
  /** Decorative when the logo sits next to a visible wordmark. */
  decorative?: boolean;
};

/**
 * PLACEHOLDER MARK.
 * Swap the SVG contents for the supplied Kirra Dive circular logo (or replace
 * this component with <Image src="/images/kirra-dive-logo.svg" ... />). Kept
 * inline so the header costs no extra request and inherits brand colours.
 */
export function KirraLogo({ className, decorative = false }: KirraLogoProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      role={decorative ? "presentation" : "img"}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : "Kirra Dive"}
      focusable="false"
    >
      <circle cx="32" cy="32" r="31" fill="var(--ocean)" />
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="var(--primary)"
        strokeWidth="1.5"
      />
      <circle cx="32" cy="21" r="3.2" fill="var(--aqua)" />
      <circle cx="41" cy="16" r="1.6" fill="var(--aqua)" opacity="0.7" />
      <circle cx="46" cy="21.5" r="1" fill="var(--aqua)" opacity="0.5" />
      <g
        fill="none"
        stroke="var(--text)"
        strokeWidth="2.6"
        strokeLinecap="round"
      >
        <path d="M13 34q9.5-7 19 0t19 0" />
        <path d="M13 43q9.5-7 19 0t19 0" opacity="0.75" />
      </g>
    </svg>
  );
}
