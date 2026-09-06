"use client";

/* Google supplies reviewer profile photos. Native img avoids routing those dynamic URLs through Next. */
/* eslint-disable @next/next/no-img-element */

import { useEffect, useState } from "react";
import { ExternalLink, Flag, Star } from "lucide-react";

import { contact, reviews as reviewCopy } from "@/data/landing-content";

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

function RatingStars({ rating }: { rating: number | null }) {
  if (rating === null) return null;

  return (
    <span className="inline-flex items-center gap-1" aria-label={`${rating.toFixed(1)} out of 5`}>
      <Star className="h-4 w-4 fill-primary text-primary" aria-hidden />
      <span className="font-bold text-text">{rating.toFixed(1)}</span>
    </span>
  );
}

function MapsLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-primary-bright"
    >
      {label}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden />
      <span className="sr-only">(opens in a new tab)</span>
    </a>
  );
}

function ReviewCard({ review, mapsUrl }: { review: GoogleReview; mapsUrl: string }) {
  const author = review.author.uri ? (
    <a
      href={review.author.uri}
      target="_blank"
      rel="noopener noreferrer"
      className="font-bold text-text transition-colors hover:text-primary"
    >
      {review.author.name}
    </a>
  ) : (
    <p className="font-bold text-text">{review.author.name}</p>
  );

  return (
    <article className="surface-panel p-6 sm:p-7">
      <div className="flex items-start gap-3">
        {review.author.photoUri ? (
          <img
            src={review.author.photoUri}
            alt={`Profile photo of ${review.author.name}`}
            width={40}
            height={40}
            className="h-10 w-10 shrink-0 rounded-full object-cover"
          />
        ) : (
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/15 text-sm font-bold text-primary"
            aria-hidden
          >
            {review.author.name.slice(0, 1).toUpperCase()}
          </span>
        )}
        <div className="min-w-0">
          {author}
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
            <RatingStars rating={review.rating} />
            {review.relativePublishTimeDescription ? (
              <span>{review.relativePublishTimeDescription}</span>
            ) : null}
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm leading-6 text-text">{review.text}</p>

      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs">
        <MapsLink href={review.googleMapsUri ?? mapsUrl} label="View on Google Maps" />
        {review.flagContentUri ? (
          <a
            href={review.flagContentUri}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-muted transition-colors hover:text-text"
          >
            <Flag className="h-3.5 w-3.5" aria-hidden />
            Report review
          </a>
        ) : null}
      </div>
    </article>
  );
}

export function GoogleReviews() {
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
    return <div className="surface-panel mt-8 h-44 max-w-2xl animate-pulse" aria-label="Loading Google Maps reviews" />;
  }

  if (response.status !== "connected") {
    return (
      <div className="surface-panel mt-8 max-w-2xl p-6 sm:p-7">
        <p className="text-sm text-muted">
          See the latest Kirra Dive feedback directly on Google Maps.
        </p>
        <div className="mt-4">
          <MapsLink href={response.mapsUrl} label={reviewCopy.fallbackLabel} />
        </div>
      </div>
    );
  }

  const liveReviews = response.reviews ?? [];

  return (
    <div className="mt-8 max-w-2xl">
      <div className="surface-panel p-6 sm:p-7">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="font-bold text-text">{response.placeName ?? "Kirra Dive"}</p>
            <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted">
              <RatingStars rating={response.rating ?? null} />
              {response.userRatingCount !== null && response.userRatingCount !== undefined ? (
                <span>
                  {response.userRatingCount.toLocaleString()} Google reviews
                </span>
              ) : null}
            </div>
          </div>
          <MapsLink href={response.mapsUrl} label="See all on Google Maps" />
        </div>
        <p
          className="mt-5 font-sans text-xs font-normal tracking-normal text-[#5e5e5e]"
          translate="no"
        >
          Google Maps
        </p>
        <p className="mt-2 text-xs text-muted">
          Reviews are provided by Google Maps and ordered by relevance.
        </p>
      </div>

      {liveReviews.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {liveReviews.map((review) => (
            <ReviewCard key={`${review.author.name}-${review.text}`} review={review} mapsUrl={response.mapsUrl} />
          ))}
        </div>
      ) : null}
    </div>
  );
}
