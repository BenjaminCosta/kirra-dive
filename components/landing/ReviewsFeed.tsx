"use client";

/* Google supplies reviewer profile photos. Native img avoids routing those dynamic URLs through Next. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { ExternalLink, Flag, Quote, Star } from "lucide-react";

import { contact, reviews as reviewCopy } from "@/data/landing-content";
import { cn } from "@/lib/cn";

type GoogleReview = {
  text: string;
  rating: number | null;
  relativePublishTimeDescription: string | null;
  googleMapsUri: string | null;
  flagContentUri: string | null;
  author: {
    name: string;
    uri: string | null;
    photoUri: string | null;
  };
};

type ReviewsResponse = {
  status: "connected" | "unconfigured" | "unavailable";
  mapsUrl: string;
  placeName?: string;
  rating?: number | null;
  userRatingCount?: number | null;
  reviews?: GoogleReview[];
};

/** Google's four-colour G mark identifies the source of the review data. */
function GoogleIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 18 18" className={className} aria-label="Google Maps" role="img">
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

function isResponse(value: unknown): value is ReviewsResponse {
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value &&
    (value.status === "connected" ||
      value.status === "unconfigured" ||
      value.status === "unavailable") &&
    "mapsUrl" in value &&
    typeof value.mapsUrl === "string"
  );
}

function GoogleStars({ rating, compact = false }: { rating: number | null; compact?: boolean }) {
  const filledStars = rating === null ? 0 : Math.round(rating);
  return (
    <span
      className="flex gap-0.5"
      aria-label={rating === null ? "Google Maps rating not loaded" : `${rating.toFixed(1)} out of 5 stars`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(
            compact ? "h-3 w-3" : "h-4 w-4",
            index < filledStars ? "fill-[#FBBC05] text-[#FBBC05]" : "text-white/25",
          )}
          aria-hidden
        />
      ))}
    </span>
  );
}

function MapsLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary transition-colors hover:text-primary-bright"
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function ReviewerAttribution({ review, compact }: { review: GoogleReview; compact: boolean }) {
  const author = review.author.uri ? (
    <a
      href={review.author.uri}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "font-bold text-text transition-colors hover:text-primary",
        compact ? "text-xs tracking-[0.04em]" : "text-sm tracking-[0.12em]",
      )}
    >
      {review.author.name}
    </a>
  ) : (
    <p
      className={cn(
        "font-bold text-text",
        compact ? "text-xs tracking-[0.04em]" : "text-sm tracking-[0.12em]",
      )}
    >
      {review.author.name}
    </p>
  );

  return (
    <div className={cn("flex items-start gap-3", compact ? "mt-4" : "mt-5")}>
      {review.author.photoUri ? (
        <img
          src={review.author.photoUri}
          alt={`Profile photo of ${review.author.name}`}
          width={32}
          height={32}
          className="h-8 w-8 shrink-0 rounded-full object-cover"
        />
      ) : (
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary"
          aria-hidden
        >
          {review.author.name.slice(0, 1).toUpperCase()}
        </span>
      )}
      <div className="min-w-0">
        {author}
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
          <GoogleStars rating={review.rating} compact={compact} />
          {review.relativePublishTimeDescription ? (
            <span className="text-xs text-muted">{review.relativePublishTimeDescription}</span>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function ReviewCard({ review, mapsUrl, featured = false }: {
  review: GoogleReview;
  mapsUrl: string;
  featured?: boolean;
}) {
  const reviewUrl = review.googleMapsUri ?? mapsUrl;

  return (
    <article className={cn("surface-panel relative", featured ? "p-5 sm:p-8" : "p-4 sm:p-5")}>
      <span
        className="absolute right-4 top-4 font-sans text-xs font-normal tracking-normal text-[#5e5e5e] sm:right-7 sm:top-7"
        translate="no"
      >
        <GoogleIcon className="h-6 w-6" />
      </span>
      <Quote
        className={featured ? "h-7 w-7 text-primary/70" : "h-5 w-5 text-primary/70"}
        aria-hidden
      />
      <blockquote
        className={cn(
          "pr-10 font-semibold text-text",
          featured ? "mt-4 text-lg sm:text-xl" : "mt-3 text-sm sm:text-base",
        )}
      >
        <span className={featured ? "line-clamp-3" : "line-clamp-2"}>
          “{review.text}”
        </span>
      </blockquote>
      <div className="mt-3">
        <MapsLink href={reviewUrl} label="Read full review" />
      </div>
      <div
        className={cn("h-px bg-primary/40", featured ? "mt-4 w-10" : "mt-3 w-6")}
        aria-hidden
      />
      <ReviewerAttribution review={review} compact={!featured} />
      {review.flagContentUri ? (
        <div className="mt-3">
          <a
            href={review.flagContentUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-muted transition-colors hover:text-text"
          >
            <Flag className="h-3.5 w-3.5" aria-hidden />
            Report review
          </a>
        </div>
      ) : null}
    </article>
  );
}

function ReviewsBadge({ response }: { response: ReviewsResponse }) {
  const isConnected = response.status === "connected";
  const rating = isConnected ? response.rating ?? null : null;
  const reviewCount = isConnected ? response.userRatingCount ?? null : null;

  return (
    <div className="mt-9 flex max-w-2xl flex-wrap items-center gap-x-6 gap-y-4 rounded-2xl border border-white/10 px-5 py-5 sm:px-7">
      <div className="flex items-center gap-3">
        <GoogleIcon className="h-8 w-8 shrink-0" />
        <div>
          <p className="text-sm font-bold text-text">{reviewCopy.badgeLabel}</p>
          <p className="text-xs text-muted">{reviewCopy.badgeNote}</p>
        </div>
      </div>
      <div className="hidden h-9 w-px bg-white/10 sm:block" aria-hidden />
      {rating !== null ? (
        <div className="flex items-center gap-3">
          <p className="text-3xl font-extrabold text-text">{rating.toFixed(1)}</p>
          <div>
            <GoogleStars rating={rating} />
            {reviewCount !== null ? (
              <p className="mt-1 text-xs text-muted">
                {reviewCount.toLocaleString()} reviews on Google Maps
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <p className="text-3xl font-extrabold text-text">—</p>
          <div>
            <GoogleStars rating={null} />
            <div className="mt-1">
              <MapsLink href={response.mapsUrl} label={reviewCopy.fallbackLabel} />
            </div>
          </div>
        </div>
      )}
      <p className="basis-full font-sans text-xs font-normal tracking-normal text-[#5e5e5e]" translate="no">
        Google Maps
      </p>
      {isConnected ? (
        <p className="basis-full text-xs text-muted">
          Google Maps provides these reviews in relevance order; the first three are shown.
        </p>
      ) : null}
    </div>
  );
}

export function ReviewsFeed() {
  const [response, setResponse] = useState<ReviewsResponse | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadReviews() {
      try {
        const result: unknown = await fetch("/api/reviews", {
          cache: "no-store",
          signal: controller.signal,
        }).then((apiResponse) => apiResponse.json());

        if (!controller.signal.aborted && isResponse(result)) {
          setResponse(result);
        }
      } catch {
        if (!controller.signal.aborted) {
          setResponse({ status: "unavailable", mapsUrl: contact.mapUrl });
        }
      }
    }

    void loadReviews();
    return () => controller.abort();
  }, []);

  if (!response) {
    return <div className="surface-panel mt-9 h-36 max-w-2xl animate-pulse" aria-label="Loading reviews" />;
  }

  const liveReviews = response.status === "connected" ? (response.reviews ?? []).slice(0, 3) : [];
  const [featured, ...secondary] = liveReviews;

  return (
    <>
      <ReviewsBadge response={response} />
      {featured ? (
        <div className="mt-8 flex max-w-2xl flex-col gap-6">
          <ReviewCard review={featured} mapsUrl={response.mapsUrl} featured />
          {secondary.length > 0 ? (
            <div className="grid grid-cols-2 gap-3 sm:gap-6">
              {secondary.map((review) => (
                <ReviewCard
                  key={`${review.author.name}-${review.text}`}
                  review={review}
                  mapsUrl={response.mapsUrl}
                />
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </>
  );
}
