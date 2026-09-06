import { CalendarDays, MessageCircle } from "lucide-react";
import { finalCta } from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";

/**
 * Scene 3 of 3. The page closes by going back to the water it opened on: the
 * last full-bleed photograph, fading in from the dark of the enquiry form and
 * out again into the footer.
 */
export function FinalCta() {
  return (
    <section
      id="final-cta"
      className="scene section-overlap flex min-h-[80svh] items-end sm:min-h-[85svh]"
    >
      {/* AI-generated stock photo — replace with real Kirra Dive photography. */}
      <img
        src={finalCta.image.src}
        alt=""
        aria-hidden
        className="scene-photo object-[62%_38%]"
      />
      <div aria-hidden className="scene-fade-in" />
      <div aria-hidden className="scene-fade-out" />
      <div aria-hidden className="scene-glow" />

      <div className="container-page relative pb-16 sm:pb-20">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-end lg:gap-16">
          <div>
            <p className="heading-lg text-primary">
              {finalCta.eyebrow.split(". ").map((line, index, lines) => (
                <span key={line} className="block">
                  {index < lines.length - 1 ? `${line}.` : line}
                </span>
              ))}
            </p>
          </div>

          <div>
            <h2 className="heading-lg">
              {finalCta.headingLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h2>
            <p className="mt-4 max-w-md text-muted sm:text-lg">{finalCta.body}</p>

            <div className="mt-7 flex flex-col gap-3 sm:max-w-sm">
              <a
                href={finalCta.primaryCta.href}
                className="btn btn-primary w-full py-4"
                data-event={trackingEvents.heroPrimaryCta}
              >
                <CalendarDays className="h-5 w-5" aria-hidden />
                {finalCta.primaryCta.label}
              </a>
              <a
                href={finalCta.secondaryCta.href}
                className="btn btn-secondary w-full py-4"
                data-event={trackingEvents.whatsappClick}
              >
                <MessageCircle className="h-5 w-5" aria-hidden />
                {finalCta.secondaryCta.label}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
