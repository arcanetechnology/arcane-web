/** @format */
/** @format */

import path from 'path';
import { defineConfig } from 'vite';
import solidjsplugin from 'vite-plugin-solid';

const config = defineConfig({
  plugins: [solidjsplugin],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'alchemy',
      formats: ['es', 'umd'],
      fileName: (format) => `alchemy.${format}.js`,
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

// TODO: gotta remove react from everywhere
