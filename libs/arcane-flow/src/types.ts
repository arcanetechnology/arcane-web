/**
 * @ Author: Joel D'Souza
 * @ Create Time: 2022-05-05 17:26:29
 * @ Modified by: Joel D'Souza
 * @ Modified time: 2022-05-08 00:04:45
 * @ Description: type declaration for arcan-flow functions
 *
 * @format
 */

/**
 * core node type
 * nodes can have any data but preferably keep it to primitive data types.
 *
 */
export interface FlowNode<N, D> {
  name: StringLiteral<N>;
  data: D;
}

/**
 * core edge linking data type
 */
export type Edge<N, A> = {
  source: StringLiteral<N>;
  destination: StringLiteral<N>;
  logic: Logic<A>;
};

/**
 * Special utility type that assigne string literal type in generics
 */
export type StringLiteral<T> = T extends `${string & T}` ? T : never;

/**
 * predicate function type on which nodes are connected.
 */
export type Logic<A> = (values: StringLiteral<A>) => boolean;

/**
 * interface for edge and logic data structure.
 */
export type EdgeMap<A> = {
  [name: string]: { [name: string]: Logic<A> };
};
