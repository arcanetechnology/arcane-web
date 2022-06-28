/** @format */

import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  integrations: [solid()],
  site: 'https://arcane.no/',
  base: '/invest',
  outDir: './dist/invest',
  trailingSlash: 'never',
  build: {
    format: 'file',
  },
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
