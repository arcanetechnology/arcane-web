/** @format */

import { VoidComponent, JSX, mergeProps, splitProps, Show } from 'solid-js';
import { InputVariant } from '../../types';
import { Label } from '../label/Label';

// so we dont have to create a base prop whenever we want to add new properties to base elements.
export type BaseInputProps = JSX.InputHTMLAttributes<HTMLInputElement>;

export const BaseInput: VoidComponent<BaseInputProps> = (props) => {
  const [local, others] = splitProps(props, ['id']);
  return <input id={`${local.id}-input`} {...others} />;
};

type OptionalInputProps = {
  variant: InputVariant;
  fullWidth: boolean;
  label: string;
};

type InputProps = {
  name: string;
} & Partial<OptionalInputProps> &
  BaseInputProps;

export const Input: VoidComponent<InputProps> = (props) => {
  const merged = mergeProps(
    { variant: 'standard', id: `arcane`, fullWidth: false },
    props
  );
  const [local, others] = splitProps(merged, [
    'id',
    'variant',
    'fullWidth',
    'children',
    'label',
    'name',
  ]);

  return (
    <>
      <Show when={local.label !== undefined}>
        <Label id={`${props.name}-${local.id}`} for={local.name}>
          {local.label}
        </Label>
      </Show>
      <BaseInput
        type="text"
        name={local.name}
        classList={{
          'radius-small': true,
          'w-full': local.fullWidth,
          'padding-2': true,
        }}
        id={`${props.name}-${local.id}`}
        {...others}
      />
    </>
  );
};
