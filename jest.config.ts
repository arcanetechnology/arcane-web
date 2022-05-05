/** @format */
import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  transform: {
    '^.+\\.(t|j)sx?$': 'ts-jest',
  },
};

export default config;
