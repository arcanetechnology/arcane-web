/**
 * @ Author: Joel D'Souza
 * @ Create Time: 2022-05-07 15:22:05
 * @ Modified by: Joel D'Souza
 * @ Modified time: 2022-05-14 15:48:29
 * @ Description: set of utility functions that are useful for core arcane-flow business logic
 *
 * @format
 */

import { FlowNode, Edge, StringLiteral, EdgeMap } from './types';

/**
 * utility function to normalize flownode structure into something manageable.
 * @param nodes
 * @returns
 */
export const getFlowNodeMap = <Name, Data>(
  ...nodes: Array<FlowNode<Name, Data>>
) => {
  return nodes.reduce((prev, curr) => {
    const key = curr.name;
    const val = curr.data;
    prev[key] = val;
    return prev;
  }, {} as Record<StringLiteral<Name>, Data>);
};

/**
 * utility types to convert edge array to a manageable edge data structure.
 * @param edges
 * @returns
 */
export const getEdgeMaps = <Name, Answer>(
  ...edges: Array<Edge<Name, Answer>>
): EdgeMap<Answer> => {
  return edges.reduce((prev, curr) => {
    const key = curr.source;
    const logic = curr.logic;
    const destination = curr.destination;
    const newObject = {
      ...prev[key],
      [`${destination}`]: logic,
    };
    prev[key] = newObject;
    return prev;
  }, {} as EdgeMap<Answer>);
};

/**
 *
 * @param nodes
 * @returns
 */
export const structureNodesAndEdges =
  <N, D>(...nodes: Array<FlowNode<N, D>>) =>
  <A>(...edges: Array<Edge<N, A>>) => ({
    nodes: getFlowNodeMap(...nodes),
    edges: getEdgeMaps(...edges),
  });
