/** @format */
import express from 'express';
import type { Express } from 'express';
import { root, app as auth } from './routes';
import { assets, port, name } from './constants';

const app: Express = express();
app.use('/assets', express.static(assets));
app.use('/', root);
app.use('/app', auth);

app.listen(port, () => {
  console.log(`⚡️[${name}]: Server is running at https://localhost:${port}`);
});
