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
  coverageThreshold: {
    global: {
      lines: 90,
    },
  },

  projects: [
    {
      testEnvironment: 'jsdom',
      globals: {
        'ts-jest': {
          tsconfig: '<rootDir>/libs/alchemy/tsconfig.json',
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
      transform: {
        '^.+\\.(t|j)sx?$': 'ts-jest',
      },
      setupFilesAfterEnv: ['./jest-setup.ts'],
      setupFiles: ['regenerator-runtime'],
      testMatch: ['<rootDir>/libs/alchemy/**/?(*.)+(spec|test).[jt]s?(x)'],
    },
    {
      displayName: {
        name: 'arcane-flow',
        color: 'magentaBright',
      },
      testEnvironment: 'node',
      transform: {
        '^.+\\.(t|j)sx?$': 'ts-jest',
      },
      testMatch: ['<rootDir>/libs/arcane-flow/**/?(*.)+(spec|test).[jt]s?(x)'],
    },
  ],
};

export default config;
