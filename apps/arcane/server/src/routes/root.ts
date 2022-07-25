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

root.get('*', tailor.requestHandler);

export default root;
