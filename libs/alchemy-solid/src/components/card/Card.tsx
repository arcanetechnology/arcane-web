/** @format */

import { FlowComponent, JSX, splitProps } from 'solid-js';

type CardProps = JSX.HTMLAttributes<HTMLDivElement>;

const Card: FlowComponent<CardProps> = (props) => {
  const [local, others] = splitProps(props, ['children', 'class', 'classList']);
  return (
    <div
      class={(['card'] as Array<string>).concat(local.class ?? '').join(' ')}
      classList={{ ...local.classList }}
      {...others}
    >
      {local.children}
    </div>
  );
};

export default Card;

// TODO: write test cases later on
