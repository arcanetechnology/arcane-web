/** @format */

import { JSX, onCleanup, ParentComponent, splitProps } from 'solid-js';

type DialogProps = {
  id: string;
} & Omit<JSX.DialogHtmlAttributes<HTMLElement>, 'id'>;

const Dialog: ParentComponent<DialogProps> = (props) => {
  const [local, others] = splitProps(props, ['children']);
  return <dialog {...others}>{local.children}</dialog>;
};

//TODO this will go in special dialogs which need to be a bit more interactive
export const clickOutside = (el: HTMLDialogElement) => {
  const onClick = (e: any) => {
    console.log(el);
    console.log(e.target);
  };
  document.body.addEventListener('click', onClick);
  onCleanup(() => document.body.removeEventListener('click', onClick));
};

export default Dialog;
