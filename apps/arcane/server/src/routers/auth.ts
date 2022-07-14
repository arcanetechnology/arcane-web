/** @format */

import express from 'express';
import type { Router, Request, Response } from 'express';
import Tailor from 'node-tailor';
import { templates } from '../constants';

const auth: Router = express.Router({
  strict: true,
  mergeParams: true,
  caseSensitive: true,
});
const tailor = new Tailor({
  templatesPath: templates,
  maxAssetLinks: 10,
});

auth.get('/', (req: Request, res: Response) => {
  req.url = 'auth';
  tailor.requestHandler(req, res);
});

auth.get('/home', (req: Request, res: Response) => {
  tailor.requestHandler(req, res);
});

export default auth;
