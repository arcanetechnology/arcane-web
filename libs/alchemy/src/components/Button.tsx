/** @format */

import { Component, JSX } from 'solid-js';
import { ButtonVariant } from '../types';



type BaseButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const BaseButton: Component<BaseButtonProps> = ({
  children,
  id,
  ...props
}) => {
  return (
    <button id={`${id}-button`} {...props}>
      {children}
    </button>
  );
};

type OptionalButtonProps = {
  variant: ButtonVariant;
};

type ButtonProps = Partial<OptionalButtonProps> & BaseButtonProps;

export const Button: Component<ButtonProps> = ({
  children,
  id,
  variant = 'standard',
  ...props
}) => {
  return (
    <BaseButton id={`${id}-${variant}`} {...props}>
      {children}
    </BaseButton>
  );
};
