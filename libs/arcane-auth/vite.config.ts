/** @format */

import path from 'path';
import { defineConfig } from 'vite';

const config = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'arcane-auth',
      fileName: (format) => `arcane-auth.${format}.js`,
    },
  },
});

export default config;
