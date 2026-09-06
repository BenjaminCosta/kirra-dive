import { ArrowUpRight } from "lucide-react";
import { officialOfferings } from "@/data/landing-content";

export function OfficialOfferings() {
  return (
    <section id="official-experiences" className="section-y border-y border-white/5">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
        <header className="lg:sticky lg:top-[calc(var(--header-height)+2rem)] lg:h-fit">
          <p className="eyebrow">{officialOfferings.eyebrow}</p>
          <h2 className="heading-lg mt-4">{officialOfferings.heading}</h2>
          <p className="mt-6 max-w-lg text-lg text-muted">{officialOfferings.intro}</p>
        </header>

        <ul className="border-y border-white/10">
          {officialOfferings.items.map((item) => (
            <li key={item.href} className="border-b border-white/10 last:border-b-0">
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group block py-7 transition-colors sm:py-8"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-xl font-bold tracking-[0.01em] text-text uppercase sm:text-2xl">
                      {item.title}
                    </h3>
                    <p className="mt-3 max-w-2xl text-muted">{item.description}</p>
                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition-transform duration-200 group-hover:translate-x-1">
                      {item.label}
                      <span className="sr-only"> (opens in a new tab)</span>
                    </span>
                  </div>
                  <ArrowUpRight
                    className="mt-1 h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                    aria-hidden
                  />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
