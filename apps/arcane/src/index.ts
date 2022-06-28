/** @format */

import express from 'express';
import Layout from '@podium/layout';
import type { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { allowedNodeEnvironmentFlags } from 'process';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// podium layout
const layout = new Layout({
  name: 'arcane',
  pathname: '/',
});

const apps = layout.client.register({
  name: 'trade',
  uri: 'http://localhost:3001/manifest.json',
});

app.use(layout.middleware());

app.get('/trade', async (req, res) => {
  const incoming = res.locals.podium;
  const response = await apps.fetch(incoming);
  incoming.view.title = 'Arcane Trade Page';
  res.podiumSend(`<div>${response}</div>`);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[arcane]: arcane is running at https://localhost:${port}`);
});
