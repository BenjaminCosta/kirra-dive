type KirraLogoProps = {
  className?: string;
  /** Decorative when the logo sits next to a visible wordmark. */
  decorative?: boolean;
};

export function KirraLogo({ className, decorative = false }: KirraLogoProps) {
  return (
    <img
      src="/images/logo.png"
      alt={decorative ? "" : "Kirra Dive"}
      aria-hidden={decorative || undefined}
      className={`${className ?? ""} object-contain`}
    />
  );
}
