import { GraduationCap, LifeBuoy, Waves, type LucideIcon } from "lucide-react";
import { courseJourney, type IconName } from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";
import { cn } from "@/lib/cn";
import { AutoplayVideo } from "./HeroVideo";

const stageIcons: Partial<Record<IconName, LucideIcon>> = {
  "life-buoy": LifeBuoy,
  waves: Waves,
  "graduation-cap": GraduationCap,
};

export function CourseJourney() {
  return (
    <section id="the-course" className="section-overlap section-y">
      <div className="container-page">
        <header className="max-w-2xl">
          <p className="eyebrow">{courseJourney.eyebrow}</p>
          <h2 className="heading-lg mt-4">
            {courseJourney.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-6 text-muted sm:text-lg">{courseJourney.intro}</p>
        </header>

        <ol className="relative mt-14 max-w-xl">
          {/* Thin timeline line running behind the step numbers. */}
          <div
            aria-hidden
            className="absolute top-5 bottom-0 left-5 w-px bg-[linear-gradient(180deg,color-mix(in_srgb,var(--primary)_65%,transparent)_0%,color-mix(in_srgb,var(--primary)_65%,transparent)_72%,transparent_100%)] sm:top-6 sm:left-6"
          />

          {courseJourney.stages.map((stage, index) => {
            const Icon = stageIcons[stage.icon] ?? LifeBuoy;
            const isFirst = index === 0;
            const isLast = index === courseJourney.stages.length - 1;

            return (
              <li
                key={stage.id}
                className={cn(
                  "relative pl-14 sm:pl-20",
                  !isFirst && "pt-12",
                  !isLast && "border-b border-white/10 pb-12",
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 bg-background text-xs font-bold text-primary sm:h-12 sm:w-12 sm:text-sm",
                    isFirst ? "top-0" : "top-12",
                  )}
                >
                  {stage.step}
                </span>

                {/* The iOS-safe clip keeps the same retry logic as the hero.
                    Its poster is a frame from that exact clip, not a stock
                    substitute, so it remains authentic if autoplay is withheld. */}
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/10">
                  {stage.video ? (
                    <AutoplayVideo
                      src={stage.video.src}
                      type={stage.video.type}
                      poster={stage.image.src}
                      className="absolute inset-0 h-full w-full object-cover"
                      playLabel={`Play ${stage.title} video`}
                      playButtonClassName="right-3 bottom-3"
                      iconOnly
                    />
                  ) : (
                    <img
                      src={stage.image.src}
                      alt={stage.image.alt}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                </div>

                <Icon className="mt-5 h-5 w-5 text-primary" aria-hidden />
                <h3 className="heading-sm mt-3">{stage.title}</h3>
                <p className="mt-2 text-muted">{stage.description}</p>
              </li>
            );
          })}
        </ol>

        <a
          href={courseJourney.cta.href}
          className="btn btn-secondary mt-12"
          data-event={trackingEvents.courseJourneyCta}
        >
          {courseJourney.cta.label}
        </a>
      </div>
    </section>
  );
}
