/** @format */

import { createStore } from 'solid-js/store';
import type { Accessor } from 'solid-js';

/** -----------------------------------------------------------------------
 *  Generic SOLID-JS directive types for form submit / validity client side
 * ------------------------------------------------------------------------
 */

// types related to validation in forms
type ValidatorProps = {
  value: string | number;
};
export type Validator = (props: ValidatorProps) => string;

// form operation types

export type FormSubmitter = (value: HTMLFormElement) => void;

export type ValidateDirective = (
  element: HTMLInputElement,
  accessor: Accessor<Array<Validator>>
) => void;

export type FormSubmitterDirective = (
  element: HTMLFormElement,
  accessor: Accessor<FormSubmitter>
) => void;

/** -----------------------------------------------------------
 *  Use Form interface and check validity interface
 * ------------------------------------------------------------
 */

export type Errors = {
  [key: string]: string;
};

// use form types
type FormField = {
  element: HTMLInputElement;
  validators: Array<Validator>;
};

// check Validity function

type OnBlur = () => void;

export type CheckValidity = (
  config: FormField,
  setErrors: (value: Errors) => void,
  errorClass: string
) => OnBlur;

const checkValidity: CheckValidity = (
  { element, validators = [] },
  setErrors,
  errorClass
) => {
  return async () => {
    element.setCustomValidity('');
    element.checkValidity();
    let message = element.validationMessage;
    if (!message) {
      for (const validator of validators) {
        const text = await validator(element);
        if (text) {
          element.setCustomValidity(text);
          break;
        }
      }
      message = element.validationMessage;
    }
    if (message) {
      errorClass && element.classList.toggle(errorClass, true);
      setErrors({ [element.name]: message });
    }
  };
};

// use form
type UseFormProps = {
  errorClass: string;
};

type UseForm = (props: UseFormProps) => {
  errors: Errors;
  validate: ValidateDirective;
  formSubmit: FormSubmitterDirective;
};

const useForm: UseForm = ({ errorClass }: UseFormProps) => {
  const [errors, setErrors] = createStore<Errors>({});
  const fields: Record<string, FormField> = {};
  const validate = (
    element: HTMLInputElement,
    accessor: Accessor<Array<Validator>>
  ) => {
    const validators: Array<Validator> = accessor() || [];
    let config;
    fields[element.name] = config = { element, validators };
    element.onblur = checkValidity(config, setErrors, errorClass);
    element.oninput = () => {
      if (!errors[element.name]) return;
      setErrors({ [element.name]: undefined });
      errorClass && element.classList.toggle(errorClass, false);
    };
  };

  const formSubmit = (
    element: HTMLFormElement,
    accessor: Accessor<FormSubmitter>
  ) => {
    const callback: FormSubmitter = accessor() || (() => null);
    element.setAttribute('novalidate', '');
    element.onsubmit = async (e) => {
      e.preventDefault();
      let errored = false;
      for (const k in fields) {
        const field = fields[k];
        await checkValidity(field, setErrors, errorClass);
        if (!errored && field.element.validationMessage) {
          field.element.focus();
          errored = true;
        }
      }
      !errored && callback(element);
    };
  };

  return { errors, formSubmit, validate };
};

export default useForm;
