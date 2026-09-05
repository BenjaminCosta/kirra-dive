import { CalendarDays, Globe, MessageCircle, ShieldCheck, User, Users } from "lucide-react";
import {
  hero,
  heroTrustSignals,
  pricing,
  seasonalBadge,
  type HeroSignalIcon,
} from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";

const signalIcons: Record<Exclude<HeroSignalIcon, "since">, typeof Globe> = {
  globe: Globe,
  users: Users,
  user: User,
};

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pb-14 sm:pb-16">
      {/*
        PLACEHOLDER BACKGROUND: a dark oceanic gradient stands in for the real
        hero photo/video (see `hero.image`) until that asset is ready.
      */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--ocean)_0%,var(--background)_60%,var(--background)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(65%_45%_at_82%_0%,color-mix(in_srgb,var(--aqua)_28%,transparent)_0%,transparent_70%)]"
      />

      <div className="container-page relative pt-[calc(var(--header-height)+2rem)]">
        <div className="max-w-xl">
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

          <p className="mt-6 max-w-sm text-base text-muted sm:text-lg">
            {hero.subheading}
          </p>

          <div className="mt-8 flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <p className="text-2xl font-extrabold text-text sm:text-3xl">
              {pricing.from}
            </p>
            <p className="text-sm text-muted">{pricing.note}</p>
          </div>

          <div className="mt-7 flex flex-col gap-3">
            <a
              href={hero.primaryCta.href}
              className="btn btn-primary w-full py-4"
              data-event={trackingEvents.heroPrimaryCta}
            >
              <CalendarDays className="h-5 w-5" aria-hidden />
              {hero.primaryCta.label}
            </a>
            <a
              href={hero.secondaryCta.href}
              className="btn btn-secondary w-full py-4"
              data-event={trackingEvents.heroSecondaryCta}
            >
              <MessageCircle className="h-5 w-5" aria-hidden />
              {hero.secondaryCta.label}
            </a>
          </div>

          {/* Risk-reduction line. */}
          <p className="mt-6 flex items-start gap-2.5 text-sm text-muted">
            <ShieldCheck
              className="mt-px h-4 w-4 shrink-0 text-primary"
              aria-hidden
            />
            {hero.reassurance}
          </p>
        </div>

        <ul className="mt-8 grid grid-cols-4 divide-x divide-white/10 rounded-3xl border border-white/15 py-6">
          {heroTrustSignals.map((signal) => {
            const Icon = signal.icon === "since" ? null : signalIcons[signal.icon];
            return (
              <li
                key={signal.label}
                className="flex flex-col items-center gap-2 px-2 text-center sm:px-4"
              >
                {Icon ? (
                  <Icon className="h-7 w-7 text-primary" aria-hidden />
                ) : (
                  <span
                    className="flex h-11 w-11 items-center justify-center rounded-full border border-primary/60 text-[0.6rem] font-bold text-primary"
                    aria-hidden
                  >
                    1988
                  </span>
                )}
                <p className="text-[0.7rem] leading-tight font-bold tracking-[0.04em] text-text uppercase sm:text-xs">
                  {signal.label}
                </p>
                <p className="text-[0.7rem] leading-tight text-muted sm:text-xs">
                  {signal.detail}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
