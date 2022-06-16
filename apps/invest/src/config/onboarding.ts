/** @format */

import type { ArcaneFlowConfig } from '@arcane-web/arcane-flow';

export type Questions =
  | 'question.1'
  | 'question.2'
  | 'question.3'
  | 'question.4'
  | 'question.5'
  | 'question.6'
  | 'warning';

export type Answers = 'yes' | 'no';

const config: ArcaneFlowConfig<Questions, Answers> = {
  'question.1': (val, history) => {
    if (val === 'yes') return 'warning';
    return 'question.2';
  },
  'question.2': (val, history) => {
    if (val === 'yes') return 'warning';
    return 'question.3';
  },
  'question.3': (val, history) => {
    if (val === 'yes') return 'warning';
    return 'question.4';
  },
  'question.4': (val, history) => {
    if (val === 'yes') return 'question.5';
    return 'question.5';
  },
  'question.5': (val, history) => {
    const question4 = history.find(
      (question) => question.node === 'question.4'
    );

    if (question4.answer === 'yes' && val === 'yes') return 'warning';
    return 'question.6';
  },
  'question.6': (val, history) => {
    const question5 = history.find(
      (question) => question.node === 'question.5'
    );

    if (question5.answer === 'yes' && val === 'yes') return 'warning';
    return 'warning';
  },
};

export default config;
