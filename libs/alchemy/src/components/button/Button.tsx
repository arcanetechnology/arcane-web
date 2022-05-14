/** @format */

import { JSX, mergeProps, splitProps, children, FlowComponent } from 'solid-js';
import { ButtonVariant } from '../../types';

// just incase we want to add a use defined base button props :)
type BaseButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * low level base button without any custom style, all styles are inherited from css files.
 * @param @type {BaseButtonProps} accepst all types of button properties of an html button.
 * @returns @type {JSX.Element} renders and html button
 */
export const BaseButton: FlowComponent<BaseButtonProps> = (props) => {
  const [local, others] = splitProps(props, ['id', 'children']);
  const child = children(() => local.children);
  return (
    <button id={`${local.id}-button`} {...others}>
      {child()}
    </button>
  );
};

type OptionalButtonProps = {
  variant: ButtonVariant;
};

type ButtonProps = Partial<OptionalButtonProps> & BaseButtonProps;

/**
 * mid level button wrapped in arcane design languge css based on prop values
 * @param @type {ButtonProps} accepst all types of button properties of an html button.
 * @returns @type {BaseButton} renders base button.
 */
export const Button: FlowComponent<ButtonProps> = (props) => {
  const merged = mergeProps({ variant: 'standard', id: 'arcane' }, props);
  const [local, others] = splitProps(merged, ['id', 'variant', 'children']);
  const child = children(() => local.children);
  return (
    <BaseButton
      classList={{
        'elevation-200': local.variant === 'standard',
        'border-small': local.variant === 'standard',
        'radius-large': true,
      }}
      id={`${local.id}-${local.variant}`}
      {...others}
    >
      {child()}
    </BaseButton>
  );
};
