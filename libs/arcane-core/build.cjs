#!/usr/bin/env node
/** @format */

const fs = require('fs');
const path = require('path');

require('esbuild')
  .build({
    bundle: true,
    entryPoints: [
      'src/index.mts',
      'src/components/index.mts',
      'src/layouts/index.mts',
      'src/registry/apps.json',
    ],
    outdir: 'dist',
    outExtension: {
      '.js': '.mjs',
    },
    external: ['@arcane-web/arcane-components', 'firebase'],
    minify: false,
    format: 'esm',
    platform: 'node',
    target: 'node18',
    sourcemap: 'inline',
    sourcesContent: false,
    allowOverwrite: true,
    loader: {
      '.astro': 'file',
      '.scss': 'file',
      '.json': 'file',
    },
    assetNames: '[dir]/[name]',
    plugins: [
      {
        name: 'copy',
        setup: (build) =>
          build.onEnd(() => {
            fs.cpSync(
              './src/assets/',
              path.join(path.join(build.initialOptions.outdir, '/assets/')),
              {
                recursive: true,
                force: true,
                dereference: true,
              }
            );
          }),
      },
    ],
  })
  .then(() => console.log('⚡ Done'))
  .catch(() => process.exit(1));
