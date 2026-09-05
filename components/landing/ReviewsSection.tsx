import { ExternalLink, Quote, Star } from "lucide-react";
import { reviews, type Review } from "@/data/landing-content";
import { cn } from "@/lib/cn";

/** Google's four-colour "G" mark, used to signal these reviews come from Google. */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={className} aria-hidden focusable="false">
      <path
        fill="#4285F4"
        d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2582h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.6151z"
      />
      <path
        fill="#34A853"
        d="M9 18c2.43 0 4.4673-.8064 5.9564-2.1818l-2.9087-2.2582c-.8064.54-1.8368.8591-3.0477.8591-2.3436 0-4.3282-1.5831-5.0359-3.7104H.9573v2.3318C2.4382 15.9832 5.4818 18 9 18z"
      />
      <path
        fill="#FBBC05"
        d="M3.9641 10.71c-.18-.54-.2827-1.1168-.2827-1.71s.1027-1.17.2827-1.71V4.9582H.9573C.3477 6.1732 0 7.5477 0 9s.3477 2.8268.9573 4.0418L3.9641 10.71z"
      />
      <path
        fill="#EA4335"
        d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.43 0 9 0 5.4818 0 2.4382 2.0168.9573 4.9582L3.9641 7.29C4.6718 5.1627 6.6564 3.5795 9 3.5795z"
      />
    </svg>
  );
}

/** Google's brand yellow — used only for stars once a review carries a real rating. */
function GoogleStars({ rating }: { rating: number }) {
  const rounded = Math.round(rating);
  return (
    <span className="flex gap-0.5" aria-hidden>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(
            "h-4 w-4",
            index < rounded ? "fill-[#FBBC05] text-[#FBBC05]" : "text-white/25",
          )}
        />
      ))}
    </span>
  );
}

/**
 * Renders a rating, or a clearly unrated state when the review is still a
 * placeholder. Never invents stars.
 */
function Rating({
  rating,
  compact = false,
}: {
  rating: number | null;
  compact?: boolean;
}) {
  if (rating === null) {
    return (
      <p
        className={cn(
          "flex flex-wrap items-center gap-x-2 gap-y-1 font-semibold text-muted uppercase",
          compact ? "text-[0.6rem] tracking-[0.06em]" : "text-xs tracking-[0.16em]",
        )}
      >
        <span className="flex gap-0.5" aria-hidden>
          {Array.from({ length: 5 }, (_, index) => (
            <Star
              key={index}
              className={compact ? "h-3 w-3 text-white/25" : "h-3.5 w-3.5 text-white/25"}
            />
          ))}
        </span>
        Rating to be confirmed
      </p>
    );
  }

  return (
    <p className="flex items-center gap-2">
      <GoogleStars rating={rating} />
      <span className="sr-only">{`Rated ${rating} out of 5`}</span>
    </p>
  );
}

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
      {review.url ? (
        <a
          href={review.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "mt-1 inline-flex items-center gap-1.5 text-primary transition-colors hover:text-primary-bright",
            compact ? "text-xs" : "text-sm",
          )}
        >
          {review.source}
          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      ) : (
        <p className={cn("mt-1 text-muted", compact ? "text-xs" : "text-sm")}>
          {review.source}
        </p>
      )}
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
      <GoogleIcon
        className={cn(
          "absolute right-4 top-4 sm:right-7 sm:top-7",
          featured ? "h-6 w-6" : "h-4 w-4 sm:h-5 sm:w-5",
        )}
      />
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
        <div className={featured ? "mt-4" : "mt-3"}>
          <Rating rating={review.rating} compact={!featured} />
        </div>
      </figcaption>
    </figure>
  );
}

export function ReviewsSection() {
  const { googleBadge } = reviews;

  return (
    <section id="reviews" className="section-y border-y border-white/5 bg-surface/25">
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
          {/* Remove this note together with the placeholder reviews. */}
          <p className="mt-5 text-sm text-muted">{reviews.placeholderNote}</p>
        </header>

        {/* Google Reviews trust strip. */}
        <div className="mt-9 flex max-w-2xl flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl border border-white/10 px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <GoogleIcon className="h-8 w-8 shrink-0" />
            <div>
              <p className="text-sm font-bold text-text">{googleBadge.label}</p>
              <p className="text-xs text-muted">{googleBadge.note}</p>
            </div>
          </div>
          <div className="hidden h-9 w-px bg-white/10 sm:block" aria-hidden />
          <div className="flex items-center gap-3">
            <p className="text-3xl font-extrabold text-text">{googleBadge.score}</p>
            <div>
              <GoogleStars rating={5} />
              <p className="mt-1 text-xs text-muted">{googleBadge.scoreNote}</p>
            </div>
          </div>
        </div>

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
