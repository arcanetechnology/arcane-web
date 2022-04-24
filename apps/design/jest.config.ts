/** @format */

import { Config } from '@jest/types';

const config: Config.InitialOptions = {
  displayName: '@arcane/design',
  preset: '../../jest.preset.ts',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/arcane',
};

export default config;
