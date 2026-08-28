// Service pages and city pages from Sanity (types servicePage and cityPage).
// This module resolves their URLs from the parent chain, builds breadcrumbs,
// and renders Portable Text to HTML. One fetch per build, cached.
import { sanityClient, urlFor } from "./sanity";
import { toHTML } from "@portabletext/to-html";

export type PageType = "service" | "city";

export interface FaqItem { question: string; answer: string }

export interface PageDoc {
  _id: string;
  _type: "servicePage" | "cityPage";
  _createdAt: string;
  _updatedAt: string;
  title: string;
  subtitle?: string | null;
  heroImage?: any;
  introTitle?: string | null;
  introParagraphs?: string[] | null;
  sliderPhotos?: any[] | null;
  body?: any[];
  gallery?: any[];
  cardTitle?: string | null;
  cardText?: string | null;
  cardShortText?: string | null;
  cardImage?: any;
  cardPhotos?: any[] | null;
  faqs?: FaqItem[];
  serviceIds?: string[] | null;
  cityName?: string | null;
  cityId?: string | null;
  nearby?: {_id: string; name: string}[] | null;
  cityPhoto?: any;
  localNotes?: {title?: string; text?: string}[] | null;
  sectionOrder?: string[] | null;
  showSamples?: boolean;
  showWorking?: boolean;
  parentId?: string | null;
  slug: string;
  showReviews?: boolean;
  showProjects?: boolean;
  showWhyChooseUs?: boolean;
  showProcess?: boolean;
  showServiceArea?: boolean;
  showAreas?: boolean;
  showRelatedServices?: boolean;
  showLeadForm?: boolean;
  metaTitle?: string | null;
  metaDescription?: string | null;
  ogImage?: any;
  canonicalUrl?: string | null;
  noindex?: boolean;
  // resolved
  pageType: PageType;
  path: string;
  chain: PageDoc[]; // ancestors, root first
}

let cache: Promise<PageDoc[]> | null = null;

// Service pages and city pages. Shared FAQ entries are dereferenced, page-only
// questions are inline; both come back as plain {question, answer}.
export function getAllPages(): Promise<PageDoc[]> {
  if (!cache) {
    cache = sanityClient
      .fetch(
        `*[_type in ["servicePage", "cityPage"] && defined(slug.current)]{
          _id, _type, _createdAt, _updatedAt, title, subtitle, heroImage,
          introTitle, introParagraphs, sliderPhotos,
          body[]{..., markDefs[]{...}, asset},
          gallery, cardTitle, cardText, cardShortText, cardImage, cardPhotos,
          cityPhoto, localNotes, sectionOrder,
          "faqs": faqs[]{
            _type == "reference" => @->{question, answer},
            _type != "reference" => {question, answer}
          },
          "serviceIds": services[]._ref,
          "cityName": coalesce(cityRef->name, city), "cityId": cityRef._ref,
          "nearby": nearbyCities[]->{_id, name},
          "parentId": parent._ref, "slug": slug.current,
          showReviews, showProjects, showWhyChooseUs, showProcess, showServiceArea, showAreas, showRelatedServices, showLeadForm, showSamples, showWorking,
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
    const pageType: PageType = d._type === "cityPage" ? "city" : "service";
    out.push({ ...d, faqs: (d.faqs || []).filter((f: any) => f?.question && f?.answer), pageType, path, chain });
  }
  return out.sort((a, b) => a.path.localeCompare(b.path));
}

// Top-level, published, indexable service pages, for cards and link blocks.
export async function getTopLevelServices(): Promise<PageDoc[]> {
  const pages = await getAllPages();
  return pages.filter((p) => p.pageType === "service" && p.chain.length === 0 && !p.noindex);
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
        normal: ({ children }) => `<p class="font-['Montserrat'] text-[16px] md:text-[17px] text-[#404040] leading-relaxed mb-4">${children}</p>`,
        h2: ({ children }) => `<h2 class="font-['Playfair_Display'] font-bold text-[24px] md:text-[28px] text-black mt-10 mb-4">${children}</h2>`,
        h3: ({ children }) => `<h3 class="font-['Playfair_Display'] font-bold text-[20px] md:text-[22px] text-[#051e2a] mt-8 mb-3">${children}</h3>`,
        h4: ({ children }) => `<h4 class="font-['Montserrat'] font-semibold text-[17px] text-[#051e2a] mt-6 mb-2">${children}</h4>`,
        blockquote: ({ children }) => `<blockquote class="border-l-4 border-[#007ec5] pl-4 italic text-[#404040] my-6">${children}</blockquote>`,
      },
      list: {
        bullet: ({ children }) => `<ul class="list-disc pl-6 mb-4 space-y-1 font-['Montserrat'] text-[16px] text-[#404040]">${children}</ul>`,
        number: ({ children }) => `<ol class="list-decimal pl-6 mb-4 space-y-1 font-['Montserrat'] text-[16px] text-[#404040]">${children}</ol>`,
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
          const cap = value.caption ? `<figcaption class="text-[14px] text-[#898989] mt-2">${escapeHtml(value.caption)}</figcaption>` : "";
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
