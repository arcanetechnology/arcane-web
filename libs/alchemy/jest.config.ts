/** @format */

import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
      babelConfig: {
        presets: ['babel-preset-solid', '@babel/preset-env'],
      },
    },
  },
  moduleNameMapper: {
    'solid-js/web': '<rootDir>/node_modules/solid-js/web/dist/web.cjs',
    'solid-js': '<rootDir>/node_modules/solid-js/dist/solid.cjs',
  },
  displayName: {
    name: 'alchemy',
    color: 'magentaBright',
  },
  roots: ['<rootDir>'],
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
};

export default config;
