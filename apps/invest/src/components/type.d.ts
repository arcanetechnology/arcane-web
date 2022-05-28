/** @format */

import type { ChildElementsDirectives } from '@arcane-web/alchemy';

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
