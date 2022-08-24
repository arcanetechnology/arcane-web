/** @format */
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Layout from '@podium/layout';
import utils from '@podium/utils';
import pkg from './package.json' assert { type: 'json' };
import manifest from './dist/client/manifest.json' assert { type: 'json' };

const PORT = 3000;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort
) {
  const resolve = (p) => path.resolve(__dirname, p);

  const app = express();
  let vite;

  const layout = new Layout({
    name: 'arcane', // required
    pathname: '/', // required
  });

  layout.view(async (incoming, header, footer, application) => {
    const template = fs.readFileSync(
      resolve('dist/client/index.html'),
      'utf-8'
    );

    const render = (await import('./dist/server/entry-server.js')).render;
    const { body, hydration } = render();

    const html = template
      .replace(`<!--ssr-outlet-->`, body)
      .replace('<!--ssr-hydration-->', hydration)
      .replace(
        '<!--app-scripts-->',
        incoming.js.map(utils.buildScriptElement).join('\n')
      )
      .replace(
        '<!--app-styles-->',
        incoming.css.map(utils.buildLinkElement).join('\n')
      );

    return html;
  });

  const arcaneHeader = layout.client.register({
    name: 'header', // required
    uri: 'http://localhost:3002/manifest.json', // required
  });

  const arcaneFooter = layout.client.register({
    name: 'footer', // required
    uri: 'http://localhost:3003/manifest.json', // required
  });

  app.use(layout.middleware());

  if (!isProd) {
    vite = await (
      await import('vite')
    ).createServer({
      root,
      logLevel: isTest ? 'error' : 'info',
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: 'custom',
    });

    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use((await import('compression')).default());
    app.use(
      (await import('serve-static')).default(resolve('dist/client'), {
        index: false,
      })
    );
  }

  // find the assets and bundle it up.
  Object.keys(manifest).forEach((k) => {
    if (manifest[k].css) {
      manifest[k].css.map((c) => {
        layout.css({ value: c });
      });
    }

    if (k.includes('.html')) {
      layout.js({
        value: manifest[k].file,
        type: 'module',
        defer: true,
      });
    }
  });

  app.use('/auth', (req, res) => {
    res.send('<h1>login</h1>');
  });
  app.use('*', async (req, res) => {
    try {
      //const url = req.originalUrl;
      const incoming = res.locals.podium;
      const [header, footer] = await Promise.all([
        arcaneHeader.fetch(incoming),
        arcaneFooter.fetch(incoming),
      ]);
      incoming.podlets = [header, footer];

      const document = await layout.render(
        incoming,
        header.content,
        footer.content,
        '<h1> some app </h1>'
      );
      res.send(document);
    } catch (err) {
      !isProd && vite.ssrFixStacktrace(err);
      res.status(500).end(err.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(3000, () => {
      console.log(
        `⚡ - (${pkg.name}) : has started on http://localhost:${PORT}`
      );
    })
  );
}
