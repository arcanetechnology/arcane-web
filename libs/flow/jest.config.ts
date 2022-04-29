/** @format */
import { Config } from '@jest/types';
import pkg from './package.json';

const config: Config.InitialOptions = {
  verbose: true,
  displayName: {
    name: pkg.name,
    color: 'magentaBright',
  },
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
};

export default config;
