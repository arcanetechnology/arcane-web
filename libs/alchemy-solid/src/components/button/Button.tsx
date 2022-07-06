/** @format */

import { JSX, mergeProps, splitProps, FlowComponent } from 'solid-js';
import { ButtonSize, ButtonVariant } from '../../types';

// just incase we want to add a use defined base button props :)
type BaseButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement>;

/**
 * low level base button without any custom style, all styles are inherited from css files.
 * @param @type {BaseButtonProps} accepst all types of button properties of an html button.
 * @returns @type {JSX.Element} renders and html button
 */
export const BaseButton: FlowComponent<BaseButtonProps> = (props) => {
  const [local, others] = splitProps(props, ['id', 'children']);

  return (
    <button id={`${local.id}-button`} {...others}>
      {local.children}
    </button>
  );
};

type OptionalButtonProps = {
  variant: ButtonVariant; // type
  size: ButtonSize;
};

type ButtonProps = Partial<OptionalButtonProps> & BaseButtonProps;

/**
 * mid level button wrapped in arcane design languge css based on prop values
 * @param @type {ButtonProps} accepst all types of button properties of an html button.
 * @returns @type {BaseButton} renders base button.
 */
export const Button: FlowComponent<ButtonProps> = (props) => {
  const merged = mergeProps(
    { variant: 'primary', id: 'arcane', size: 'large' },
    props
  );
  const [local, others] = splitProps(merged, [
    'id',
    'variant',
    'children',
    'class',
    'classList',
  ]);
  return (
    <BaseButton
      class={(['button'] as Array<string>).concat(local.class ?? '').join(' ')}
      classList={{
        'button-primary': props.variant === 'primary',
        'button-secondary': props.variant === 'secondary',
        'button-tertiary': props.variant === 'tertiary',
        'button-large': props.size === 'large',
        'button-medium': props.size === 'medium',
        'button-small': props.size === 'small',
        ...local.classList,
      }}
      id={`${local.id}-${local.variant}`}
      {...others}
    >
      {local.children}
    </BaseButton>
  );
};
