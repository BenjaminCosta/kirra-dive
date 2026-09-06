import { Heart, ShieldCheck, Users, Waves, type LucideIcon } from "lucide-react";
import { goodHands, type IconName } from "@/data/landing-content";

const pointIcons: Partial<Record<IconName, LucideIcon>> = {
  "shield-check": ShieldCheck,
  users: Users,
  heart: Heart,
};

/**
 * The page's fourth and quietest visual moment: a half-width photograph that
 * fades into the same dark water as everything around it, rather than a fourth
 * full-bleed background.
 */
export function GoodHands() {
  return (
    <section id="good-hands" className="pb-20 sm:pb-28 lg:pb-32">
      <div className="container-page">
        <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
          {/* AI-generated stock photo — replace with a real instructor photo. */}
          <div className="scene aspect-4/3 rounded-3xl border border-white/10 sm:aspect-16/9 lg:aspect-4/3">
            <img
              src={goodHands.image.src}
              alt={goodHands.image.alt}
              className="scene-photo object-[50%_45%]"
            />
            {/* Holds the photo a stop below the surrounding sections so it
                reads as part of the same water, not as a bright inset. */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,color-mix(in_srgb,var(--background)_42%,transparent)_0%,color-mix(in_srgb,var(--background)_58%,transparent)_55%,color-mix(in_srgb,var(--background)_85%,transparent)_100%)]"
            />
          </div>

          <div>
            <p className="eyebrow">{goodHands.eyebrow}</p>
            <h2 className="heading-lg mt-3 max-w-sm">
              {goodHands.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-5 max-w-md text-muted sm:text-lg">{goodHands.body}</p>

            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {goodHands.points.map((point) => {
                const Icon = pointIcons[point.icon] ?? Waves;
                return (
                  <li key={point.label} className="flex flex-col gap-2.5">
                    <Icon className="h-5 w-5 text-primary" aria-hidden />
                    <p className="text-sm leading-snug text-muted">{point.label}</p>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
