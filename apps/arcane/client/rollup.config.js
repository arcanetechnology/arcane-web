/** @format */

import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import { defineConfig } from 'rollup';

const extensions = ['.ts', '.tsx', '.js', '.jsx'];

export default defineConfig([
  {
    input: 'client/src/client.tsx',
    output: [
      {
        dir: 'dist/public/js',
        format: 'esm',
      },
    ],
    external: ['solid-js', 'solid-js/web'],
    preserveEntrySignatures: false,
    plugins: [
      nodeResolve({
        extensions,
        exportConditions: ['solid'],
      }),
      babel({
        babelHelpers: 'bundled',
        extensions,
        presets: [
          ['solid', { generate: 'dom', hydratable: true }],
          '@babel/preset-typescript',
        ],
      }),
      terser(),
    ],
  },
  {
    input: 'client/src/server.main.tsx',
    output: [
      {
        dir: 'dist/public/js/ssg',
        exports: 'auto',
        format: 'cjs',
      },
    ],
    external: ['solid-js', 'solid-js/web'],
    plugins: [
      nodeResolve({
        preferBuiltins: true,
        exportConditions: ['solid'],
        extensions,
      }),
      babel({
        babelHelpers: 'bundled',
        extensions,
        presets: [
          ['solid', { generate: 'ssr', hydratable: true }],
          '@babel/preset-typescript',
        ],
      }),
    ],
  },
]);
