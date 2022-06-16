/** @format */

import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import arcane from '@arcane-web/arcane-core';

// https://astro.build/config
export default defineConfig({
  integrations: [solid(), arcane()],
  experimental: { integrations: true },
  site: 'https://arcane.no/',
  base: '/invest',
  trailingSlash: 'never',
  vite: {
    ssr: {
      external: ['svgo'],
    },
  },
});
