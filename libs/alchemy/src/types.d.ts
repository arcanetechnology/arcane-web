/** @format */

export type Variants = 'standard' | 'text';

export type ButtonVariant = Variants;
export type InputVariant = Extract<Variants, 'standard'>;
export type TextFieldTypes = 'text' | 'password';

interface FormAccessor {
  (element: HTMLFormElement): void;
}

interface InputAccessor {
  (element: HTMLInputElement): void;
}

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside: (el: HTMLDialogElement) => void;
      formSubmit: (
        element: HTMLFormElement,
        accessor: () => FormAccessor
      ) => void;
      validate: (
        element: HTMLInputElement,
        accessor: () => InputAccessor
      ) => void;
    }
  }
}

// TODO: find the right balance between global css and component based.
// TODO: button can have primary or secondary colors.
// TODO: create one more dialog for totally interactive shit
// TODO: check box when need arises?
