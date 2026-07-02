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

try {
  const projects = await sanityClient.fetch(
    `*[_type == "project" && defined(slug.current)]{"slug": slug.current, _updatedAt}`
  );
  for (const p of projects) {
    lastmodByUrl.set(
      `https://raincityllc.com/our-projects/${p.slug}`,
      p._updatedAt
    );
  }
  // eslint-disable-next-line no-console
  console.log(`[sitemap] loaded ${projects.length} per-project lastmod values from Sanity`);
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
      filter: (page) => !page.includes('/thanks'),
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
