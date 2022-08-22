/** @format */
import express from 'express';
// import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Podlet from '@podium/podlet';
import pkg from './package.json' assert { type: 'json' };
import manifest from './dist/client/manifest.json' assert { type: 'json' };

const PORT = 3003;

// app configuration can be stored in contentful????
const footer = new Podlet({
  name: 'footer',
  version: '1.0.0',
  pathname: '/',
  manifest: '/manifest.json',
  content: '/',
});

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort
) {
  const resolve = (p) => path.resolve(__dirname, p);

  // const indexProd = isProd
  //   ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
  //   : '';
  const app = express();
  app.use(footer.middleware());
  let vite;

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

  Object.keys(manifest).forEach((k) => {
    if (manifest[k].css) {
      manifest[k].css.map((c) => {
        footer.css({ value: `/dist/client/${c}` });
      });
    }

    if (k.includes('.html')) {
      footer.js({
        value: `/dist/client/${manifest[k].file}`,
        type: 'module',
        defer: true,
      });
    }
  });

  app.get(footer.manifest(), (req, res) => {
    res.status(200).send(footer);
  });

  app.get(footer.content(), async (req, res) => {
    try {
      const url = req.originalUrl;
      let render;
      if (!isProd) {
        // template = fs.readFileSync(resolve('index.html'), 'utf-8');
        // template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        // template = indexProd;
        // @ts-ignore
        render = (await import('./dist/server/footer.js')).render;
      }

      const context = {};
      const { body } = render(url, context);

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context.url);
      }

      // const html = template
      //   .replace(`<!--ssr-outlet-->`, body)
      //   .replace('<!--ssr-hydration-->', hydration);

      res.status(200).podiumSend(body);
    } catch (err) {
      !isProd && vite.ssrFixStacktrace(err);
      console.log(err.stack);
      res.status(500).end(err.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(PORT, () => {
      console.log(
        `⚡ - (${pkg.name}) : has started on http://localhost:${PORT}`
      );
    })
  );
}
