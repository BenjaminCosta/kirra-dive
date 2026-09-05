import {
  Award,
  CalendarDays,
  Droplets,
  Glasses,
  GraduationCap,
  Heart,
  Info,
  LifeBuoy,
  MessageCircle,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { included, pricing, type IconName } from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";

const itemIcons: Partial<Record<IconName, LucideIcon>> = {
  "graduation-cap": GraduationCap,
  waves: Waves,
  droplets: Droplets,
  glasses: Glasses,
  award: Award,
  users: Users,
  "life-buoy": LifeBuoy,
};

export function IncludedSection() {
  const { valuePanel } = included;

  return (
    <section id="whats-included" className="section-y">
      <div className="container-page">
        <div className="max-w-2xl">
          <p className="eyebrow">{included.eyebrow}</p>
          <h2 className="heading-lg mt-4">{included.heading}</h2>
          <p className="mt-6 max-w-lg text-muted sm:text-lg">
            {included.intro}
          </p>
        </div>

        <ul className="mt-10 max-w-2xl border-y border-white/10">
          {included.items.map((item) => {
            const Icon = itemIcons[item.icon] ?? Waves;
            return (
              <li
                key={item.label}
                className="flex items-center gap-4 border-b border-white/10 py-4 last:border-b-0"
              >
                <Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span className="text-text">{item.label}</span>
              </li>
            );
          })}
        </ul>

        <p className="mt-6 flex max-w-2xl items-start gap-2.5 text-sm text-muted">
          <Info className="mt-px h-4 w-4 shrink-0 text-primary" aria-hidden />
          {included.itemsNote}
        </p>

        {/* Pricing — the one prominent, full-width surface in this section. */}
        <div className="relative mt-12 overflow-hidden rounded-3xl border border-white/10">
          {/*
            PLACEHOLDER IMAGE: dark oceanic gradient stands in for real
            photography behind the pricing card until that asset is ready.
          */}
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(115deg,var(--background)_0%,var(--background)_45%,var(--ocean)_100%)]"
          />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[radial-gradient(55%_75%_at_100%_50%,color-mix(in_srgb,var(--aqua)_30%,transparent)_0%,transparent_70%)]"
          />

          <div className="p-7 sm:p-10">
            <p className="eyebrow">From</p>
            <p className="mt-2 text-5xl font-extrabold text-text sm:text-6xl">
              {pricing.amount}
            </p>
            <p className="mt-2 text-sm text-muted">{pricing.note}</p>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href={valuePanel.ctaHref}
                className="btn btn-primary w-full"
                data-event={trackingEvents.includedCta}
              >
                <CalendarDays className="h-5 w-5" aria-hidden />
                {valuePanel.ctaLabel}
              </a>
              <a
                href={valuePanel.secondaryCta.href}
                className="btn btn-secondary w-full"
                data-event={trackingEvents.whatsappClick}
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                {valuePanel.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>

        {/* New to diving — second, calmer surface. */}
        <div className="surface-panel relative mt-6 overflow-hidden p-7 sm:p-10">
          <div
            aria-hidden
            className="absolute top-7 right-7 sm:top-9 sm:right-9"
          >
            <span className="absolute -top-6 right-2 h-1 w-1 rounded-full border border-primary/40" />
            <span className="absolute -top-3 -right-1 h-1.5 w-1.5 rounded-full border border-primary/50" />
            <span className="flex h-14 w-14 items-center justify-center rounded-full border border-primary/40">
              <Heart className="h-6 w-6 text-primary" />
            </span>
          </div>

          <p className="eyebrow">{valuePanel.beginnerEyebrow}</p>
          <h3 className="heading-lg mt-3 max-w-sm">
            {valuePanel.beginnerHeadingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
          <p className="mt-4 max-w-md text-muted">{valuePanel.beginnerBody}</p>
        </div>
      </div>
    </section>
  );
}
