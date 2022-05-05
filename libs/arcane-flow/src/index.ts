/** @format */

import { threadId } from 'worker_threads';

type FlowableCallback = (condition: boolean) => void;

export type Flowable<T> = (callback: FlowableCallback) => T;

export class FlowableNode<T> {
  private id: number;
  private previous: FlowableNode<T> | null = null;
  private onTrue: FlowableNode<T> | null = null;
  private onFalse: FlowableNode<T> | null = null;
  content: T;

  constructor(id = 0, content: T) {
    this.id = id;
    this.content = content;
  }

  static joinOnTrue<T>(n1: FlowableNode<T>, n2: FlowableNode<T>): void {
    n1 && (n1.onTrue = n2);
    n2 && (n2.previous = n1);
  }

  static joinOnFalse<T>(n1: FlowableNode<T>, n2: FlowableNode<T>): void {
    n1 && (n1.onFalse = n2);
    n2 && (n2.previous = n1);
  }

  public getId(): number {
    return this.id;
  }
}

export class ArcaneFlow<T> {
  private flowableNodes: Array<FlowableNode<T>>;

  constructor() {
    this.flowableNodes = [];
  }
  
}
