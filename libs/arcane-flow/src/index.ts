/**
 * @ Author: Joel D'Souza
 * @ Create Time: 2022-05-05 11:02:31
 * @ Modified by: Joel D'Souza
 * @ Modified time: 2022-05-08 00:07:15
 * @ Description: core business logic of arcane-flow functionality,
 * arcaneFlow function loops through various nodes on the basis of logic present in the edges.
 * ArcaneFlowBuilder makes it a bit better to configure that function.
 * @format
 */

import { Edge, FlowNode, StringLiteral } from './types';
import { normalizeData } from './utilities';

const arcaneFlow = <N, D, A>(
  n: Array<FlowNode<N, D>>,
  e: Array<Edge<N, A>>,
  root: StringLiteral<N>
) => {
  const { nodes, edges } = normalizeData(n, e);
  let current = root;

  const next = (val: A): D => {
    const dest = Object.keys(edges[current]).filter((d) =>
      edges[current][d](val as StringLiteral<A>)
    );
    current = dest[0] as StringLiteral<N>;
    return nodes[dest[0] as StringLiteral<N>];
  };
  return { current, next };
};

class ArcaneFlowBuilder<Name, Data, Answers> {
  private nodes: Array<FlowNode<Name, Data>> = [];
  private edges: Array<Edge<Name, Answers>> = [];

  public addNode(...node: Array<FlowNode<Name, Data>>) {
    Array.prototype.push.apply(this.nodes, node);
    return this;
  }

  public addEdge(...edge: Array<Edge<Name, Answers>>) {
    Array.prototype.push.apply(this.edges, edge);
    return this;
  }

  public build(root: StringLiteral<Name>) {
    return arcaneFlow(this.nodes, this.edges, root);
  }

  // TODO: import edge and node creation in arcane builder
  public static createNode<Name, Data>(
    name: StringLiteral<Name>,
    data: Data
  ): FlowNode<Name, Data> {
    return { name, data };
  }
}

export default ArcaneFlowBuilder;
