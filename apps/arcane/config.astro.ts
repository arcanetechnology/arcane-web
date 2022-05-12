/** @format */

import { defineConfig } from 'astro/config';

import solid from '@astrojs/solid-js';
import partytown from '@astrojs/partytown';
import sitemap from '@astrojs/sitemap';
import turbolink from '@astrojs/turbolinks';

export default defineConfig({
  site: 'https://arcane.no',
  integrations: [solid(), partytown(), sitemap(), turbolink()],
});
