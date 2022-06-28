/** @format */

import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import podium from '@arcane-web/podium';

// https://astro.build/config
export default defineConfig({
  integrations: [solid()],
  adapter: podium(),
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
