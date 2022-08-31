/** @format */

import { FlowComponent, JSX, splitProps, createUniqueId } from 'solid-js';

type LabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: FlowComponent<LabelProps> = (props) => {
  const [local, others] = splitProps(props, ['children', 'id']);
  return (
    <label {...others} id={local.id ?? `${createUniqueId()}-label`}>
      {local.children}
    </label>
  );
};
