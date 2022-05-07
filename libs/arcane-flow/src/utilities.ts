/** @format */

import {
  FlowNode,
  Edge,
  Touple,
  StringLiteral,
  Logic,
  EdgeMap,
  AllKeys,
} from './types';

/**
 * utility function which normalizes the edges array into a source - destination map
 * @param {Array<Touple<T>>} touple version of each flows
 * @returns object with keys of sources and array of destinations
 */
export const getFlowMaps = <T extends string>(
  tuple: Array<Touple<T>>
): Record<T, Array<T>> => {
  return tuple.reduce((prev, curr) => {
    const key = curr[0];
    const val = curr[1];
    prev[key] = Object.getOwnPropertyDescriptor(prev, key)
      ? ([] as Array<T>).concat(prev[key], val)
      : [val];
    return prev;
  }, {} as Record<T, Array<T>>);
};

/**
 * utility function to normalize flownode structure into something manageable.
 * @param nodes
 * @returns
 */
export const flowNodeMap = <N, D>(nodes: Array<FlowNode<N, D>>) => {
  return nodes.reduce((prev, curr) => {
    const key = curr.name;
    const val = curr.data;
    prev[key] = val;
    return prev;
  }, {} as Record<StringLiteral<N>, D>);
};

/**
 * utility function to create a node
 *
 * @param name of the node to be created
 * @param data data of the node that it carries.
 * @returns
 */
export const createNode = <N, D>(
  name: StringLiteral<N>,
  data: D
): FlowNode<N, D> => ({
  name,
  data,
});

/**
 * utility function to create a flow
 *
 * @param source
 * @param destination
 * @param logic
 * @returns
 */
export function createEdge<N, A>(
  source: StringLiteral<N>,
  destination: StringLiteral<N>,
  logic: Logic<A>
): Edge<N, A> {
  return {
    source,
    destination,
    logic,
  };
}

/**
 * utility types to convert edge array to a manageable edge data structure.
 * @param edges
 * @returns
 */
export const getEdgeMaps = <N, A>(...edges: Array<Edge<N, A>>): EdgeMap<A> => {
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
  }, {} as EdgeMap<A>);
};

/**
 *
 * @param nodes
 * @param edges
 * @returns
 */
export const normalizeData = <N, D, A>(
  nodes: Array<FlowNode<N, D>>,
  edges: Array<Edge<N, A>>
) => {
  const normalizedNodes = flowNodeMap(nodes);
  const normalizedEdges = getEdgeMaps(...edges);
  return { nodes: normalizedNodes, edges: normalizedEdges };
};
