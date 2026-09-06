import { ExternalLink, Quote } from "lucide-react";
import { reviews, type Review } from "@/data/landing-content";
import { cn } from "@/lib/cn";

function Attribution({
  review,
  compact = false,
}: {
  review: Review;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mt-4" : "mt-5"}>
      <p
        className={cn(
          "font-bold text-text uppercase",
          compact ? "text-xs tracking-[0.04em]" : "text-sm tracking-[0.12em]",
        )}
      >
        {review.name}
      </p>
      <p className={cn("mt-1 text-muted", compact ? "text-xs" : "text-sm")}>
        {review.date}
      </p>
      <a
        href={review.url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          "mt-2 inline-flex items-center gap-1.5 text-primary transition-colors hover:text-primary-bright",
          compact ? "text-xs" : "text-sm",
        )}
      >
        {review.source}
        <ExternalLink className="h-3.5 w-3.5" aria-hidden />
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </div>
  );
}

function ReviewCard({
  review,
  featured = false,
}: {
  review: Review;
  featured?: boolean;
}) {
  return (
    <figure
      className={cn(
        "surface-panel relative",
        featured ? "p-7 sm:p-9" : "p-4 sm:p-6",
      )}
    >
      <Quote
        className={featured ? "h-7 w-7 text-primary/70" : "h-5 w-5 text-primary/70"}
        aria-hidden
      />
      <blockquote
        className={cn(
          "pr-6 font-semibold text-text",
          featured ? "mt-4 text-xl sm:text-2xl" : "mt-3 text-sm sm:text-base",
        )}
      >
        “{review.quote}”
      </blockquote>
      <div
        className={cn(
          "h-px bg-primary/40",
          featured ? "mt-5 w-10" : "mt-3 w-6",
        )}
        aria-hidden
      />
      <figcaption>
        <Attribution review={review} compact={!featured} />
      </figcaption>
    </figure>
  );
}

export function ReviewsSection() {
  return (
    <section id="reviews" className="relative section-y">
      <div className="container-page">
        <header className="max-w-2xl">
          <p className="eyebrow">{reviews.eyebrow}</p>
          <h2 className="heading-xl mt-4">
            {reviews.headingLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mt-5 text-sm text-muted">{reviews.sourceNote}</p>
        </header>

        <div className="mt-8 flex max-w-2xl flex-col gap-6">
          <ReviewCard review={reviews.featured} featured />

          <div className="grid grid-cols-2 gap-3 sm:gap-6">
            {reviews.secondary.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
