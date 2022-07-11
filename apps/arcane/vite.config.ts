/** @format */

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';
import path from 'path';

export default defineConfig({
  plugins: [solid({ ssr: true })],
  server: { middlewareMode: 'ssr' },
  // @ts-ignore
  ssr: {
    noExternal: ['solid-app-router'],
  },
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
      { find: '@types', replacement: path.resolve(__dirname, './src/types') },
    ],
  },
});
