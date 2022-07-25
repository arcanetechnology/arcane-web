/** @format */

import path from 'path';
import pkg from '../../../package.json';

const __dirname = path.resolve(path.dirname(''));

export const templates = path.join(__dirname, 'dist');
export const assets = path.join(__dirname, 'dist', 'assets');
export const port = 3001;
export const name = pkg.name;
