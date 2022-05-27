/** @format */

import { splitProps, VoidComponent, Show, mergeProps } from 'solid-js';
import { Input, InputProps } from '../input';
import { Label } from '../label';

type LabelPosition = 'up' | 'down';

type OptionalRadioButtonProps = {
  position: LabelPosition;
};

type RadioButtonProps = {
  label: string;
  id: string;
  name: string;
} & Partial<OptionalRadioButtonProps> &
  Omit<InputProps, 'type' | 'id' | 'label'>;

export const RadioButton: VoidComponent<RadioButtonProps> = (props) => {
  const merged = mergeProps({ position: 'up' }, props);
  const [local, others] = splitProps(merged, [
    'label',
    'name',
    'id',
    'position',
    'class',
  ]);

  return (
    <>
      <Show when={local.position === 'up'}>
        <Label id={`${local.id}-label`} for={local.id}>
          {local.label}
        </Label>
      </Show>
      <Input
        class={(['radio'] as Array<string>).concat(local.class ?? '').join(' ')}
        type="radio"
        name={local.name}
        id={local.id}
        {...others}
      />
      <Show when={local.position === 'down'}>
        <Label id={`${local.id}-label`} for={local.id}>
          {local.label}
        </Label>
      </Show>
    </>
  );
};
