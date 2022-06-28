/** @format */

import express from 'express';
import Podlet from '@podium/podlet';
import dotenv from 'dotenv';
import type { Express } from 'express';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

const trade = new Podlet({
  name: 'trade',
  version: '1.0.0',
  pathname: '/',
  content: '/',
  fallback: '/fallback',
  development: true,
});

app.use(trade.middleware());

app.get(trade.content(), (req, res) => {
  res.status(200).podiumSend(`<div>Welcome to trade</div>`);
});

app.get(trade.manifest(), (req, res) => {
  res.status(200).send(trade);
});

app.listen(port, () => {
  console.log(`⚡️[trade]: trade is running at https://localhost:${port}`);
});
