/**
 * @ Author: Joel D'Souza
 * @ Create Time: 2022-05-05 11:02:31
 * @ Modified by: Joel D'Souza
 * @ Modified time: 2022-06-14 12:02:25
 * @ Description: core business logic of arcane-flow functionality,
 * arcaneFlow function loops through various nodes on the basis of logic present in the edges.
 * ArcaneFlowBuilder makes it a bit better to configure that function.
 * @format
 */

import { flow, pipe } from 'fp-ts/lib/function';
import * as O from 'fp-ts/lib/Option';

/**
 * Special utility type that assigne string literal type in generics
 */
export type StringLiteral<T> = T extends `${string & T}` ? T : never;

type History<NodeName extends string, Answer> = {
  node: NodeName;
  answer: Answer;
};

type Logic<NodeName extends string, Answer> = (
  val: Answer,
  history: Array<History<NodeName, Answer>>
) => NodeName;

export type ArcaneFlowConfig<NodeName extends string, Answers> = {
  [P in NodeName]?: Logic<NodeName, Answers>;
};

const ArcaneFlow = <NodeName extends string, Answer>(
  config: ArcaneFlowConfig<NodeName, Answer>,
  node: NodeName
) => {
  let curr = node;
  const history: Array<History<NodeName, Answer>> = [];
  const next = (val: Answer) => {
    const dest = pipe(
      config[curr],
      O.fromNullable,
      O.map((d) => d(val, history)),
      O.getOrElse(() => curr)
    );

    if (dest !== curr) {
      history.push({ node: curr, answer: val });
      curr = dest;
    }
    return curr;
  };

  const previous = () => {
    curr = history.pop()?.node ?? curr;
    return curr;
  };

  const getCurrent = () => {
    return curr;
  };

  return { getCurrent, next, previous };
};

export default ArcaneFlow;
