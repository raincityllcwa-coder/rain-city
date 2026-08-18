// SEO page documents (type "page" in Sanity): services, sub-services, city
// pages, hubs. This module resolves their URLs from the parent chain, builds
// breadcrumbs, and renders Portable Text to HTML. One fetch per build, cached.
import { sanityClient, urlFor } from "./sanity";
import { toHTML } from "@portabletext/to-html";

export interface PageDoc {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  pageType: "service" | "city" | "hub";
  parentId?: string | null;
  slug: string;
  city?: string | null;
  contentKey?: string | null;
  heroTitle: string;
  heroSubtitle?: string | null;
  heroImage?: any;
  body?: any[];
  gallery?: any[];
  faqs?: { question: string; answer: string }[];
  showReviews?: boolean;
  showProjects?: boolean;
  showAreas?: boolean;
  showRelatedServices?: boolean;
  showLeadForm?: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: any;
  canonicalUrl?: string | null;
  noindex?: boolean;
  // resolved
  path: string;
  chain: PageDoc[]; // ancestors, root first
}

let cache: Promise<PageDoc[]> | null = null;

export function getAllPages(): Promise<PageDoc[]> {
  if (!cache) {
    cache = sanityClient
      .fetch(
        `*[_type == "page" && defined(slug.current)]{
          _id, _createdAt, _updatedAt, title, pageType,
          "parentId": parent._ref, "slug": slug.current, city, contentKey,
          heroTitle, heroSubtitle, heroImage,
          body[]{..., markDefs[]{...}, asset},
          gallery, faqs, showReviews, showProjects, showAreas, showRelatedServices, showLeadForm,
          metaTitle, metaDescription, ogImage, canonicalUrl, noindex
        }`,
      )
      .then((docs: any[]) => resolvePaths(docs || []))
      .catch((e: any) => {
        console.warn("[Sanity] page fetch failed:", e?.message);
        return [];
      });
  }
  return cache;
}

function resolvePaths(docs: any[]): PageDoc[] {
  const byId = new Map<string, any>(docs.map((d) => [d._id, d]));
  const out: PageDoc[] = [];
  for (const d of docs) {
    const chain: any[] = [];
    let cur = d;
    const seen = new Set<string>([d._id]);
    while (cur.parentId && byId.has(cur.parentId) && !seen.has(cur.parentId)) {
      cur = byId.get(cur.parentId);
      seen.add(cur._id);
      chain.unshift(cur);
    }
    const path = "/" + [...chain, d].map((x) => x.slug).join("/");
    out.push({ ...d, path, chain });
  }
  // stable order: services, hubs, then cities, alphabetical inside
  return out.sort((a, b) => a.path.localeCompare(b.path));
}

export function pageUrl(p: PageDoc) {
  return `https://raincityllc.com${p.path}`;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Portable Text -> HTML with the site's typography classes.
export function bodyToHtml(blocks: any[] | undefined | null): string {
  if (!blocks || blocks.length === 0) return "";
  return toHTML(blocks, {
    components: {
      block: {
        normal: ({ children }) => `<p class="font-['Montserrat'] text-[16px] md:text-[17px] text-gray-800 leading-relaxed mb-4">${children}</p>`,
        h2: ({ children }) => `<h2 class="font-['Playfair_Display'] font-bold text-[24px] md:text-[28px] text-black mt-10 mb-4">${children}</h2>`,
        h3: ({ children }) => `<h3 class="font-['Playfair_Display'] font-bold text-[20px] md:text-[22px] text-[#051e2a] mt-8 mb-3">${children}</h3>`,
        h4: ({ children }) => `<h4 class="font-['Montserrat'] font-semibold text-[17px] text-[#051e2a] mt-6 mb-2">${children}</h4>`,
        blockquote: ({ children }) => `<blockquote class="border-l-4 border-[#007ec5] pl-4 italic text-gray-700 my-6">${children}</blockquote>`,
      },
      list: {
        bullet: ({ children }) => `<ul class="list-disc pl-6 mb-4 space-y-1 font-['Montserrat'] text-[16px] text-gray-800">${children}</ul>`,
        number: ({ children }) => `<ol class="list-decimal pl-6 mb-4 space-y-1 font-['Montserrat'] text-[16px] text-gray-800">${children}</ol>`,
      },
      listItem: {
        bullet: ({ children }) => `<li>${children}</li>`,
        number: ({ children }) => `<li>${children}</li>`,
      },
      marks: {
        strong: ({ children }) => `<strong class="font-semibold">${children}</strong>`,
        em: ({ children }) => `<em>${children}</em>`,
        link: ({ children, value }) => {
          const href = escapeHtml(String(value?.href || "#"));
          const external = /^https?:\/\//i.test(href) && !href.startsWith("https://raincityllc.com");
          const target = value?.blank || external ? ` target="_blank" rel="noopener${external ? " noreferrer" : ""}"` : "";
          return `<a href="${href}" class="text-[#007ec5] underline hover:text-[#006ba8]"${target}>${children}</a>`;
        },
      },
      types: {
        image: ({ value }) => {
          if (!value?.asset) return "";
          const src = urlFor(value).width(1200).format("webp").quality(80).url();
          const alt = escapeHtml(value.alt || "");
          const cap = value.caption ? `<figcaption class="text-[14px] text-gray-500 mt-2">${escapeHtml(value.caption)}</figcaption>` : "";
          return `<figure class="my-8"><img src="${src}" alt="${alt}" loading="lazy" class="w-full h-auto rounded-[5px]" />${cap}</figure>`;
        },
      },
    },
  });
}

// Plain text of the body (first paragraphs) for description fallbacks.
export function bodyPlainText(blocks: any[] | undefined | null, max = 400): string {
  if (!blocks) return "";
  const parts: string[] = [];
  for (const b of blocks) {
    if (b?._type === "block" && Array.isArray(b.children)) {
      parts.push(b.children.map((c: any) => c.text || "").join(""));
    }
    if (parts.join(" ").length > max) break;
  }
  return parts.join(" ").replace(/\s+/g, " ").trim();
}
