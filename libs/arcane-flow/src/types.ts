/** @format */

export type Touple<T> = [T, T];

export interface FlowNode<N, D> {
  name: StringLiteral<N>;
  data: D;
}

export type Edge<N, A> = {
  source: StringLiteral<N>;
  destination: StringLiteral<N>;
  logic: Logic<A>;
};

export interface NodeVisited {
  [nodeName: string]: number;
}

export type NodeMap<T> = Record<string, Array<T>>;
export type NodeDataMap<T, R> = Record<string, FlowNode<T, R>>;

/**
 * type for the name of the node
 */

export type StringLiteral<T> = T extends `${string & T}` ? T : never;
/**
 * predicate function for logic to switch the edge.
 */
export type Logic<A> = (values: StringLiteral<A>) => boolean;

export type EdgeMap<A> = {
  [name: string]: { [name: string]: Logic<A> };
};

export type AllKeys<T> = T extends any ? keyof T : never;
