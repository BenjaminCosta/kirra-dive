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
      className="scene section-overlap flex min-h-[92svh] items-end"
    >
      {/* Scene 2 of 3. Reef footage in place of the still, carried by the same
          scrims below: it reads as moving water behind the copy, not as a clip.
          The still stays as the poster for the first paint and for anyone whose
          browser refuses to autoplay. */}
      <video
        aria-hidden
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={cookIsland.image.src}
        className="scene-photo object-[50%_30%]"
      >
        <source src={cookIsland.video.src} type={cookIsland.video.type} />
      </video>
      {/* Resolves out of the dark above it, and back into it below. Both fades
          are shorter and lighter than the shared `.scene-*` recipe: the footage
          carries its own motion, so it only needs enough scrim to meet the dark
          at the seams, not a veil over the whole frame. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,var(--background)_0%,color-mix(in_srgb,var(--background)_42%,transparent)_9%,transparent_26%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_bottom,transparent_55%,color-mix(in_srgb,var(--background)_55%,transparent)_82%,var(--background)_100%)]"
      />
      <div aria-hidden className="scene-glow" />
      {/* Extra weight at the foot of the scene, where the type sits — held to
          the lower third so the reef above it stays visible. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(to_top,var(--background)_0%,color-mix(in_srgb,var(--background)_66%,transparent)_26%,transparent_58%)]"
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
