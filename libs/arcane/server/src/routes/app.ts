/** @format */

import type { Router, Request, Response } from 'express';
import express from 'express';

import Tailor from 'tailorx';
import { templates } from '../constants';

const tailor = new Tailor({
  templatesPath: templates,
  maxAssetLinks: 100,
});

const app: Router = express.Router();

app.get('/', (req: Request, res: Response) => {
  req.url = '/app';
  tailor.requestHandler(req, res);
});

app.get('/:id', (req: Request, res: Response) => {
  console.log('hello');
  tailor.requestHandler(req, res);
});

export default app;

// TODO: trade
// TODO: trade-admin
