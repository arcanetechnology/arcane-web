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
    rollupOptions: {
      external: ['solid-js', 'solid-js/web'],
      output: {
        globals: {
          'solid-js': 'Solid',
          'solid-js/web': 'Web',
        },
      },
    },
  },
});
