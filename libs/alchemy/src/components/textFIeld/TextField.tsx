/** @format */

import { mergeProps, splitProps, VoidComponent, Show } from 'solid-js';
import { InputVariant, TextFieldTypes } from '../../types';
import { Input, InputProps } from '../input';
import { Label } from '../label';

type OptionalTextFieldProps = {
  type: TextFieldTypes;
  label: string;
  fullWidth: boolean;
};

type TextFieldProps = Partial<OptionalTextFieldProps> &
  Omit<InputProps, 'type'>;

export const TextField: VoidComponent<TextFieldProps> = (props) => {
  const merged = mergeProps(
    { variant: 'standard', type: 'text', fullWidth: false },
    props
  );

  const [local, others] = splitProps(merged, [
    'variant',
    'label',
    'name',
    'fullWidth',
    'classList',
    'type',
  ]);

  return (
    <>
      <Show when={local.label !== undefined}>
        <Label id={local.name} for={local.name}>
          {local.label}
        </Label>
      </Show>
      <Input
        type={local.type}
        classList={{
          'w-full': local.fullWidth,
          ...local.classList,
        }}
        name={local.name}
        variant={local.variant as InputVariant}
        {...others}
      />
    </>
  );
};
