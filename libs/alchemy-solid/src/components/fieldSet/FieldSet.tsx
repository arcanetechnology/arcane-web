/** @format */

import { FlowComponent, JSX, splitProps, mergeProps } from 'solid-js';

type FieldSetProps = JSX.FieldsetHTMLAttributes<HTMLFieldSetElement>;

export const FieldSet: FlowComponent<FieldSetProps> = (props) => {
  const merged = mergeProps({ id: 'arcane' }, props);
  const [local, others] = splitProps(merged, ['children', 'id']);
  return (
    <fieldset {...others} id={`${local.id}-field`}>
      {local.children}
    </fieldset>
  );
};
