/** @format */
import type { Accessor } from 'solid-js';
import type { FormSubmitter, Validator } from './utilities';
// components
export type Variants = 'standard' | 'text';
export type ButtonVariant = Variants;
export type InputVariant = Extract<Variants, 'standard'>;
export type TextFieldTypes = 'text' | 'password';

declare module 'solid-js' {
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
