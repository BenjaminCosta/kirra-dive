import { Info, Shell, Sun, Waves, type LucideIcon } from "lucide-react";
import {
  cookIsland,
  cookIslandAttributes,
  type IconName,
} from "@/data/landing-content";

const attributeIcons: Partial<Record<IconName, LucideIcon>> = {
  waves: Waves,
  shell: Shell,
  sun: Sun,
};

export function CookIslandFeature() {
  return (
    <section
      id="the-experience"
      className="relative isolate flex min-h-[92svh] items-end overflow-hidden"
    >
      {/*
        PLACEHOLDER BACKGROUND: a dark oceanic gradient stands in for the real
        reef photography (see `cookIsland.image`) until that asset is ready.
      */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,var(--ocean)_0%,var(--background)_65%,var(--background)_100%)]"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(70%_55%_at_50%_0%,color-mix(in_srgb,var(--aqua)_32%,transparent)_0%,transparent_65%)]"
      />
      {/* Strong gradient keeps the overlaid type legible over the "photo". */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-linear-to-t from-background via-background/85 to-transparent"
      />

      <div className="container-page relative pb-16 sm:pb-20">
        <div className="max-w-xl">
          <p className="eyebrow">{cookIsland.eyebrow}</p>
          <p className="mt-3 text-sm font-bold tracking-[0.2em] text-muted uppercase">
            {cookIsland.kicker}
          </p>

          <h2 className="heading-xl mt-3">
            {cookIsland.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>

          <p className="mt-5 max-w-md text-muted sm:text-lg">
            {cookIsland.body}
          </p>

          <p className="mt-6 flex items-start gap-2.5 text-sm text-muted">
            <Info className="mt-px h-4 w-4 shrink-0 text-primary" aria-hidden />
            {cookIsland.disclaimer}
          </p>

          <ul className="mt-9 grid grid-cols-3 divide-x divide-white/10">
            {cookIslandAttributes.map((attribute) => {
              const Icon = attributeIcons[attribute.icon] ?? Waves;
              return (
                <li
                  key={attribute.label}
                  className="flex flex-col gap-2 px-3 first:pl-0 last:pr-0"
                >
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                  <p className="text-xs leading-tight font-bold tracking-[0.04em] text-text uppercase">
                    {attribute.label}
                  </p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
