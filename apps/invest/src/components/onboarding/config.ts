/** @format */

import type { ArcaneFlowConfig } from '@arcane-web/arcane-flow';

export type Questions =
  | 'question1'
  | 'question2'
  | 'question3'
  | 'question4'
  | 'question5'
  | 'question6'
  | 'warning';

export type Answers = 'yes' | 'no';

const config: ArcaneFlowConfig<Questions, Answers> = {
  question1: (val, history) => {
    if (val === 'yes') return 'warning';
    return 'question2';
  },
  question2: (val, history) => {
    if (val === 'yes') return 'warning';
    return 'question3';
  },
  question3: (val, history) => {
    if (val === 'yes') return 'warning';
    return 'question4';
  },
  question4: (val, history) => {
    return 'question5';
  },
  question5: (val, history) => {
    const question4 = history.find((question) => question.node === 'question4');

    if (question4.answer === 'yes' && val === 'yes') return 'warning';
    if (question4.answer === 'no' && val === 'no') throw new Error('you are not qualified!');
    return 'question6';
  },
  question6: (val, history) => {
    const question4 = history.find((question) => question.node === 'question4');
    const question5 = history.find((question) => question.node === 'question5');

    let yesCount = 0
    if (question4.answer === 'yes') ++yesCount;
    if (question5.answer === 'yes') ++yesCount;
    if (val === 'yes') ++yesCount;
    if (yesCount >= 2) {
      return 'warning';
    }
    throw new Error('you are not qualified');
  },
};

export default config;
