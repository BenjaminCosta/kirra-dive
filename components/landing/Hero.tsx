import { CalendarDays, Globe, MessageCircle, ShieldCheck, User, Users } from "lucide-react";
import {
  hero,
  heroTrustSignals,
  pricing,
  seasonalBadge,
  type HeroSignalIcon,
} from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";
import { HeroVideo } from "./HeroVideo";

const signalIcons: Record<Exclude<HeroSignalIcon, "since">, typeof Globe> = {
  globe: Globe,
  users: Users,
  user: User,
};

export function Hero() {
  return (
    <section id="top" className="scene min-h-[100dvh]">
      {/* Scene 1 of 3. Footage behind the scrims, with the still as its poster:
          what shows on first paint and wherever autoplay is refused.
          Highest-priority media on the page, so it loads eagerly. */}
      <HeroVideo
        src={hero.video.src}
        type={hero.video.type}
        poster={hero.image.src}
        className="scene-photo object-[75%_20%] lg:object-[75%_42%]"
        playLabel={hero.video.playLabel}
      />
      {/* Diagonal scrim: keeps the text column legible, leaves the diver visible
          on the right. Lighter than a flat wash — it never reaches full opacity,
          so the footage still reads through the left side; the bottom fade below
          does the rest of the work under the type. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,color-mix(in_srgb,var(--background)_86%,transparent)_5%,color-mix(in_srgb,var(--background)_60%,transparent)_32%,color-mix(in_srgb,var(--background)_18%,transparent)_58%,transparent_74%)] lg:bg-[linear-gradient(115deg,color-mix(in_srgb,var(--background)_72%,transparent)_5%,color-mix(in_srgb,var(--background)_44%,transparent)_32%,color-mix(in_srgb,var(--background)_10%,transparent)_58%,transparent_74%)]"
      />
      {/* Top scrim: keeps the header and eyebrow readable against bright water. */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_55%,transparent)_0%,transparent_24%)] lg:bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_34%,transparent)_0%,transparent_24%)]"
      />
      {/* Shared fade-out: the water dissolves into the page ground behind the
          trust row, so the next section can start inside it. */}
      <div
        aria-hidden
        className="scene-fade-out lg:bg-[linear-gradient(to_bottom,transparent_52%,color-mix(in_srgb,var(--background)_50%,transparent)_84%,var(--background)_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(65%_45%_at_82%_0%,color-mix(in_srgb,var(--aqua)_14%,transparent)_0%,transparent_70%)]"
      />

      <div className="container-page relative flex min-h-[100dvh] flex-col justify-end pt-[calc(var(--header-height)+6rem)] pb-14 sm:pt-[calc(var(--header-height)+8rem)] sm:pb-16 lg:pt-[calc(var(--header-height)+10rem)]">
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
              target="_blank"
              rel="noopener noreferrer"
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

        <ul className="mt-10 grid grid-cols-4 divide-x divide-white/10 border-t border-white/10 pt-8">
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
