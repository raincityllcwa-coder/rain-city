import { urlFor } from "./sanity";

// ─── Projects → ProjectsSection props ───────────────────

export interface ProjectProp {
  image: string;
  title: string;
  description: string;
  gallery: string[];
}

export function transformProjects(projects: any[]): ProjectProp[] {
  return projects.map((p) => {
    const mainUrl = p.mainImage
      ? urlFor(p.mainImage).width(600).height(400).fit("crop").format("webp").url()
      : "";
    const mainHiRes = p.mainImage
      ? urlFor(p.mainImage).width(1200).format("webp").url()
      : "";

    const galleryUrls =
      p.gallery && p.gallery.length > 0
        ? p.gallery.map((img: any) =>
            urlFor(img).width(1200).format("webp").url(),
          )
        : [];

    return {
      image: mainUrl,
      title: p.title || "",
      description: p.description || "",
      gallery:
        galleryUrls.length > 0
          ? [mainHiRes, ...galleryUrls]
          : mainHiRes
            ? [mainHiRes]
            : [],
    };
  });
}

// ─── Reviews → ReviewsSection / ReviewsGridSection props ─

export interface ReviewProp {
  text: string;
  author: string;
  image: string;
  avatar: string | null;
}

export function transformReviews(reviews: any[]): ReviewProp[] {
  return reviews.map((r) => {
    // Photo: URL takes priority, then uploaded image
    let image = "";
    if (r.photoUrl) {
      image = r.photoUrl;
    } else if (r.photoUpload) {
      image = urlFor(r.photoUpload).width(800).format("webp").url();
    }

    // Avatar: URL takes priority, then uploaded image, then null (shows initials)
    let avatar: string | null = null;
    if (r.avatarUrl) {
      avatar = r.avatarUrl;
    } else if (r.avatarUpload) {
      avatar = urlFor(r.avatarUpload).width(96).height(96).fit("crop").format("webp").url();
    }

    return {
      text: r.text,
      author: r.author,
      image,
      avatar,
    };
  });
}
