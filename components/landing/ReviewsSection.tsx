import { ExternalLink, Quote } from "lucide-react";
import { reviews, type Review } from "@/data/landing-content";

function Attribution({ review }: { review: Review }) {
  return (
    <div className="mt-6">
      <p className="text-sm font-bold tracking-[0.12em] text-text uppercase">
        {review.name}
      </p>
      <p className="mt-1 text-sm text-muted">{review.date}</p>
      <a
        href={review.url}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-1.5 text-sm text-primary transition-colors hover:text-primary-bright"
      >
        {review.source}
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="section-y border-y border-white/5 bg-surface/25">
      <div className="container-page">
        <header className="max-w-3xl">
          <p className="eyebrow">{reviews.eyebrow}</p>
          <h2 className="heading-lg mt-4">{reviews.heading}</h2>
          <p className="mt-5 text-sm text-muted">{reviews.sourceNote}</p>
        </header>

        <div className="mt-12 grid gap-8 lg:grid-cols-3 lg:gap-10">
          <figure className="surface-panel p-7 sm:p-10 lg:col-span-2">
            <Quote className="h-8 w-8 text-primary/70" aria-hidden />
            <blockquote className="mt-5 text-2xl leading-snug font-semibold text-text sm:text-3xl">
              {reviews.featured.quote}
            </blockquote>
            <figcaption>
              <Attribution review={reviews.featured} />
            </figcaption>
          </figure>

          <div className="flex flex-col gap-8 lg:gap-10">
            {reviews.secondary.map((review) => (
              <figure
                key={review.id}
                className="border-l-2 border-primary/40 pl-6"
              >
                <blockquote className="text-lg text-text">
                  {review.quote}
                </blockquote>
                <figcaption>
                  <Attribution review={review} />
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
