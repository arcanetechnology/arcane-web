/** @format */

import { defineConfig } from 'astro/config';

import react from '@astrojs/react';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import turbolink from '@astrojs/turbolinks';

export default defineConfig({
  site: 'https://arcane.no',
  base: '/invest',
  integrations: [react(), partytown(), sitemap(), turbolink()],
});
