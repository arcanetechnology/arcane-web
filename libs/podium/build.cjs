#!/usr/bin/env node
/** @format */

require('esbuild')
  .build({
    bundle: true,
    entryPoints: ['src/index.ts', 'src/server.ts'],
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
    assetNames: '[dir]/[name]',
  })
  .then(() => console.log('⚡ Done'))
  .catch(() => process.exit(1));
