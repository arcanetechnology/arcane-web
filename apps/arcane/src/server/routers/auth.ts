/** @format */

import express from 'express';
import type { Request, Response } from 'express';

const auth = express.Router();

auth.get('/', (req: Request, res: Response) => {
  res.status(200).type('text/html').send('arcane login');
});

auth.get('/:id', (req: Request, res: Response) => {
  res.status(200).type('text/html').send('client app site');
});

export default auth;
