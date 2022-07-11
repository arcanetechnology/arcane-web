/** @format */
import express, { Express } from 'express';
import expressWinston from 'express-winston';
import { name, port } from './constants';
import { auth } from './routers';
import { loggerConfig } from './service';

const app: Express = express();
app.use(expressWinston.logger(loggerConfig));

app.use('/auth', auth);

app.listen(port, () => {
  console.log(`⚡️[${name}]: Server is running at https://localhost:${port}`);
});
