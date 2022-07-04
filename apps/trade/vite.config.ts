/** @format */

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import federation from '@originjs/vite-plugin-federation';

export default defineConfig({
  plugins: [
    solid(),
    federation({
      name: 'trade',
      filename: 'remoteEntry.js',
      remoteType: 'commonjs-module',
      exposes: {
        './Box': './src/box.tsx',
      },
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'solid-js': ['solid-js'],
        },
      },
    },
  },
});
