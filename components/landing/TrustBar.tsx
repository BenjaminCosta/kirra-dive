import { Anchor, BadgeCheck, HeartHandshake, type LucideIcon } from "lucide-react";
import { trustSignals, type IconName } from "@/data/landing-content";

const icons: Partial<Record<IconName, LucideIcon>> = {
  anchor: Anchor,
  "badge-check": BadgeCheck,
  "heart-handshake": HeartHandshake,
};

export function TrustBar() {
  return (
    <section
      aria-label="Why divers learn with Kirra Dive"
      className="relative z-10 -mt-14 sm:-mt-16"
    >
      <div className="container-page">
        <ul className="grid gap-3 sm:grid-cols-3">
          {trustSignals.map((signal) => {
            const Icon = icons[signal.icon] ?? BadgeCheck;
            return (
              <li
                key={signal.label}
                className="flex items-start gap-3 rounded-2xl border border-white/10 bg-surface/80 px-5 py-4 backdrop-blur-sm"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <div>
                  <p className="text-sm font-bold tracking-[0.12em] text-text uppercase">
                    {signal.label}
                  </p>
                  <p className="mt-1 text-sm text-muted">{signal.detail}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
