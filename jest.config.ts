/** @format */
import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  displayName: {
    name: 'arcane-web',
    color: 'black',
  },
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
  collectCoverage: true,
  collectCoverageFrom: ['./apps/**/src/**', './libs/**/src/**'],
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },
  projects: ['<rootDir>', '<rootDir>/apps/*', '<rootDir>/libs/*'],
};

export default config;
