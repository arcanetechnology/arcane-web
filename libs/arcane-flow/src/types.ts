/**
 * @ Author: Joel D'Souza
 * @ Create Time: 2022-05-05 17:26:29
 * @ Modified by: Joel D'Souza
 * @ Modified time: 2022-05-14 15:42:16
 * @ Description: type declaration for arcan-flow functions
 *
 * @format
 */

/**
 * core node type
 * nodes can have any data but preferably keep it to primitive data types.
 *
 */
export interface FlowNode<Name, Data> {
  name: StringLiteral<Name>;
  data: Data;
}

/**
 * core edge linking data type
 */
export type Edge<Name, Answer> = {
  source: StringLiteral<Name>;
  destination: StringLiteral<Name>;
  logic: Logic<Answer>;
};

/**
 * Special utility type that assigne string literal type in generics
 */
export type StringLiteral<T> = T extends `${string & T}` ? T : never;

/**
 * predicate function type on which nodes are connected.
 */
export type Logic<Answer> = (values: StringLiteral<Answer>) => boolean;

/**
 * interface for edge and logic data structure.
 */
export type EdgeMap<Answer> = {
  [name: string]: { [name: string]: Logic<Answer> };
};
