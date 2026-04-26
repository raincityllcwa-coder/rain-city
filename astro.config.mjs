import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  site: 'https://raincityllc.com',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  integrations: [
    react(),
    sitemap({
      filter: (page) => !page.includes('/thanks'),
      changefreq: 'weekly',
      lastmod: new Date(),
      priority: 0.7,
      serialize(item) {
        const url = item.url.replace(/\/$/, '');
        const updated = { ...item, url };

        if (url === 'https://raincityllc.com') {
          return { ...updated, priority: 1.0, changefreq: 'weekly' };
        }
        if (/\/(kitchen-cabinets|kitchen-countertops|bathroom-remodel)$/.test(url)) {
          return { ...updated, priority: 0.9, changefreq: 'monthly' };
        }
        if (/\/our-services$/.test(url)) {
          return { ...updated, priority: 0.8, changefreq: 'monthly' };
        }
        if (/\/(about|contact)$/.test(url)) {
          return { ...updated, priority: 0.6, changefreq: 'monthly' };
        }
        return updated;
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
