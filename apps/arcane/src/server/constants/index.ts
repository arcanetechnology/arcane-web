/** @format */

import { dirname, resolve } from 'path';
import pkg from '../../../package.json';
export const name = pkg.name;
export const port = 3000;
export const isProduction = process.env.NODE_ENV === 'production';
export const newDirName = dirname(new URL(import.meta.url).pathname);
export const clientRoot = resolve(newDirName, '../../client');

// TODO: change it later
export const ssrEntry = isProduction
  ? resolve(newDirName, '../../../dist/ssr/entry.server.js')
  : resolve(clientRoot, 'entry.server.tsx');

export const clientEntry = resolve(clientRoot, 'index.html');
