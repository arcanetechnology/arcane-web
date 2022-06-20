/** @format */

import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import arcane from '@arcane-web/arcane-core';

export default defineConfig({
  site: 'https://arcane.no',
  integrations: [solid(), arcane()],
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
