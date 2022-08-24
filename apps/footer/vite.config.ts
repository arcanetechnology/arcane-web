/** @format */

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import solidSvg from 'vite-plugin-solid-svg';

export default defineConfig({
  plugins: [solid({ ssr: true }), solidSvg()],
  ssr: {
    noExternal: ['@solidjs/router'],
  },
  build: {
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
