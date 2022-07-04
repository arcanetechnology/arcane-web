/** @format */

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidSvg from 'vite-plugin-solid-svg';

export default defineConfig({
  base: '/invest/',
  plugins: [solidPlugin(), solidSvg({ defaultExport: 'component' })],
  build: {
    outDir: './dist/invest',
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
