/** @format */

import { option } from 'fp-ts';
import { pipe } from 'fp-ts/lib/function';

/**
 * type which knows the parameter of a function T.
 */
type Parameter<T> = T extends (arg: infer T) => any ? T : never;

// TODO: users go from one node to another. depending on what answers they pick they go to a particular node.

export class Node<T> {
  private data: T;
  private adjacent: Array<Node<T>>;
  constructor(data: T) {
    this.data = data;
    this.adjacent = [];
  }
  addAjacent(node: Node<T>): void {
    this.adjacent.push(node);
  }
}

class Graph<T> {
  private nodes: Map<T, Node<T>> = new Map();
  add(data: T): Node<T> {
    const node = pipe(
      data,
      (d) => this.nodes.get(d),
      option.fromNullable,
      option.getOrElse(() => {
        const n = new Node(data);
        this.nodes.set(data, n);
        return n;
      })
    );
    return node;
  }

  connect(source: T, destination: T): void {
    this.add(source).addAjacent(this.add(destination));
  }
}

export default Graph;
