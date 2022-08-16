/** @format */

import { defineConfig } from 'vite';
import solid from 'vite-plugin-solid';

export default defineConfig({
  plugins: [solid({ ssr: true })],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: 'footer.js',
      },
    },
  },
});
