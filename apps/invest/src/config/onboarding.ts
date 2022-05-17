/** @format */

import type { ArcaneFlowConfig } from '@arcane-web/arcane-flow';

export type Questions =
  | 'elective-professional.2'
  | 'elective-professional.1'
  | 'pro.2'
  | 'pro.4'
  | 'pro.3'
  | 'pro.1'
  | 'intro';

export type Answers = 'yes' | 'no';

const config: ArcaneFlowConfig<Questions, Answers> = {
  intro: {
    'elective-professional.1': (val) => val === 'yes',
    'elective-professional.2': (val) => val === 'no',
  },
  'elective-professional.1': {
    'pro.1': (val) => val === 'yes',
  },
  'elective-professional.2': {
    'pro.2': (val) => val === 'yes',
  },
  'pro.1': {
    'pro.2': (val) => val === 'yes',
  },
  'pro.2': {
    'pro.3': (val) => val === 'yes',
  },
  'pro.3': {
    'pro.4': (val) => val === 'yes',
  },
};

export default config;
