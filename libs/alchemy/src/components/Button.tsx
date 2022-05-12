/** @format */

import { JSX } from 'solid-js';
import { ButtonVariant } from '../types';

type BaseButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const BaseButton = (props: BaseButtonProps) => {
  const { class: className, id, children, ...rest } = props;
  return (
    <button
      class={[
        'radius-large',
        'elevation-100',
        'color-neutral',
        'border-medium',
        className && null,
      ].join(' ')}
      data-animation="fade-in"
      data-animation-delay="0.25s"
      id={`${id}-button`}
      {...rest}
    >
      {children}
    </button>
  );
};

type OptionalButtonProps = {
  variant: ButtonVariant;
};

type ButtonProps = Partial<OptionalButtonProps> & BaseButtonProps;

export const Button = (buttonProps: ButtonProps) => {
  const { children, id, variant, ...rest } = buttonProps;
  return (
    <BaseButton id={`${id}-${variant}`} {...rest}>
      {children}
    </BaseButton>
  );
};
