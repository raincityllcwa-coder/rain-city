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

const builder = createImageUrlBuilder(sanityClient);

export function urlFor(source: SanityImageSource): ImageUrlBuilder {
  return builder.image(source);
}
