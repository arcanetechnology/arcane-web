/** @format */
import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';

// https://astro.build/config
export default defineConfig({
  integrations: [solid()],
  site: 'https://arcane.no/',
  base: '/invest',
  trailingSlash: 'never',
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
