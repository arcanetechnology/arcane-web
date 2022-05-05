/** @format */

import { defineConfig } from 'astro/config';
import path from 'path';
import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  site: 'https://arcane.no/invest',
  integrations: [react(), partytown(), sitemap()],
  vite: {
    plugins: [
      federation({
        name: 'invest',
        remotes: {
          design: 'http://localhost:4173/assets/remoteEntry.js',
        },
      }),
    ],
  },
});
