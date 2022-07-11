/** @format */
import express, { Express } from 'express';
import pkg from '../../package.json';
import { auth } from './routers';

const port = 3000;
const app: Express = express();

app.use('/auth', auth);

/* app.get('/auth/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  // TODO: show error page
  //@ts-ignore
  const render = (await import('../../dist/ssr/entry.server.js'))['render'];
  const { html } = await render();
  res.status(200).type('text/html').send(html);
}); */

app.listen(port, () => {
  console.log(
    `⚡️[${pkg.name}]: Server is running at https://localhost:${port}`
  );
});
