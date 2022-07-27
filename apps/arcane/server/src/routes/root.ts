/** @format */

import type { Router, Request, Response } from 'express';
import express from 'express';

import Tailor from 'tailorx';
import { templates } from '../constants';

const tailor = new Tailor({
  templatesPath: templates,
  maxAssetLinks: 100,
});
const root: Router = express.Router();

root.use((req: Request, res: Response) => {
  if (req.path === '/') {
    req.url = '/index';
  }
  console.log(req.path);
  tailor.requestHandler(req, res);
});
/* 
root.get('/:id', (req: Request, res: Response) => {
  console.log(req);
  tailor.requestHandler(req, res);
});
 */
export default root;
