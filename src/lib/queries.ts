import { sanityClient } from "./sanity";

// ─── Projects ───────────────────────────────────────────

export async function getProjects(page: string) {
  return sanityClient.fetch(
    `*[_type == "project" && $page in showOn] | order(order asc) {
      _id, title, description, mainImage, gallery
    }`,
    { page },
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
