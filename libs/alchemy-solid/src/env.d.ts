/** @format */
import { ChildElementsDirectives } from './features';
import type { FormSubmitter, Validator } from './utilities';
import type { Accessor } from 'solid-js';

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
      childElements: ChildElementsDirectives;
    }
  }
}
