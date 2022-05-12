/** @format */

import { JSX, mergeProps, splitProps, children } from 'solid-js';
import { ButtonVariant } from '../types';

type BaseButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const BaseButton = (props: BaseButtonProps) => {
  const [local, others] = splitProps(props, [
    'class',
    'id',
    'children',
    'classList',
  ]);
  const child = children(() => local.children);
  return (
    <button
      class={local.class}
      classList={{
        'radius-large': true,
        ...local.classList,
      }}
      id={`${local.id}-button`}
      {...others}
    >
      {child()}
    </button>
  );
};

type OptionalButtonProps = {
  variant: ButtonVariant;
};

type ButtonProps = Partial<OptionalButtonProps> & BaseButtonProps;

export const Button = (props: ButtonProps) => {
  const merged = mergeProps({ variant: 'standard' }, props);
  const [local, others] = splitProps(merged, ['id', 'variant', 'children']);
  const child = children(() => local.children);
  return (
    <BaseButton
      classList={{
        'elevation-200': local.variant === 'standard',
        'border-small': local.variant === 'standard',
      }}
      id={`${local.id}-${local.variant}`}
      {...others}
    >
      {child()}
    </BaseButton>
  );
};
