import { Check } from "lucide-react";
import { included } from "@/data/landing-content";
import { trackingEvents } from "@/data/tracking";

export function IncludedSection() {
  const { valuePanel } = included;

  return (
    <section id="whats-included" className="section-y">
      <div className="container-page grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <p className="eyebrow">{included.eyebrow}</p>
          <h2 className="heading-lg mt-4">{included.heading}</h2>
          <p className="mt-6 max-w-lg text-lg text-muted">{included.intro}</p>

          <ul className="mt-10 border-y border-white/10">
            {included.items.map((item) => (
              <li
                key={item}
                className="flex items-start gap-4 border-b border-white/10 py-4 last:border-b-0"
              >
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden />
                <span className="text-text">{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-6 text-sm text-muted">{included.itemsNote}</p>
        </div>

        <aside className="surface-panel h-fit p-7 sm:p-9 lg:sticky lg:top-[calc(var(--header-height)+2rem)]">
          <p className="text-4xl font-bold text-text sm:text-5xl">
            {valuePanel.priceLabel}
          </p>
          <p className="mt-3 text-sm text-muted">{valuePanel.priceNote}</p>

          <a
            href={valuePanel.ctaHref}
            className="btn btn-primary mt-7 w-full"
            data-event={trackingEvents.includedCta}
          >
            {valuePanel.ctaLabel}
          </a>

          <hr className="my-8 border-white/10" />

          <h3 className="text-xl font-bold tracking-[0.02em] text-text uppercase">
            {valuePanel.beginnerHeadingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h3>
          <p className="mt-4 text-muted">{valuePanel.beginnerBody}</p>
        </aside>
      </div>
    </section>
  );
}
