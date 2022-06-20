/** @format */

import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';

export default defineConfig({
  site: 'https://arcane.no',
  integrations: [solid()],
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
