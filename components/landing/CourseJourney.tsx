import { GraduationCap, LifeBuoy, Waves, type LucideIcon } from "lucide-react";
import { courseJourney, type IconName } from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";
import { cn } from "@/lib/cn";

const stageIcons: Partial<Record<IconName, LucideIcon>> = {
  "life-buoy": LifeBuoy,
  waves: Waves,
  "graduation-cap": GraduationCap,
};

export function CourseJourney() {
  return (
    <section id="the-course" className="section-y">
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

                {/*
                  PLACEHOLDER IMAGE: dark oceanic gradient stands in for
                  `stage.image` until real photography is ready.
                */}
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-2xl border border-white/10">
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[linear-gradient(160deg,var(--ocean)_0%,var(--background)_100%)]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-[radial-gradient(55%_55%_at_25%_20%,color-mix(in_srgb,var(--aqua)_22%,transparent)_0%,transparent_75%)]"
                  />
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
