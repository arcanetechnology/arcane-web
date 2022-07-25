/** @format */

import { defineConfig } from 'vite';
import solid from 'solid-start';
import arcaneAdapter from './server';

export default defineConfig({
  plugins: [solid({ ssr: true, inspect: true, adapter: arcaneAdapter() })],
});
