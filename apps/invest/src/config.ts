/** @format */

import ArcaneFlowBuilder from '@arcane-web/arcane-flow';

export type Questions =
  | 'elective-professional.2'
  | 'elective-professional.1'
  | 'pro.2'
  | 'pro.4'
  | 'pro.3'
  | 'pro.1'
  | 'intro';

export type Answers = 'yes' | 'no';

const flow = new ArcaneFlowBuilder<Questions, Questions, Answers>()
  .addNode(
    { name: 'elective-professional.1', data: 'elective-professional.1' },
    { name: 'elective-professional.2', data: 'elective-professional.2' },
    { name: 'pro.1', data: 'pro.1' },
    { name: 'pro.2', data: 'pro.2' },
    { name: 'pro.3', data: 'pro.3' },
    { name: 'pro.4', data: 'pro.4' },
    { name: 'intro', data: 'intro' }
  )
  .addEdge(
    {
      source: 'intro',
      destination: 'elective-professional.1',
      logic: (val) => val === 'yes',
    },
    {
      source: 'intro',
      destination: 'elective-professional.2',
      logic: (val) => val === 'no',
    }
  )
  .build('intro');

export default flow;
