/** @format */

import { Flowable, FlowableNode } from './index';

describe('flowable nodes of functions', () => {
  const entryFunction: Flowable<void> = (callback) => {
    callback(true);
    console.log('hello');
  };

  const middleFunction: Flowable<void> = (callback) => {
    callback(true);
    console.log('Middle');
  };

  const endFunction: Flowable<void> = (callback) => {
    callback(false);
    console.log('bye');
  };

  it('each flowable node should have an id', () => {
    const first = new FlowableNode(1, entryFunction);
    const mid = new FlowableNode(2, middleFunction);
    const last = new FlowableNode(3, endFunction);

    expect(first.getId()).toBe(1);
    expect(mid.getId()).toBe(2);
    expect(last.getId()).toBe(3);
  });

  it('should be able to connect to each other', () => {
    const first = new FlowableNode(1, entryFunction);
    const second = new FlowableNode(2, middleFunction);

    FlowableNode.joinOnTrue(first, second);
  });
});
