/** @format */

import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import solidSvg from 'vite-plugin-solid-svg';

export default defineConfig({
  base: '/trade-admin/',
  plugins: [solidPlugin(), solidSvg({ defaultExport: 'component' })],
  build: {
    sourcemap: true,
    outDir: './dist/trade-admin',
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
