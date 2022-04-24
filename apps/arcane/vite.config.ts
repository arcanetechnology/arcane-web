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
        design: 'http://localhost:4173/assets/remoteEntry.js',
      },
    }),
  ],
});

// TODO: deployement strategy (flow) for arcane apps.
// TODO: make arcane ssg
// TODO: figure out a way for build time fetch.
// TODO: try to figure out how to integrate jest
