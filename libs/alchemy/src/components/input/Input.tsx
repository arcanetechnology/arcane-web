/** @format */

import { FlowComponent, JSX } from 'solid-js';

// so we dont have to create a base prop whenever we want to add new properties to base elements.
type BaseInputProps = JSX.InputHTMLAttributes<HTMLInputElement>;

export const BaseInput: FlowComponent<BaseInputProps> = (props) => {
  return <input {...props} />;
};
