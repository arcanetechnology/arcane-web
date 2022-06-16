/** @format */

import path from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

const config = defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'arcane-flow',
      fileName: (format) => `arcane-flow.${format}.js`,
    },
  },
  plugins: [dts()],
});

export default config;
