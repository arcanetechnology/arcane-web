/** @format */

export type NodeName = string;

export interface Component<T> {
  name: NodeName;
  data: T;
}

export interface Connection {
  source: NodeName;
  destination: NodeName;
}

export type iteratorFn<T> = (node: T, prev: T[], i: number, d: number) => void;

const components: Component<string>[] = [
  { name: 'A', data: 'Node A' },
  { name: 'B', data: 'Node B' },
  { name: 'C', data: 'Node C' },
  { name: 'D', data: 'Node D' },
  { name: 'E', data: 'Node E' },
];

// connections
const connections: Connection[] = [
  { source: 'A', destination: 'B' },
  { source: 'A', destination: 'C' },
  { source: 'B', destination: 'C' },
  { source: 'C', destination: 'D' },
  { source: 'B', destination: 'E' },
];
