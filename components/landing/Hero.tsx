import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { hero, pricing, seasonalBadge } from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-[92svh] items-end overflow-hidden pt-[calc(var(--header-height)+3rem)] pb-24 sm:pb-28 lg:min-h-svh"
    >
      <Image
        src={hero.image.src}
        alt={hero.image.alt}
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Dark gradients keep the type legible over photography. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/60 to-background/10"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-r from-background/85 via-background/30 to-transparent"
      />

      <div className="container-page relative">
        <div className="max-w-3xl">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            <p className="eyebrow">{hero.eyebrow}</p>
            {/* Seasonal badge stays hidden until the season is confirmed. */}
            {seasonalBadge.enabled ? (
              <span className="rounded-full border border-aqua/40 bg-aqua/10 px-3 py-1 text-xs font-semibold tracking-[0.16em] text-aqua uppercase">
                {seasonalBadge.label}
              </span>
            ) : null}
          </div>

          <h1 className="heading-xl mt-5">
            {hero.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
            {hero.subheading}
          </p>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="text-2xl font-bold text-text sm:text-3xl">
              {pricing.from}
            </p>
            <p className="text-sm text-muted">{pricing.note}</p>
          </div>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={hero.primaryCta.href}
              className="btn btn-primary"
              data-event={trackingEvents.heroPrimaryCta}
            >
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="btn btn-secondary"
              data-event={trackingEvents.heroSecondaryCta}
            >
              {hero.secondaryCta.label}
            </a>
          </div>

          {/* Risk-reduction line. */}
          <p className="mt-7 flex items-start gap-2.5 text-sm text-muted">
            <ShieldCheck
              className="mt-px h-4 w-4 shrink-0 text-primary"
              aria-hidden
            />
            {hero.reassurance}
          </p>
        </div>
      </div>
    </section>
  );
}
