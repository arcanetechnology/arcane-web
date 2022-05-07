/** @format */

import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://arcane.no/invest',
  integrations: [react(), partytown(), sitemap()],
});
