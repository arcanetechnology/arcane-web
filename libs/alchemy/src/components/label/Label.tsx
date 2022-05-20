/** @format */

import { FlowComponent, JSX, splitProps, mergeProps } from 'solid-js';

type LabelProps = JSX.LabelHTMLAttributes<HTMLLabelElement>;

export const Label: FlowComponent<LabelProps> = (props) => {
  const merged = mergeProps({ id: 'arcane' }, props);
  const [local, others] = splitProps(merged, ['children', 'id']);
  return (
    <label {...others} id={`${local.id}-label`}>
      {local.children}
    </label>
  );
};
