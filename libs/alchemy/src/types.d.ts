/** @format */
import type { Accessor } from 'solid-js';

// components
export type Variants = 'standard' | 'text';
export type ButtonVariant = Variants;
export type InputVariant = Extract<Variants, 'standard'>;
export type TextFieldTypes = 'text' | 'password';

interface FormAccessor {
  (element: HTMLFormElement): void;
}

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside: (el: HTMLDialogElement) => void;
      formSubmit: (
        element: HTMLFormElement,
        accessor: Accessor<FormAccessor>
      ) => void;
      validate: (
        element: HTMLInputElement,
        accessor: Accessor<InputAccessor>
      ) => void;
    }
  }
}
