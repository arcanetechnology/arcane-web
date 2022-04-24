/** @format */

import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  testEnvironment: 'jsdom',
  testMatch: ['**/+(*.)+(spec|test).+(ts|js)?(x)'],
  verbose: true,
};

export default config;
