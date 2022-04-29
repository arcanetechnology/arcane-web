/** @format */
import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  verbose: true,
  transform: {
    '\\.[jt]sx?$': 'ts-jest',
  },
};

export default config;
