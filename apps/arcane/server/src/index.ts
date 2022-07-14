/** @format */
import express from 'express';
import type { Express } from 'express';
import expressWinston from 'express-winston';
import { name, port, jsFiles } from './constants';
import { loggerConfig } from './service';
import { arcane, auth } from './routers';

const app: Express = express();
app.use(expressWinston.logger(loggerConfig));
app.use('/js/', express.static(jsFiles));
app.use('/auth', auth);
app.use('/', arcane);
app.listen(port, () => {
  console.log(`⚡️[${name}]: Server is running at https://localhost:${port}`);
});
