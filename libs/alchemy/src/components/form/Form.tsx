/** @format */

import { ParentComponent, JSX, splitProps } from 'solid-js';

type FormProps = JSX.FormHTMLAttributes<HTMLFormElement>;

const Form: ParentComponent<FormProps> = (props) => {
  const [local, others] = splitProps(props, ['children']);
  return <form {...others}>{local.children}</form>;
};

export default Form;
