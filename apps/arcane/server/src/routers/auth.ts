/** @format */

import express from 'express';
import { Renderer } from '../service';
import { ssrEntry } from '../constants';
import type { Request, Response } from 'express';

const auth = express.Router();

auth.get('/', async (req: Request, res: Response) => {
  const { url } = req;
  const { html } = await Renderer.renderApp({ url }, ssrEntry);
  res.status(200).type('text/html').send(html);
});

auth.get('/:id', (req: Request, res: Response) => {
  res.status(200).type('text/html').send('client app site');
});

export default auth;
