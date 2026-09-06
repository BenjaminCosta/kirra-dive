import { NextResponse } from "next/server";

import { contact } from "@/data/landing-content";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;

const GOOGLE_PLACES_URL = "https://places.googleapis.com/v1";
const KIRRA_DIVE_QUERY = "Kirra Dive, U1/133 Wharf St, Tweed Heads NSW 2485, Australia";
const NO_STORE_HEADERS = { "Cache-Control": "no-store, max-age=0" };

type UnknownRecord = Record<string, unknown>;

function isRecord(value: unknown): value is UnknownRecord {
  return typeof value === "object" && value !== null;
}

function asText(value: unknown) {
  return typeof value === "string" && value.trim() ? value.trim() : null;
}

function asSafeHttpsUrl(value: unknown) {
  const url = asText(value);
  if (!url) return null;

  try {
    return new URL(url).protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

function asNonNegativeNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0 ? value : null;
}

function response(body: object, status = 200) {
  return NextResponse.json(body, { status, headers: NO_STORE_HEADERS });
}

function getDisplayText(value: unknown) {
  return isRecord(value) ? asText(value.text) : null;
}

function parseReview(value: unknown) {
  if (!isRecord(value)) return null;

  const authorAttribution = isRecord(value.authorAttribution)
    ? value.authorAttribution
    : null;
  const text = getDisplayText(value.text);
  const authorName = authorAttribution ? asText(authorAttribution.displayName) : null;

  if (!text || !authorName) return null;

  return {
    text,
    rating: asNonNegativeNumber(value.rating),
    relativePublishTimeDescription: asText(value.relativePublishTimeDescription),
    googleMapsUri: asSafeHttpsUrl(value.googleMapsUri),
    flagContentUri: asSafeHttpsUrl(value.flagContentUri),
    author: {
      name: authorName,
      uri: asSafeHttpsUrl(authorAttribution?.uri),
      photoUri: asSafeHttpsUrl(authorAttribution?.photoUri),
    },
  };
}

async function getPlaceId(apiKey: string) {
  const configuredId = asText(process.env.GOOGLE_MAPS_PLACE_ID);
  if (configuredId) return configuredId;

  const searchResponse = await fetch(`${GOOGLE_PLACES_URL}/places:searchText`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": apiKey,
      "X-Goog-FieldMask": "places.id",
    },
    body: JSON.stringify({ textQuery: KIRRA_DIVE_QUERY, pageSize: 1 }),
    cache: "no-store",
  });

  if (!searchResponse.ok) {
    throw new Error(`Google Places text search failed (${searchResponse.status}).`);
  }

  const searchResult: unknown = await searchResponse.json();
  if (!isRecord(searchResult) || !Array.isArray(searchResult.places)) return null;

  const firstPlace = searchResult.places[0];
  return isRecord(firstPlace) ? asText(firstPlace.id) : null;
}

export async function GET() {
  const apiKey = asText(process.env.GOOGLE_MAPS_API_KEY);

  if (!apiKey) {
    return response({ status: "unconfigured", mapsUrl: contact.mapUrl });
  }

  try {
    const placeId = await getPlaceId(apiKey);
    if (!placeId) {
      console.error("Kirra Dive was not found by Google Places text search.");
      return response({ status: "unavailable", mapsUrl: contact.mapUrl }, 502);
    }

    const detailsResponse = await fetch(
      `${GOOGLE_PLACES_URL}/places/${encodeURIComponent(placeId)}`,
      {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": "displayName,rating,userRatingCount,googleMapsUri,reviews",
        },
        cache: "no-store",
      },
    );

    if (!detailsResponse.ok) {
      throw new Error(`Google Place Details failed (${detailsResponse.status}).`);
    }

    const details: unknown = await detailsResponse.json();
    if (!isRecord(details)) throw new Error("Google Place Details returned an invalid response.");

    const rawReviews = Array.isArray(details.reviews) ? details.reviews : [];
    const reviews = rawReviews.flatMap((review) => {
      const parsed = parseReview(review);
      return parsed ? [parsed] : [];
    });

    return response({
      status: "connected",
      placeName: getDisplayText(details.displayName) ?? "Kirra Dive",
      rating: asNonNegativeNumber(details.rating),
      userRatingCount: asNonNegativeNumber(details.userRatingCount),
      mapsUrl: asSafeHttpsUrl(details.googleMapsUri) ?? contact.mapUrl,
      reviews,
    });
  } catch (error) {
    console.error("Unable to load Kirra Dive Google Maps reviews.", error);
    return response({ status: "unavailable", mapsUrl: contact.mapUrl }, 502);
  }
}
