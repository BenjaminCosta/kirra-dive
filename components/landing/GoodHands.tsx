import { GraduationCap, Users, Waves, type LucideIcon } from "lucide-react";
import { goodHands, type IconName } from "@/data/landing-content";
import { AutoplayVideo } from "./HeroVideo";

const pointIcons: Partial<Record<IconName, LucideIcon>> = {
  "graduation-cap": GraduationCap,
  users: Users,
  waves: Waves,
};

/**
 * The page's fourth and quietest visual moment. The copy opens the section and
 * the footage sits in the middle of it — after the subheading, before the
 * reassurance points — as a plain band that fades into the same dark water as
 * everything around it, rather than a fourth full-bleed background.
 */
export function GoodHands() {
  return (
    <section id="good-hands" className="pb-20 sm:pb-28 lg:pb-32">
      <div className="container-page">
        <p className="eyebrow">{goodHands.eyebrow}</p>
        <h2 className="heading-lg mt-3 max-w-xl">
          {goodHands.headingLines.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </h2>
        <p className="mt-5 max-w-xl text-muted sm:text-lg">{goodHands.body}</p>

        {/* A plain rectangle of footage: no frame and no rounded corners, and
            on small screens it runs to both edges of the viewport rather than
            floating inside the container's padding. */}
        <div className="scene -mx-5 mt-9 aspect-16/9 sm:-mx-8 lg:mx-0 lg:aspect-21/9">
          <AutoplayVideo
            src={goodHands.video.src}
            type={goodHands.video.type}
            poster={goodHands.image.src}
            className="scene-photo object-[50%_45%]"
            playLabel="Play beginner diving video"
            playButtonClassName="right-4 bottom-4"
            iconOnly
          />
          {/* Holds the footage a stop below the surrounding sections so it
              reads as part of the same water, not as a bright inset. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_42%,transparent)_0%,color-mix(in_srgb,var(--background)_58%,transparent)_55%,color-mix(in_srgb,var(--background)_85%,transparent)_100%)]"
          />
        </div>

        <ul className="mx-auto mt-9 grid max-w-xl grid-cols-3 divide-x divide-white/10">
          {goodHands.points.map((point) => {
            const Icon = pointIcons[point.icon] ?? Waves;
            return (
              <li key={point.label} className="flex min-w-0 flex-col items-center px-2 py-1 text-center">
                <Icon className="h-6 w-6 text-primary" aria-hidden />
                <p className="mt-3 text-xs font-semibold uppercase tracking-[0.12em] text-text sm:text-sm">
                  {point.label}
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
