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
      name: 'flow',
      fileName: (format) => {
        return format === 'umd' ? 'index.js' : `flow-${format}.js`;
      },
    },
  },
  plugins: [typescript({ sourceMap: true })],
});
