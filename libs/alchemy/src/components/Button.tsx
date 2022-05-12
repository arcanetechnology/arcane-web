/** @format */

import { JSX, splitProps } from 'solid-js';
import { ButtonVariant } from '../types';

type BaseButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const BaseButton = (props: BaseButtonProps) => {
  const [local, others] = splitProps(props, ['class', 'id', 'children']);
  return (
    <button
      class={[
        'radius-large',
        'elevation-100',
        'color-neutral',
        'border-medium',
        local.class && null,
      ].join(' ')}
      data-animation="fade-in"
      data-animation-delay="0.25s"
      id={`${local.id}-button`}
      {...others}
    >
      {local.children}
    </button>
  );
};

type OptionalButtonProps = {
  variant: ButtonVariant;
};

type ButtonProps = Partial<OptionalButtonProps> & BaseButtonProps;

export const Button = (props: ButtonProps) => {
  const [local, others] = splitProps(props, ['id', 'variant', 'children']);
  return (
    <BaseButton id={`${local.id}-${local.variant}`} {...others}>
      {local.children}
    </BaseButton>
  );
};
