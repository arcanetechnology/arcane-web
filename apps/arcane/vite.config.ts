/** @format */

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import { VitePWA } from 'vite-plugin-pwa';
import solidSvg from 'vite-plugin-solid-svg';
import federation from '@originjs/vite-plugin-federation';

import path from 'path';

export default defineConfig({
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
    solidSvg({ defaultExport: 'url' }),
    federation({
      remotes: {
        trade: 'http://localhost:3000/remoteEntry.js',
      },
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
  // @ts-ignore
  ssr: {
    noExternal: ['solid-icons'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
