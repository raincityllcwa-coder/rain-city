// Navigation document (id "navigation") + helpers to turn nav items into links.
// Every item is either a reference to a service or city page (URL resolved
// from the page chain) or a plain href for the fixed pages.
import { getDocById } from "./queries";
import { getAllPages, type PageDoc } from "./pages";

export interface NavLink { label: string; href: string }

let navCache: Promise<any> | null = null;
export function getNavigation() {
  if (!navCache) navCache = getDocById("navigation");
  return navCache;
}

export async function resolveNavItems(items: any[] | undefined | null): Promise<NavLink[]> {
  if (!items || items.length === 0) return [];
  const pages = await getAllPages();
  const byId = new Map<string, PageDoc>(pages.map((p) => [p._id, p]));
  const out: NavLink[] = [];
  for (const it of items) {
    if (!it?.label) continue;
    const ref = it.page?._ref;
    const page = ref ? byId.get(ref) : undefined;
    if (page && page.noindex) continue; // hidden pages never enter navigation
    const href = page ? page.path : it.href;
    if (!href) continue;
    out.push({ label: it.label, href });
  }
  return out;
}

// Published, indexable pages of a given type, for auto blocks.
export async function getPagesOfType(type: "service" | "city"): Promise<PageDoc[]> {
  const pages = await getAllPages();
  return pages.filter((p) => p.pageType === type && !p.noindex);
}
