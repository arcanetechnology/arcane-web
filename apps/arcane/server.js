/** @format */
//import Podlet from '@podium/podlet';
import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// app configuration can be stored in contentful????
/* const footer = new Podlet({
  name: 'footer',
  version: '1.0.0',
  pathname: '/footer',
  manifest: '/manifest.json',
  content: '/footer',
  development: true,
}); */

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isTest = process.env.NODE_ENV === 'test' || !!process.env.VITE_TEST_BUILD;

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === 'production',
  hmrPort
) {
  const resolve = (p) => path.resolve(__dirname, p);

  const indexProd = isProd
    ? fs.readFileSync(resolve('dist/client/index.html'), 'utf-8')
    : '';
  const app = express();
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

  app.use('*', async (req, res) => {
    try {
      const url = req.originalUrl;
      let template, render;
      if (!isProd) {
        template = fs.readFileSync(resolve('index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        render = (await vite.ssrLoadModule('/src/entry-server.tsx')).render;
      } else {
        template = indexProd;
        // @ts-ignore
        render = (await import('./dist/server/footer.js')).render;
      }

      const context = {};
      const { body, hydration } = render(url, context);

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context.url);
      }

      const html = template
        .replace(`<!--ssr-outlet-->`, body)
        .replace('<!--ssr-hydration-->', hydration);

      res.status(200).set({ 'Content-Type': 'text/html' }).end(html);
    } catch (err) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(3003, () => {
      console.log('http://localhost:3003');
    })
  );
}

/* import express from 'express';
import Layout from '@podium/layout';
import utils from '@podium/utils';

const app = express();

const layout = new Layout({
  name: 'arcane', // required
  pathname: '/', // required
});

layout.view((incoming, header, footer) => {
  return `<!doctype html>
    <html>
        <head>
            ${incoming.css.map(utils.buildLinkElement).join('\n')}
            ${incoming.js.map(utils.buildScriptElement).join('\n')}
            <script>var e,t;e=window._$HY||(_$HY={events:[],completed:new WeakSet,r:{}}),t=e=>e&&e.hasAttribute&&(e.hasAttribute("data-hk")?e:t(e.host&&e.host instanceof Node?e.host:e.parentNode)),["click","input"].forEach((o=>document.addEventListener(o,(o=>{let s=o.composedPath&&o.composedPath()[0]||o.target,a=t(s);a&&!e.completed.has(a)&&e.events.push([a,o])})))),e.init=(t,o)=>{e.r[t]=[new Promise(((e,t)=>o=e)),o]},e.set=(t,o,s)=>{(s=e.r[t])&&s[1](o),e.r[t]=[o]},e.unset=t=>{delete e.r[t]},e.load=(t,o)=>{if(o=e.r[t])return o[0]};</script>
        </head>
        <body>
        ${header}
        ${footer}
        </body>

    </html>`;
});

const headerPodlet = layout.client.register({
  name: 'header', // required
  uri: 'http://localhost:3001/manifest.json', // required
});

const footerPodlet = layout.client.register({
  name: 'footer', // required
  uri: 'http://localhost:3002/manifest.json', // required
});

app.use(layout.middleware());
app.get('/', async (req, res) => {
  const incoming = res.locals.podium;
  const [header, footer] = await Promise.all([
    headerPodlet.fetch(incoming),
    footerPodlet.fetch(incoming),
  ]);

  incoming.podlets = [header, footer];
  const document = layout.render(incoming, header.content, footer.content);
  res.send(document);
});

app.listen(3000, () => {
  console.log('arcane is on');
}); */
