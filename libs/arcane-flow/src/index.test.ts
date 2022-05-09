/**
 * @ Author: Joel D'Souza
 * @ Create Time: 2022-05-05 20:00:37
 * @ Modified by: Joel D'Souza
 * @ Modified time: 2022-05-09 13:00:18
 * @ Description: arcane-flow test suite
 *
 * @format
 */

import ArcaneFlowBuilder from '.';
import { Logic } from './types';
import {
  getFlowNodeMap,
  getEdgeMaps,
  structureNodesAndEdges,
} from './utilities';

// important for now.
type Answers = 'yes' | 'no' | 'A' | 'B' | true | false | 10 | 11 | 100;
type Nodes = 'A' | 'B' | 'C' | 'D' | 'E';

describe('utility functions', () => {
  it('should be able to create node using create node', () => {
    const node = ArcaneFlowBuilder.createNode('A', '/a');
    expect(node).toStrictEqual({ name: 'A', data: '/a' });
  });

  it('should be able to create links between nodes with some logic', () => {
    const logic = (val: Answers) => val < 10;
    const edge = ArcaneFlowBuilder.createEdge('A', 'B', logic);
    expect(edge).toStrictEqual({ source: 'A', destination: 'B', logic });
  });

  it('should be able to normalize the list of nodes into a manageable data structure', () => {
    const node1 = ArcaneFlowBuilder.createNode<Nodes, string>('A', '/a');
    const node2 = ArcaneFlowBuilder.createNode<Nodes, string>('B', '/b');
    const node3 = ArcaneFlowBuilder.createNode<Nodes, string>('C', '/c');
    const normalized = getFlowNodeMap(node1, node2, node3);
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
    const link1 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'A',
      'B',
      logic1
    );
    const link2 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'B',
      'C',
      logic2
    );
    const link3 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'C',
      'D',
      logic3
    );
    const normalized = getEdgeMaps(link1, link2, link3);
    expect(normalized).toStrictEqual({
      A: { B: logic1 },
      B: { C: logic2 },
      C: { D: logic3 },
    });
  });

  it('should be able to normalize both nodes and edges through normalizeData function', () => {
    const node1 = ArcaneFlowBuilder.createNode<Nodes, string>('A', '/a');
    const node2 = ArcaneFlowBuilder.createNode<Nodes, string>('B', '/b');
    const node3 = ArcaneFlowBuilder.createNode<Nodes, string>('C', '/c');
    const logic1: Logic<Answers> = (val) => val === 'yes';
    const logic2: Logic<Answers> = (val) => val === 'no';
    const logic3: Logic<Answers> = (val) => val === 'A';
    const link1 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'A',
      'B',
      logic1
    );
    const link2 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'B',
      'C',
      logic2
    );
    const link3 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'C',
      'D',
      logic3
    );

    const { nodes, edges } = structureNodesAndEdges(node1, node2, node3)(
      link1,
      link2,
      link3
    );

    expect(nodes).toStrictEqual({
      A: '/a',
      B: '/b',
      C: '/c',
    });

    expect(edges).toStrictEqual({
      A: { B: logic1 },
      B: { C: logic2 },
      C: { D: logic3 },
    });
  });
});

describe('arcane flow builder', () => {
  it('builder should be able to take lists of nodes and edges and give root data and next function', () => {
    const node1 = ArcaneFlowBuilder.createNode<Nodes, string>('A', '/a');
    const node2 = ArcaneFlowBuilder.createNode<Nodes, string>('B', '/b');
    const node3 = ArcaneFlowBuilder.createNode<Nodes, string>('C', '/c');
    const logic1: Logic<Answers> = (val) => val === 'yes';
    const logic2: Logic<Answers> = (val) => val === 'no';
    const logic3: Logic<Answers> = (val) => val === 'A';
    const link1 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'A',
      'B',
      logic1
    );
    const link2 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'B',
      'C',
      logic2
    );
    const link3 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'C',
      'D',
      logic3
    );
    const flowBuilder = new ArcaneFlowBuilder<Nodes, string, Answers>();
    const { data, next } = flowBuilder
      .addNode(node1, node2, node3)
      .addEdge(link1, link2, link3)
      .build('A');

    expect(data).toBe('/a');
    expect(next).toEqual(expect.any(Function));
  });

  it('next function should give the current data when provided with an a answer', () => {
    const node1 = ArcaneFlowBuilder.createNode<Nodes, string>('A', '/a');
    const node2 = ArcaneFlowBuilder.createNode<Nodes, string>('B', '/b');
    const node3 = ArcaneFlowBuilder.createNode<Nodes, string>('C', '/c');
    const logic1: Logic<Answers> = (val) => val === 'yes';
    const logic2: Logic<Answers> = (val) => val === 'no';
    const logic3: Logic<Answers> = (val) => val === 'A';
    const link1 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'A',
      'B',
      logic1
    );
    const link2 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'B',
      'C',
      logic2
    );
    const link3 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'C',
      'D',
      logic3
    );
    const flowBuilder = new ArcaneFlowBuilder<Nodes, string, Answers>();
    const { data, next } = flowBuilder
      .addNode(node1, node2, node3)
      .addEdge(link1, link2, link3)
      .build('A');

    const nextNodeData = next('yes');
    expect(nextNodeData).toBe('/b');
  });

  it('next function should be able to iterate over the graph and keep track of the current node automatically', () => {
    const node1 = ArcaneFlowBuilder.createNode<Nodes, string>('A', '/a');
    const node2 = ArcaneFlowBuilder.createNode<Nodes, string>('B', '/b');
    const node3 = ArcaneFlowBuilder.createNode<Nodes, string>('C', '/c');
    const logic1: Logic<Answers> = (val) => val === 'yes';
    const logic2: Logic<Answers> = (val) => val === 'no';
    const logic3: Logic<Answers> = (val) => val === 'A';
    const link1 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'A',
      'B',
      logic1
    );
    const link2 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'B',
      'C',
      logic2
    );
    const link3 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'C',
      'D',
      logic3
    );
    const flowBuilder = new ArcaneFlowBuilder<Nodes, string, Answers>();
    const { data, next } = flowBuilder
      .addNode(node1, node2, node3)
      .addEdge(link1, link2, link3)
      .build('A');

    const bNodeData = next('yes');
    const cNodeData = next('no');
    expect(cNodeData).toBe('/c');
  });

  it('next function should be able to choose the right node based on the answer provided', () => {
    const node1 = ArcaneFlowBuilder.createNode<Nodes, string>('A', '/a');
    const node2 = ArcaneFlowBuilder.createNode<Nodes, string>('B', '/b');
    const node3 = ArcaneFlowBuilder.createNode<Nodes, string>('C', '/c');
    const logic1: Logic<Answers> = (val) => val === 'yes';
    const logic2: Logic<Answers> = (val) => val === 'no';
    const link1 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'A',
      'B',
      logic1
    );
    const link2 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'A',
      'C',
      logic2
    );
    const flowBuilder = new ArcaneFlowBuilder<Nodes, string, Answers>();
    const { data, next } = flowBuilder
      .addNode(node1, node2, node3)
      .addEdge(link1, link2)
      .build('A');

    const cNodeData = next('no');
    expect(cNodeData).toBe('/c');
  });

  it('should show the same nodes data when we go on next at the end node', () => {
    const node1 = ArcaneFlowBuilder.createNode<Nodes, string>('A', '/a');
    const node2 = ArcaneFlowBuilder.createNode<Nodes, string>('B', '/b');
    const node3 = ArcaneFlowBuilder.createNode<Nodes, string>('C', '/c');
    const logic1: Logic<Answers> = (val) => val === 'yes';
    const logic2: Logic<Answers> = (val) => val === 'no';
    const link1 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'A',
      'B',
      logic1
    );
    const link2 = ArcaneFlowBuilder.createEdge<Nodes, Answers>(
      'A',
      'C',
      logic2
    );
    const flowBuilder = new ArcaneFlowBuilder<Nodes, string, Answers>();

    const { data, next } = flowBuilder
      .addNode(node1, node2, node3)
      .addEdge(link1, link2)
      .build('A');
    const cNodeData = next('no');
    const nextData = next('no');
    expect(nextData).toBe('/c');
  });

  //TODO: case for navigating to previous nodes
  //TODO: logic based on other previous nodes
});
