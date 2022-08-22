/** @format */

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  base: '/',
  plugins: [solid({ ssr: true })],

  build: {
    emptyOutDir: true,
    manifest: true,
    ssrManifest: true,
  },
});
