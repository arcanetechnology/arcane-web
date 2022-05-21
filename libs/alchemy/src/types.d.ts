/** @format */

export type Variants = 'standard' | 'text';

export type ButtonVariant = Variants;
export type InputVariant = Extract<Variants, 'standard'>;
export type TextFieldTypes = 'text' | 'password';

declare module 'solid-js' {
  namespace JSX {
    interface Directives {
      clickOutside: (el: HTMLDialogElement) => void;
    }
  }
}
