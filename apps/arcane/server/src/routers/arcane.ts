/** @format */

import express from 'express';
import type { Router, Request, Response } from 'express';
import Tailor from 'node-tailor';
import { templates } from '../constants';

const arcane: Router = express.Router({});

const tailor = new Tailor({
  templatesPath: templates,
  maxAssetLinks: 10,
});

arcane.get('/', async (req: Request, res: Response) => {
  req.url = 'index';
  tailor.requestHandler(req, res);
});

arcane.get('/:id', async (req: Request, res: Response) => {
  tailor.requestHandler(req, res);
});

export default arcane;
