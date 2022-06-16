/**
 * @ Author: Joel D'Souza
 * @ Create Time: 2022-05-05 20:00:37
 * @ Modified by: Joel D'Souza
 * @ Modified time: 2022-06-14 12:12:12
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
      A: (val, history) => {
        if (val === 'yes') return 'B';
        return 'A';
      },
    };

    const { getCurrent } = ArcaneFlow(config, 'A');
    expect(getCurrent()).toBe('A');
  });

  it('should be able to go to next node when next function is given the answer', () => {
    const config: ArcaneFlowConfig<NodeName, Answers> = {
      A: (val, history) => {
        switch (val) {
          case 'no':
            return 'B';
          case '1':
            return 'D';
          case 'yes':
            return 'C';
          case 'maybe':
            return 'E';
          default:
            return 'A';
        }
      },
    };

    const { next } = ArcaneFlow(config, 'A');
    const nextNode = next('no');
    expect(nextNode).toBe('B');
  });

  it('should be able to traverse the chain with the help of next function', () => {
    const config: ArcaneFlowConfig<NodeName, Answers> = {
      A: (val, history) => {
        switch (val) {
          case 'no':
            return 'B';
          case 'yes':
            return 'C';
          default:
            return 'A';
        }
      },
      B: (val, history) => {
        switch (val) {
          case 'maybe':
            return 'D';
          default:
            return 'B';
        }
      },
      D: (val, history) => {
        switch (val) {
          case 'yes':
            return 'C';
          default:
            return 'D';
        }
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
      A: (val, history) => {
        switch (val) {
          case 'no':
            return 'B';
          case 'yes':
            return 'C';
          default:
            return 'A';
        }
      },
      B: (val, history) => {
        switch (val) {
          case 'maybe':
            return 'D';
          default:
            return 'B';
        }
      },
    };

    const { next } = ArcaneFlow(config, 'A');
    next('no');
    const dNode = next('maybe');
    expect(dNode).toBe('D');
    const cNode = next('yes');
    expect(cNode).toBe('D');
  });

  it('should be able to give the root node name if we use the previous function on root node', () => {
    const config: ArcaneFlowConfig<NodeName, Answers> = {
      A: (val, history) => {
        switch (val) {
          case 'no':
            return 'B';
          case 'yes':
            return 'C';
          default:
            return 'A';
        }
      },
      B: (val, history) => {
        switch (val) {
          case 'maybe':
            return 'D';
          default:
            return 'B';
        }
      },
    };
    const { previous } = ArcaneFlow(config, 'A');

    const nodeName = previous();
    expect(nodeName).toBe('A');
  });

  it('should be able to give the previous node name when we use previous function', () => {
    const config: ArcaneFlowConfig<NodeName, Answers> = {
      A: (val, history) => {
        switch (val) {
          case 'no':
            return 'B';
          case 'yes':
            return 'C';
          default:
            return 'A';
        }
      },
      B: (val, history) => {
        switch (val) {
          case 'maybe':
            return 'D';
          default:
            return 'B';
        }
      },
    };
    const { next, previous } = ArcaneFlow(config, 'A');
    next('no');
    const nextNode = next('maybe');
    expect(nextNode).toBe('D');
    const prevNode = previous();
    expect(prevNode).toBe('B');
  });
});
