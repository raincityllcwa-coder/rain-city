import { sanityClient } from "./sanity";

// ─── Projects ───────────────────────────────────────────

export async function getProjects(page: string) {
  return sanityClient.fetch(
    `*[_type == "project" && $page in showOn] | order(order asc) {
      _id, title, description, mainImage, gallery, slug
    }`,
    { page },
  );
}

// All projects for the /our-projects index page
export async function getAllProjects() {
  return sanityClient.fetch(
    `*[_type == "project" && defined(slug.current)] | order(coalesce(completedYear, 0) desc, order asc) {
      _id, title, description, mainImage, slug, city, completedYear
    }`,
  );
}

// Single project for /our-projects/[slug]
export async function getProjectBySlug(slug: string) {
  return sanityClient.fetch(
    `*[_type == "project" && slug.current == $slug][0] {
      _id, _createdAt, _updatedAt,
      title, description, mainImage, gallery, slug, city, completedYear,
      intro, introPhotos,
      goalsHeading, goalsIntro, goals, goalsOutro, goalsPhotos,
      designDecisionsHeading, designDecisionsIntro, designDecisions, designDecisionsPhotos,
      beforeAfterHeading, beforeAfterIntro, beforeAfter, beforeAfterPhotos,
      resultHeading, resultText,
      finalGalleryHeading, finalGallery,
      metaTitle, metaDescription
    }`,
    { slug },
  );
}

// All slugs (for getStaticPaths)
export async function getAllProjectSlugs() {
  return sanityClient.fetch(
    `*[_type == "project" && defined(slug.current)].slug.current`,
  );
}

// ─── Reviews ────────────────────────────────────────────

export async function getReviews(page: string) {
  return sanityClient.fetch(
    `*[_type == "review" && $page in showOn] | order(order asc) {
      _id, author, text,
      photoUrl, photoUpload,
      avatarUrl, avatarUpload
    }`,
    { page },
  );
}

// ─── FAQ ────────────────────────────────────────────────

export async function getFAQs(page: string) {
  return sanityClient.fetch(
    `*[_type == "faq" && $page in showOn] | order(order asc) {
      _id, question, answer
    }`,
    { page },
  );
}

// ─── Site settings ──────────────────────────────────────
// Memoized: the same siteSettings document is needed by AboutSection (homepage)
// and WhyChooseUsSection (three service pages). One request per build instead
// of one per component per page.

let siteSettingsPromise: Promise<any> | null = null;

export function getSiteSettings() {
  if (!siteSettingsPromise) {
    siteSettingsPromise = sanityClient.fetch(
      `*[_type == "siteSettings"][0]{ ownerPhoto, aboutPhoto1, aboutPhoto2, aboutPhoto3 }`,
    );
  }
  return siteSettingsPromise;
}

// ─── Editable copy layer (Sanity-managed texts with hardcoded fallbacks) ───
// Each doc is fetched once per build and cached module-level. Ids use hyphens, never dots: a dot in a Sanity _id makes the document private (hidden from unauthenticated reads, which is what the site build uses). Every consumer
// falls back to the current hardcoded string when a doc or field is missing,
// so the site renders identically with an empty dataset.

const copyCache = new Map<string, Promise<any>>();

export function getDocById(id: string) {
  if (!copyCache.has(id)) {
    copyCache.set(
      id,
      sanityClient
        .fetch(`*[_id == $id][0]`, { id })
        .catch((e) => {
          console.warn(`[Sanity] copy doc ${id} fetch failed:`, e?.message);
          return null;
        }),
    );
  }
  return copyCache.get(id);
}

// Meta title/description override for a static page. Doc ids: meta-<key>
export async function getPageMeta(key: string) {
  return getDocById(`meta-${key}`);
}

// ─── SEO pages: reviews and projects by pool key and/or city ───
export async function getReviewsFor(key: string | null | undefined, city: string | null | undefined) {
  return sanityClient.fetch(
    `*[_type == "review" && (
        (defined($city) && $city != "" && lower(city) == lower($city)) ||
        (defined($key) && $key in showOn)
      )] | order(select(defined($city) && lower(city) == lower($city) => 0, 1) asc, order asc) {
      _id, author, text, photoUrl, photoUpload, avatarUrl, avatarUpload
    }`,
    { key: key || null, city: city || null },
  );
}

export async function getProjectsFor(key: string | null | undefined, city: string | null | undefined) {
  return sanityClient.fetch(
    `*[_type == "project" && (
        (defined($city) && $city != "" && lower(city) match lower($city) + "*") ||
        (defined($key) && $key in showOn)
      )] | order(select(defined($city) && lower(city) match lower($city) + "*" => 0, 1) asc, order asc) {
      _id, title, description, mainImage, gallery, slug, city
    }`,
    { key: key || null, city: city || null },
  );
}
