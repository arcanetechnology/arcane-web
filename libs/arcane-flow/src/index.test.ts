/**
 * @ Author: Joel D'Souza
 * @ Create Time: 2022-05-05 20:00:37
 * @ Modified by: Joel D'Souza
 * @ Modified time: 2022-05-08 00:24:42
 * @ Description: arcane-flow test suite
 *
 * @format
 */

import { Logic } from './types';
import { createEdge, createNode, flowNodeMap, getEdgeMaps } from './utilities';

// important for now.
type Answers = 'yes' | 'no' | 'A' | 'B' | true | false | 10 | 11 | 100;
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

  it('should be able to normalize the link between nodes into manageable data structure', () => {
    const logic1: Logic<Answers> = (val) => val === 'yes';
    const logic2: Logic<Answers> = (val) => val === 'no';
    const logic3: Logic<Answers> = (val) => val === 'A';
    const link1 = createEdge<Nodes, Answers>('A', 'B', logic1);
    const link2 = createEdge<Nodes, Answers>('B', 'C', logic2);
    const link3 = createEdge<Nodes, Answers>('C', 'D', logic3);
    const normalized = getEdgeMaps(link1, link2, link3);
    expect(normalized).toStrictEqual({
      A: { B: logic1 },
      B: { C: logic2 },
      C: { D: logic3 },
    });
  });

  // TODO: write test case to check normalize data function
  // TODO: write test case to verify arcane builder class
  // TODO: write test suite for arcane function
  // TODO: test to check if complicated routes are handled.
});
