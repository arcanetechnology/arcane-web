/** @format */

import { createServer } from '../../server/server';
import prepareManifest from 'solid-start/runtime/prepareManifest.js';
import 'solid-start/runtime/node-globals.js';
import manifest from '../../dist/public/rmanifest.json';
import assetManifest from '../../dist/public/manifest.json';
import entry from './app';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

prepareManifest(manifest, assetManifest);

const { PORT = 3000 } = process.env;

const __dirname = dirname(fileURLToPath(import.meta.url));
const paths = {
  assets: join(__dirname, '/public'),
};

const server = createServer({
  paths,
  entry,
  manifest,
});

server.listen(PORT, (err) => {
  if (err) {
    console.log('error', err);
  } else {
    console.log(`Listening on port ${PORT}`);
  }
});
