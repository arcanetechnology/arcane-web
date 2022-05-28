/** @format */

import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  displayName: {
    name: 'arcane-flow',
    color: 'magentaBright',
  },
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
};

export default config;
