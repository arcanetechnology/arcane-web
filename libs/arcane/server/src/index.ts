/** @format */
import express from 'express';
import type { Express } from 'express';
import { root, app as auth } from './routes';
import { assets, port, name } from './constants';
import serveStatic from 'serve-static';

const app: Express = express();
app.use('/assets', serveStatic(assets));

app.use(root);

app.use('/app', auth);

app.listen(port, () => {
  console.log(`⚡️[${name}]: Server is running at https://localhost:${port}`);
});



// alchemy core 
// alchemy-solid 