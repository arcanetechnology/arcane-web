/** @format */

import { FormAccessor } from '../types';
import { createStore } from 'solid-js/store';
import { Accessor } from 'solid-js';

// types related to validation in forms
type ValidatorProps = {
  value: string | number;
};
export type Validator = (props: ValidatorProps) => string;

// form operation types



// use form types
type FormField = {
  element: HTMLInputElement;
  validators: Validator;
};

type UseFormProps = {
  errorClass: string;
};

const useForm = ({ errorClass }: UseFormProps) => {
  const [errors, setErrors] = createStore({}),
    fields: Record<string, FormField> = {};
  const validate = (
    element: HTMLInputElement,
    accessor: Accessor<Validator>
  ) => {
    const validators: Validator = accessor() || [];
    let config;
    fields[element.name] = config = { element, validators };
  };

  const formSubmit = (
    element: HTMLFormElement,
    accessor: () => FormAccessor
  ) => {
    const callback: FormAccessor = accessor() || (() => null);
    element.onsubmit = (e) => {
      e.preventDefault();
      callback(element);
    };
  };

  return { formSubmit, validate };
};

export default useForm;
