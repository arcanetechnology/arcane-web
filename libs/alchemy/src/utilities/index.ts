/** @format */

import { FormAccessor, InputAccessor } from '../types';

// executes submit call back after validating everything
export const formSubmit = (
  element: HTMLFormElement,
  accessor: () => FormAccessor
) => {
  const callback: FormAccessor = accessor() || (() => null);
  element.onsubmit = (e) => {
    e.preventDefault();
    callback(element);
  };
};

// update it to take validators to validate a particular input element
export const validate = (
  element: HTMLInputElement,
  accessor: () => InputAccessor
) => {
  const callback: InputAccessor = accessor() || (() => null);
  element.oninput = () => {
    callback(element);
  };
};
