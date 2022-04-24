/** @format */

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import federation from '@originjs/vite-plugin-federation';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'arcane',
      filename: 'remoteEntry.js',
      remotes: {
        design: 'http://localhost:60076/remoteEntry.js',
      },
    }),
  ],
});
