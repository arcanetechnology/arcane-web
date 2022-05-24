/** @format */

interface ImportMetaEnv {
  readonly ARCANE_WEB_APPLICATION_NAME: string;
  readonly INVEST_CONTENTFUL_SPACE: string;
  readonly INVEST_CONTENTFUL_ACCESS_TOKEN: string;
  readonly INVEST_CONTENTFUL_ONBOARDING_ID: string;
  readonly INVEST_CONTENTFUL_ENVIRONMENT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

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
