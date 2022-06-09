/** @format */

import { createStore } from 'solid-js/store';
import { JSX } from 'solid-js';

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

export type Validate = (
  element: HTMLInputElement,
  validators: Array<Validator>
) => void;

export type FormSubmit = (element: HTMLFormElement) => void;

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
  onSubmit: (element: HTMLFormElement) => void;
};

type UseForm = (props: UseFormProps) => {
  errors: Errors;
  validate: Validate;
  formSubmit: JSX.EventHandlerUnion<
    HTMLFormElement,
    Event & { submitter: HTMLElement }
  >;
  resetError: (element: HTMLInputElement) => void;
};

const useForm: UseForm = ({ errorClass, onSubmit }: UseFormProps) => {
  const [errors, setErrors] = createStore<Errors>({});
  const fields: Record<string, FormField> = {};

  const validate = (
    element: HTMLInputElement,
    validators: Array<Validator>
  ) => {
    let config;
    fields[element.name] = config = { element, validators };
    checkValidity(config, setErrors, errorClass);
  };

  const resetError = (element: HTMLInputElement) => {
    if (!errors[element.name]) return;
    setErrors({ [element.name]: undefined });
    errorClass && element.classList.toggle(errorClass, false);
  };

  const formSubmit: JSX.EventHandlerUnion<
    HTMLFormElement,
    Event & { submitter: HTMLElement }
  > = async (event) => {
    event.preventDefault();
    event.currentTarget.setAttribute('novalidate', '');
    let errored = false;
    for (const k in fields) {
      const field = fields[k];
      await checkValidity(field, setErrors, errorClass);
      if (!errored && field.element.validationMessage) {
        field.element.focus();
        errored = true;
      }
    }
    !errored && onSubmit(event.currentTarget);
  };

  return { errors, formSubmit, validate, resetError };
};

export default useForm;
