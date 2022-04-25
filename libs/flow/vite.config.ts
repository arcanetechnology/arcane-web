/** @format */

import { defineConfig } from 'vite';
import typescript from '@rollup/plugin-typescript';
import path from 'path';

const resolvePath = (dir: string) => path.resolve(__dirname, dir);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolvePath('./src/index.ts'),
      name: '@arcane/flow',
      fileName: (format) => `arcane-flow-${format}.js`,
    },
  },
  plugins: [typescript()],
});
