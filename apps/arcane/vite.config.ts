/** @format */

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import path from 'path';

export default defineConfig({
  plugins: [solid({ ssr: true })],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src/client') },
      {
        find: '@pages',
        replacement: path.resolve(__dirname, './src/client/pages'),
      },
      {
        find: '@components',
        replacement: path.resolve(__dirname, './src/client/components'),
      },
      {
        find: '@utils',
        replacement: path.resolve(__dirname, './src/client/utils'),
      },
    ],
  },
});
