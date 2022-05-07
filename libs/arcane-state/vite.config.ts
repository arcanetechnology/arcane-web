/** @format */

import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const config = defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'arcane-state',
      fileName: (format) => `arcane-flow.${format}.js`,
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          React: 'React',
          ReactDOM: 'ReactDOM',
        },
      },
    },
  },
});

export default config;
