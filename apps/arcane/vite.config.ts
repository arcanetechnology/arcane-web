/** @format */

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';

import path from 'path';

export default defineConfig({
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  plugins: [
    solidPlugin({ ssr: true }),
    VitePWA({
      manifestFilename: 'assets/manifest.json',
      outDir: 'dist/client/assets/',
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      injectRegister: null,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
