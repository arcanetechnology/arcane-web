/** @format */

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidSvg from 'vite-plugin-solid-svg';

export default defineConfig({
  plugins: [solidPlugin(), solidSvg({ defaultExport: 'component' })],
  build: {
    base: '/invest',
    outDir: './dist/invest',
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
