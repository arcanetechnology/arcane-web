/** @format */

import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  integrations: [solid()],
  experimental: { integrations: true },
  site: 'https://arcane.no/',
  base: '/invest',
  outDir: './dist/invest',
  trailingSlash: 'never',
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
