/** @format */

import { createEdge, createNode, flowNodeMap } from './utilities';

// important for now.
type Answers = 'yes' | 'no' | 'A' | 'B' | number | boolean;
type Nodes = 'A' | 'B' | 'C' | 'D' | 'E';

describe('basic builder user functions', () => {
  it('should be able to create node using create node', () => {
    const node = createNode('A', '/a');
    expect(node).toStrictEqual({ name: 'A', data: '/a' });
  });

  it('should be able to create links between nodes with some logic', () => {
    const logic = (val: Answers) => val < 10;
    const edge = createEdge('A', 'B', logic);
    expect(edge).toStrictEqual({ source: 'A', destination: 'B', logic });
  });

  it('should be able to normalize the list of nodes into a manageable data structure', () => {
    const node1 = createNode<Nodes, string>('A', '/a');
    const node2 = createNode<Nodes, string>('B', '/b');
    const node3 = createNode<Nodes, string>('C', '/c');
    const normalized = flowNodeMap([node1, node2, node3]);
    expect(normalized).toStrictEqual({
      A: '/a',
      B: '/b',
      C: '/c',
    });
  });
});
