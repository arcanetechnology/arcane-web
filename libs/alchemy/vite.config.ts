/** @format */
/** @format */

import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const config = defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'alchemy',
      formats: ['es', 'umd'],
      fileName: (format) => `alchemy.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
  },
});

export default config;

// TODO: gotta remove react from everywhere
