#!/usr/bin/env node
/** @format */

require('esbuild')
  .build({
    bundle: true,
    entryPoints: [
      'src/index.mts',
      'src/components/index.mts',
      'src/layouts/index.mts',
      'src/registry/apps.json',
      'src/service/service-worker.mts',
    ],
    outdir: 'dist',
    outExtension: {
      '.js': '.mjs',
    },
    external: ['firebase'],
    minify: false,
    format: 'esm',
    platform: 'node',
    target: 'node18',
    sourcemap: 'inline',
    sourcesContent: false,
    allowOverwrite: true,
    loader: {
      '.astro': 'file',
      '.json': 'file',
    },
    assetNames: '[dir]/[name]',
  })
  .then(() => console.log('⚡ Done'))
  .catch(() => process.exit(1));
