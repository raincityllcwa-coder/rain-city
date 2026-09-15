import { createClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { ImageUrlBuilder, SanityImageSource } from "@sanity/image-url";
// @ts-ignore - plain .mjs constants shared with astro.config.mjs
import { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION } from "../../sanity.shared.mjs";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false, // Static site: always fetch fresh data at build time
});

// Text tokens. Any string that comes out of Sanity (page fields, Portable
// Text, shared sections, About) can contain {reviews}, {reviews+} or {rating};
// they are filled at build time from Site Settings, so the review count lives
// in one place. {reviews} = exact count, {reviews+} = rounded down to tens
// with a plus ("140+"), {rating} = the rating as entered ("5.0").
// The fallbacks match src/lib/site.ts for an empty Site Settings document.
export const REVIEW_COUNT_FALLBACK = 140;
export const RATING_FALLBACK = "5.0";

const TOKEN_RE = /\{(reviews\+|reviews|rating)\}/g;

export function fillTokens<T>(value: T, tokens: Record<string, string>): T {
  if (typeof value === "string") {
    return (value.includes("{") ? value.replace(TOKEN_RE, (m, key) => tokens[key] ?? m) : value) as T;
  }
  if (Array.isArray(value)) return value.map((v) => fillTokens(v, tokens)) as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = fillTokens(v, tokens);
    return out as T;
  }
  return value;
}

export function reviewTokens(reviewCount: unknown, rating: unknown): Record<string, string> {
  const count = typeof reviewCount === "number" && reviewCount > 0 ? reviewCount : REVIEW_COUNT_FALLBACK;
  const r = typeof rating === "string" && rating.trim() ? rating.trim() : RATING_FALLBACK;
  return { reviews: String(count), "reviews+": `${Math.floor(count / 10) * 10}+`, rating: r };
}

// Every query result passes through fillTokens. The tokens themselves are
// read once with the untouched fetch, so there is no recursion.
const rawFetch = sanityClient.fetch.bind(sanityClient);
let tokensPromise: Promise<Record<string, string>> | null = null;
function getTokens(): Promise<Record<string, string>> {
  if (!tokensPromise) {
    tokensPromise = rawFetch(`*[_id == "siteSettings"][0]{reviewCount, rating}`)
      .then((s: any) => reviewTokens(s?.reviewCount, s?.rating))
      .catch(() => reviewTokens(null, null));
  }
  return tokensPromise;
}
(sanityClient as any).fetch = async (query: string, params?: any, options?: any) => {
  const [result, tokens] = await Promise.all([rawFetch(query, params, options), getTokens()]);
  return fillTokens(result, tokens);
};

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source);
}
