/** @format */

import { FC, ReactNode, DetailedHTMLProps, ButtonHTMLAttributes } from 'react';
import { ButtonVariant } from '../types';

type BaseButtonProps = {
  children: ReactNode;
} & DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export const BaseButton: FC<BaseButtonProps> = ({ children, id, ...props }) => {
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

export const Button: FC<ButtonProps> = ({
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
