/** @format */
import express from 'express';
import type { Express, Request, Response } from 'express';

const app: Express = express();

app.get('*', (req: Request, res: Response) => {
  res.status(200).send('Hello World!');
});

app.listen(3000, () => {
  console.log(`⚡️[arcane]: Server is running at https://localhost:3000`);
});
