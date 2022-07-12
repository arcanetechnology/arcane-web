/** @format */

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import path from 'path';

export default defineConfig({
  plugins: [solid()],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, './src/pages'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/components'),
      },
    ],
  },
});
