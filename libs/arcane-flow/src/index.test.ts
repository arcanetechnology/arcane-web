/**
 * @ Author: Joel D'Souza
 * @ Create Time: 2022-05-05 20:00:37
 * @ Modified by: Joel D'Souza
 * @ Modified time: 2022-05-17 20:29:42
 * @ Description: arcane-flow test suite
 *
 * @format
 */

import ArcaneFlow, { ArcaneFlowConfig } from './index';

type NodeName = 'A' | 'B' | 'C' | 'D' | 'E';
type Answers = 'yes' | 'no' | 'maybe' | '1';

describe('arcane flow function', () => {
  it('should be able to take object based configuration file with root node', () => {
    const config: ArcaneFlowConfig<NodeName, Answers> = {
      A: {
        B: (val) => val === 'no',
      },
    };

    const { curr, next } = ArcaneFlow(config, 'A');
    expect(curr).toBe('A');
  });

  it('should be able to go to next node when next function is given the answer', () => {
    const config: ArcaneFlowConfig<NodeName, Answers> = {
      A: {
        B: (val) => val === 'no',
        C: (val) => val === 'yes',
        D: (val) => val === '1',
        E: (val) => val === 'maybe',
      },
    };

    const { next } = ArcaneFlow(config, 'A');
    const nextNode = next('no');
    expect(nextNode).toBe('B');
  });

  it('should be able to traverse the chain with the help of next function', () => {
    const config: ArcaneFlowConfig<NodeName, Answers> = {
      A: {
        B: (val) => val === 'no',
        C: (val) => val === 'yes',
      },

      B: {
        D: (val) => val === 'maybe',
      },

      D: {
        C: (val) => val === 'yes',
      },
    };

    const { next } = ArcaneFlow(config, 'A');
    next('no');
    next('maybe');
    const cNode = next('yes');
    expect(cNode).toBe('C');
  });

  it('should be able to give the same node name when we are at the end of the chain', () => {
    const config: ArcaneFlowConfig<NodeName, Answers> = {
      A: {
        B: (val) => val === 'no',
        C: (val) => val === 'yes',
      },

      B: {
        D: (val) => val === 'maybe',
      },
    };

    const { next } = ArcaneFlow(config, 'A');
    next('no');
    const dNode = next('maybe');
    expect(dNode).toBe('D');
    const cNode = next('yes');
    expect(cNode).toBe('D');
  });
});
