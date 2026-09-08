import { Info } from "lucide-react";
import { cookIsland, cookIslandAttributes } from "@/data/landing-content";
import { AutoplayVideo } from "./HeroVideo";

export function CookIslandFeature() {
  return (
    <section
      id="the-experience"
      className="scene section-overlap flex min-h-[92svh] items-end"
    >
      {/* The manual control appears in the open upper corner, above the copy,
          only if iOS withholds playback. */}
      <AutoplayVideo
        src={cookIsland.video.src}
        type={cookIsland.video.type}
        poster={cookIsland.image.src}
        className="scene-photo object-[50%_30%]"
        playLabel="Play Cook Island video"
        playButtonClassName="top-5 right-5 sm:top-8 sm:right-8"
        iconOnly
      />
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

          <ul className="mt-9 grid max-w-xl grid-cols-3 divide-x divide-white/10">
            {cookIslandAttributes.map((attribute) => {
              return (
                <li
                  key={attribute.label}
                  className="flex min-w-0 flex-col items-center px-2 py-1 text-center"
                >
                  <p className="text-[0.55rem] leading-tight font-bold tracking-[0.06em] text-text uppercase sm:text-xs">
                    {attribute.label}
                  </p>
                  <p className="mt-2 text-xs leading-snug text-muted sm:text-sm">
                    {attribute.detail}
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
