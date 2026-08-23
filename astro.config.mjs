import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { createClient } from '@sanity/client';
import { SANITY_PROJECT_ID, SANITY_DATASET, SANITY_API_VERSION } from './sanity.shared.mjs';

// ─── Build per-URL lastmod map for the sitemap ───
// Google ignores <lastmod> when every URL shares the same date, which just looks
// like a build timestamp and isn't a real signal. We pull the actual
// _updatedAt for each project from Sanity at build time and use it for the
// matching /our-projects/<slug> URL. Static pages get the build date as a
// fallback (which is still better than nothing for them since they really did
// all rebuild at once).
const sanityClient = createClient({
  projectId: SANITY_PROJECT_ID,
  dataset: SANITY_DATASET,
  apiVersion: SANITY_API_VERSION,
  useCdn: false,
});

const buildDate = new Date().toISOString();
const lastmodByUrl = new Map();
const hiddenUrls = new Set();          // noindex SEO pages: excluded from the sitemap
const htmlRedirectPaths = new Set();   // paths that get a .html -> clean 301 rule
const customRedirects = [];            // lines from Sanity redirect documents

try {
  const projects = await sanityClient.fetch(
    `*[_type == "project" && defined(slug.current)]{"slug": slug.current, _updatedAt}`
  );
  for (const p of projects) {
    lastmodByUrl.set(
      `https://raincityllc.com/our-projects/${p.slug}`,
      p._updatedAt
    );
    htmlRedirectPaths.add(`/our-projects/${p.slug}`);
  }
  // eslint-disable-next-line no-console
  console.log(`[sitemap] loaded ${projects.length} per-project lastmod values from Sanity`);
  // Sanity pages (servicePage, cityPage): resolve URL from the parent chain,
  // remember hidden (noindex) ones so they stay out of the sitemap, and load redirects.
  const seoPages = await sanityClient.fetch(
    `*[_type in ["servicePage", "cityPage"] && defined(slug.current)]{_id, "slug": slug.current, "parentId": parent._ref, _updatedAt, noindex}`
  );
  const byId = new Map(seoPages.map((p) => [p._id, p]));
  for (const p of seoPages) {
    const segs = [p.slug]; let cur = p; const seen = new Set([p._id]);
    while (cur.parentId && byId.has(cur.parentId) && !seen.has(cur.parentId)) { cur = byId.get(cur.parentId); seen.add(cur._id); segs.unshift(cur.slug); }
    const url = `https://raincityllc.com/${segs.join('/')}`;
    if (p.noindex) hiddenUrls.add(url); else lastmodByUrl.set(url, p._updatedAt);
    // .html duplicate -> clean URL, for every SEO page (hidden or not)
    htmlRedirectPaths.add(`/${segs.join('/')}`);
  }
  // eslint-disable-next-line no-console
  console.log(`[sitemap] loaded ${seoPages.length} Sanity pages (${hiddenUrls.size} hidden)`);
  const redirectDocs = await sanityClient.fetch(`*[_type == "redirect" && defined(from) && defined(to)]{from, to, permanent}`);
  for (const r of redirectDocs) {
    if (typeof r.from === 'string' && r.from.startsWith('/') && typeof r.to === 'string') {
      customRedirects.push(`${r.from} ${r.to} ${r.permanent === false ? 302 : 301}`);
    }
  }
  // eslint-disable-next-line no-console
  console.log(`[redirects] loaded ${customRedirects.length} redirects from Sanity`);
} catch (err) {
  // eslint-disable-next-line no-console
  console.warn('[sitemap] could not fetch project lastmod from Sanity, falling back to build date:', err?.message);
}

export default defineConfig({
  site: 'https://raincityllc.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
    // Inline every page's CSS into the <head> so there's no extra request
    // for the per-route stylesheet on first paint. PSI flagged /_astro/about.*.css
    // as a render-blocking dependency (~80ms on the critical path); since the
    // total CSS per page is small (under 10kb), inlining is a net win over a
    // separate fetch + cache miss.
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/thanks') && !hiddenUrls.has(page.replace(/\/$/, '')),
      changefreq: 'weekly',
      priority: 0.7,
      // Global lastmod populates the <lastmod> on sitemap-index.xml so Google
      // knows when the index itself was last touched. Each URL's lastmod is
      // overridden below via serialize() with either the real Sanity
      // _updatedAt or the build date.
      lastmod: new Date(buildDate),
      serialize(item) {
        const url = item.url.replace(/\/$/, '');
        const next = { ...item, url };

        // Per-URL lastmod: prefer real Sanity _updatedAt for project pages,
        // build date for everything else.
        next.lastmod = lastmodByUrl.get(url) || buildDate;

        if (url === 'https://raincityllc.com') {
          return { ...next, priority: 1.0, changefreq: 'weekly' };
        }
        if (/\/(kitchen-cabinets|kitchen-countertops|bathroom-remodel)$/.test(url)) {
          return { ...next, priority: 0.9, changefreq: 'monthly' };
        }
        if (/\/(our-services|our-projects)$/.test(url)) {
          return { ...next, priority: 0.8, changefreq: 'monthly' };
        }
        if (/\/our-projects\/[^/]+$/.test(url)) {
          return { ...next, priority: 0.7, changefreq: 'monthly' };
        }
        if (/\/(about|contact)$/.test(url)) {
          return { ...next, priority: 0.6, changefreq: 'monthly' };
        }
        return next;
      },
    }),
    {
      // Netlify does not support a mid-path splat (/our-projects/*.html is
      // silently ignored), so the .html -> clean-URL 301 for project pages
      // cannot be a wildcard rule. Instead we append one explicit rule per
      // project slug to dist/_redirects after the build. Slugs come from the
      // same Sanity fetch used for the sitemap lastmod above.
      name: 'project-html-redirects',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const fs = await import('node:fs');
          const lines = [...htmlRedirectPaths].sort().map((p) => `${p}.html ${p} 301!`);
          let out = '';
          if (lines.length > 0) out += '\n# Auto-generated at build time: .html duplicates -> clean URLs\n' + lines.join('\n') + '\n';
          if (customRedirects.length > 0) out += '\n# Redirects managed in Sanity (Redirects)\n' + customRedirects.join('\n') + '\n';
          if (out) fs.appendFileSync(new URL('_redirects', dir), out);
          console.log(`[redirects] appended ${lines.length} .html rules and ${customRedirects.length} Sanity redirects`);
        },
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve('./src'),
      },
    },
    assetsInclude: ['**/*.svg', '**/*.csv'],
  },
});
