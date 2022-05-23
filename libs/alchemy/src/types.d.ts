/** @format */
import type { Accessor, FlowComponent, FlowProps } from 'solid-js';
import type { FormSubmitter, Validator } from './utilities';
// components
export type Variants = 'standard' | 'text';
export type ButtonVariant = Variants;
export type InputVariant = Extract<Variants, 'standard'>;
export type TextFieldTypes = 'text' | 'password';

export declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside: (el: HTMLDialogElement) => void;
      formSubmit: (
        element: HTMLFormElement,
        accessor: Accessor<FormSubmitter>
      ) => void;
      validate: (
        element: HTMLInputElement,
        accessor: Accessor<Validator>
      ) => void;
    }
  }
}

export type StaticProps<StaticKeys, ComponentProps extends FlowProps> = {
  [key in StaticKeys]: FlowComponent<ComponentProps>;
};
