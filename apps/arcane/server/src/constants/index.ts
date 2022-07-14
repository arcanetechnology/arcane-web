/** @format */

import { dirname, resolve } from 'path';
import pkg from '../../../package.json';
export const name = pkg.name;
export const port = 3001;
export const isProduction = process.env.NODE_ENV === 'production';
export const newDirName = dirname(new URL(import.meta.url).pathname);
export const clientRoot = resolve(newDirName, '../../client');
export const jsFiles = resolve(newDirName, '../../../dist/public/js/');

// TODO: change it later
export const templates = resolve(newDirName, '../../../dist/public');

export const clientEntry = resolve(clientRoot, 'index.html');
