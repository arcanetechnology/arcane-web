/** @format */

import { createStore } from 'solid-js/store';
import type { Accessor } from 'solid-js';

// types related to validation in forms
type ValidatorProps = {
  value: string | number;
};
export type Validator = (props: ValidatorProps) => string;

// form operation types

export type FormSubmitter = (value: HTMLFormElement) => void;

// use form types
type FormField = {
  element: HTMLInputElement;
  validators: Array<Validator>;
};

type UseFormProps = {
  errorClass: string;
};

const useForm = ({ errorClass }: UseFormProps) => {
  const [errors, setErrors] = createStore({}),
    fields: Record<string, FormField> = {};
  const validate = (
    element: HTMLInputElement,
    accessor: Accessor<Array<Validator>>
  ) => {
    const validators: Array<Validator> = accessor() || [];
    let config;
    fields[element.name] = config = { element, validators };
  };

  const formSubmit = (
    element: HTMLFormElement,
    accessor: Accessor<FormSubmitter>
  ) => {
    const callback: FormSubmitter = accessor() || (() => null);
    element.onsubmit = (e) => {
      e.preventDefault();
      callback(element);
    };
  };

  return { formSubmit, validate };
};

export default useForm;
