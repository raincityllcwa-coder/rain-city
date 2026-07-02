import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { ImageUrlBuilder } from "@sanity/image-url/lib/types/builder";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
// @ts-ignore - plain .mjs constants shared with astro.config.mjs
import { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION } from "../../sanity.shared.mjs";

export const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false, // Static site: always fetch fresh data at build time
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source);
}
