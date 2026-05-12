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
      _id, title, description, mainImage, gallery, slug, city, completedYear,
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
