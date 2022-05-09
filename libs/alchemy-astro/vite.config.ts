/** @format */

import path from 'path';
import { defineConfig } from 'vite';

const config = defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'alchemy-astro',
      fileName: (format) => `alchemy-astro.${format}.js`,
    },
  },
});

export default config;
