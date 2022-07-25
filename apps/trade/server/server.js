/** @format */

import compression from 'compression';
import fs from 'fs';
import polka from 'polka';
import sirv from 'sirv';
import { createRequest } from 'solid-start/runtime/fetch.js';
import { Readable } from 'stream';
import { once } from 'events';

const getAssets = (manifest, type, host) => {
  return manifest
    .filter((asset) => asset.type === type)
    .map(
      (asset) =>
        `<http://${host}${asset.href}>; ${
          type === 'script' ? 'rel="fragment-script"' : 'rel="stylesheet"'
        },`
    )
    .join(' ');
};

export function createServer({ entry, paths, manifest }) {
  const comp = compression({ threshold: 0 });

  console.log(manifest);

  const assets_handler = fs.existsSync(paths.assets)
    ? sirv(paths.assets, {
        brotli: true,
        maxAge: 31536000,
        immutable: true,
        setHeaders: (res, path, stats) => {
          res.setHeader('Access-Control-Allow-Origin', '*');
        },
      })
    : (_req, _res, next) => {
        return next();
      };

  const render = async (req, res) => {
    if (req.url === '/favicon.ico') return;

    const rootCss =
      manifest['*'] && getAssets(manifest['*'], 'style', req.headers.host);
    const urlCss =
      manifest[req.url] &&
      getAssets(manifest[req.url], 'style', req.headers.host);

    const rootJs =
      manifest['*'] && getAssets(manifest['*'], 'script', req.headers.host);

    const urlJs =
      manifest[req.url] &&
      getAssets(manifest[req.url], 'script', req.headers.host);

    const css = `${rootCss} ${urlCss}`;

    const js = `${urlJs}`;

    const webRes = await entry({
      request: createRequest(req),
      responseHeaders: new Headers(),
      manifest,
    });

    res.statusCode = webRes.status;
    res.statusMessage = webRes.statusText;
    res.setHeader('Link', `${css} ${js}`);
    for (const [name, value] of webRes.headers) {
      console.log(name, value);
      res.setHeader(name, value);
    }

    if (webRes.body) {
      const readable = Readable.from(webRes.body);
      readable.pipe(res);
      await once(readable, 'end');
    } else {
      res.end();
    }
  };

  const server = polka().use('/', comp, assets_handler).use(comp, render);

  return server;
}
