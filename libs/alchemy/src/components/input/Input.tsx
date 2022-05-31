/** @format */

import {
  VoidComponent,
  JSX,
  mergeProps,
  splitProps,
  createUniqueId,
} from 'solid-js';
import { InputVariant } from '../../types';

// so we dont have to create a base prop whenever we want to add new properties to base elements.
export type BaseInputProps = JSX.InputHTMLAttributes<HTMLInputElement>;

export const BaseInput: VoidComponent<BaseInputProps> = (props) => {
  const [local, others] = splitProps(props, ['id']);
  return <input id={local.id ?? `${createUniqueId()}-input`} {...others} />;
};

type OptionalInputProps = {
  variant: InputVariant;
};

export type InputProps = {
  name: string;
} & Partial<OptionalInputProps> &
  BaseInputProps;

export const Input: VoidComponent<InputProps> = (props) => {
  const merged = mergeProps({ variant: 'primary' }, props);
  const [local, others] = splitProps(merged, [
    'variant',
    'children',
    'name',
    'classList',
  ]);

  return (
    <>
      <BaseInput
        name={local.name}
        classList={{
          'radius-small': true,
          'padding-2': true,
          ...local.classList,
        }}
        {...others}
      />
    </>
  );
};
