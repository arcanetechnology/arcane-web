/**
 * @ Author: Joel D'Souza
 * @ Create Time: 2022-05-05 11:02:31
 * @ Modified by: Joel D'Souza
 * @ Modified time: 2022-05-28 00:06:02
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

type Logic<T> = (val: T) => boolean;

export type ArcaneFlowConfig<NodeName extends string, Answers> = {
  [P in NodeName]?: {
    [T in NodeName]?: Logic<Answers>;
  };
};

const ArcaneFlow = <NodeName extends string, Answer>(
  config: ArcaneFlowConfig<NodeName, Answer>,
  node: NodeName
) => {
  let curr = node;
  const history: Array<NodeName> = [];
  const next = (val: Answer) => {
    const dest = pipe(
      config[curr],
      O.fromNullable,
      O.map(
        (d) =>
          Object.entries(d).find((v) => (v[1] as Logic<Answer>)(val)) as [
            NodeName,
            Logic<Answer>
          ]
      ),
      O.chain(
        flow(
          O.fromNullable,
          O.map((d) => d[0])
        )
      ),
      O.getOrElse(() => curr)
    );

    if (dest !== curr) {
      history.push(curr);
      curr = dest;
    }
    return curr;
  };

  const previous = () => {
    curr = history.pop() ?? curr;
    return curr;
  };

  const getCurrent = () => {
    return curr;
  };

  return { getCurrent, next, previous };
};

export default ArcaneFlow;
