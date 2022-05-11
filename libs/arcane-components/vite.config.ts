/** @format */
/** @format */

import path from 'path';
import { defineConfig } from 'vite';

const config = defineConfig({
  plugins: [],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'arcane-components',
      formats: ['es', 'umd'],
      fileName: (format) => `arcane-components.${format}.js`,
    },
    rollupOptions: {
      external: ['solid-js'],
      output: {
        globals: {
          'solid-js': 'solid-js',
        },
      },
    },
  },
});

export default config;
