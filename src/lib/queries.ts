import { sanityClient } from "./sanity";

// ─── Fixed documents (one per page or site-wide) ────────
// Each is fetched once per build and cached. Ids use hyphens, never dots: a
// dot in a Sanity _id makes the document private (hidden from the
// unauthenticated reads the site build uses).

const docCache = new Map<string, Promise<any>>();

export function getDocById(id: string) {
  if (!docCache.has(id)) {
    docCache.set(
      id,
      sanityClient
        .fetch(`*[_id == $id][0]`, { id })
        .catch((e) => {
          console.warn(`[Sanity] doc ${id} fetch failed:`, e?.message);
          return null;
        }),
    );
  }
  return docCache.get(id) as Promise<any>;
}

export const getAboutPage = () => getDocById("aboutPage");
export const getContactPage = () => getDocById("contactPage");
export const getHubPage = (key: "services" | "projects") => getDocById(`hub-${key}`);

// Homepage with the featured service cards dereferenced (card fields live on
// the service pages).
let homeCache: Promise<any> | null = null;
export function getHomePage() {
  if (!homeCache) {
    homeCache = sanityClient
      .fetch(
        `*[_id == "homePage"][0]{
          ...,
          featuredServices[]->{
            _id, title, cardTitle, cardText, cardPhotos, noindex,
            "slug": slug.current, "parentSlug": parent->slug.current
          }
        }`,
      )
      .catch((e) => {
        console.warn("[Sanity] homePage fetch failed:", e?.message);
        return null;
      });
  }
  return homeCache;
}

// ─── Projects ───────────────────────────────────────────

const PROJECT_CARD = `_id, title, description, mainImage, gallery, slug, city, completedYear`;

export async function getHomepageProjects() {
  return sanityClient.fetch(`*[_type == "project" && showOnHomepage == true] | order(order asc) { ${PROJECT_CARD} }`);
}

// Projects pointing at a service page (by document id).
export async function getProjectsForService(serviceId: string) {
  return sanityClient.fetch(
    `*[_type == "project" && $id in services[]._ref] | order(order asc) { ${PROJECT_CARD} }`,
    { id: serviceId },
  );
}

// City pages: projects from this city first (matched by the city reference,
// falling back to the old free-text field), then the homepage ones.
export async function getProjectsForCity(cityId: string | null | undefined, cityName: string | null | undefined) {
  return sanityClient.fetch(
    `*[_type == "project" && (
        (defined($cityId) && cityRef._ref == $cityId) ||
        (defined($city) && $city != "" && lower(city) match lower($city) + "*") ||
        showOnHomepage == true
      )] | order(select(
        defined($cityId) && cityRef._ref == $cityId => 0,
        defined($city) && lower(city) match lower($city) + "*" => 0,
        1) asc, order asc) { ${PROJECT_CARD} }`,
    { cityId: cityId || null, city: cityName || null },
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

const REVIEW_CARD = `_id, author, text, photoUrl, photoUpload, avatarUrl, avatarUpload`;

export async function getHomepageReviews() {
  return sanityClient.fetch(`*[_type == "review" && showOnHomepage == true] | order(order asc) { ${REVIEW_CARD} }`);
}

export async function getReviewsForService(serviceId: string) {
  return sanityClient.fetch(
    `*[_type == "review" && $id in services[]._ref] | order(order asc) { ${REVIEW_CARD} }`,
    { id: serviceId },
  );
}

export async function getReviewsForCity(cityId: string | null | undefined) {
  return sanityClient.fetch(
    `*[_type == "review" && (
        (defined($cityId) && cityRef._ref == $cityId) || showOnHomepage == true
      )] | order(select(defined($cityId) && cityRef._ref == $cityId => 0, 1) asc, order asc) { ${REVIEW_CARD} }`,
    { cityId: cityId || null },
  );
}
