/** @format */

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
// import importToCDN from 'vite-plugin-cdn-import';

export default defineConfig({
  plugins: [
    solid(),
    /*  importToCDN({
      modules: [
        {
          name: 'solid-js',
          var: 'Solid',
          path: 'https://cdn.skypack.dev/solid-js',
        },
        {
          name: 'solid-js/web',
          var: 'Web',
          path: 'https://cdn.skypack.dev/solid-js/web',
        },
      ],
    }), */
  ],
  build: {
    target: 'esnext',
    polyfillModulePreload: true,
    rollupOptions: {
      output: {
        entryFileNames: 'trade-admin.js',
      },
    },
  },
});
