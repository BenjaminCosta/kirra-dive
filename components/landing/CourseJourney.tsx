import Image from "next/image";
import { courseJourney } from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";

export function CourseJourney() {
  return (
    <section id="the-course" className="section-y">
      <div className="container-page">
        <header className="max-w-3xl">
          <p className="eyebrow">{courseJourney.eyebrow}</p>
          <h2 className="heading-lg mt-4">{courseJourney.heading}</h2>
          <p className="mt-6 text-lg text-muted">{courseJourney.intro}</p>
        </header>

        <ol className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {courseJourney.stages.map((stage) => (
            <li key={stage.id}>
              <div className="relative aspect-4/3 overflow-hidden rounded-2xl border border-white/10">
                <Image
                  src={stage.image.src}
                  alt={stage.image.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover"
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-linear-to-t from-background/70 to-transparent"
                />
              </div>

              {/* Number plus a hairline that reads as one continuous journey. */}
              <div className="mt-6 flex items-center gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary/50 bg-surface text-sm font-bold text-primary">
                  {stage.step}
                </span>
                <span
                  aria-hidden
                  className="hidden h-px flex-1 bg-linear-to-r from-primary/40 to-transparent md:block"
                />
              </div>

              <h3 className="heading-sm mt-5">{stage.title}</h3>
              <p className="mt-3 text-muted">{stage.description}</p>
            </li>
          ))}
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
