/** @format */

import { JSX } from 'solid-js';
import { ButtonVariant } from '../types';

type BaseButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

export const BaseButton = ({ children, id, ...props }: BaseButtonProps) => {
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

export const Button = ({
  children,
  id,
  variant = 'standard',
  ...props
}: ButtonProps) => {
  return (
    <BaseButton id={`${id}-${variant}`} {...props}>
      {children}
    </BaseButton>
  );
};
