/** @format */

import fastify from 'fastify';
import middie from '@fastify/middie';
import path from 'node:path';
import { readFile } from 'node:fs/promises';
import type { ViteDevServer } from 'vite';

async function createServer(
  root = process.cwd(),
  isProd = process.env['NODE_ENV'] === 'production'
) {
  const resolve = (p: string) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? await readFile(resolve('../dist/client/index.html'), 'utf-8')
    : '';

  const app = fastify({ logger: true });

  let vite: ViteDevServer;

  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      server: {
        middlewareMode: 'ssr',
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
      },
    });

    await app.register(middie);
    app.use(vite.middlewares);
  } else {
    await app.register((await import('@fastify/static')).default, {
      root: resolve('../dist/client/assets'),
      prefix: '/assets',
    });
  }

  app.get('*', async (req, rep) => {
    try {
      const { url } = req;

      let template, render;

      if (!isProd) {
        // always read fresh template in dev
        template = await readFile(resolve('../index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry.server.tsx'))['render'];
      } else {
        template = indexProd;
        // @ts-ignore
        render = (await import('../dist/ssr/entry.server.js'))['render'];
      }

      const { appHtml, hydrationScript, hydration, css } = await render(url);

      const html = template
        .replace('<!--hydrationScript-->', hydrationScript)
        .replace(`<!--hydration-->`, hydration)
        .replace(`<!--appHtml-->`, appHtml)
        .replace(`<!--css-->`, `<style id="_goober">${css}</style>`);

      rep.code(200).type('text/html').send(html);
    } catch (e: any) {
      rep.code(500).send(e.stack);
    }
  });

  if (isProd) {
    await app.register((await import('@fastify/compress')).default);
  }

  return app;
}

createServer().then((app) => {
  app.listen({ host: '0.0.0.0', port: 5173 });
});
