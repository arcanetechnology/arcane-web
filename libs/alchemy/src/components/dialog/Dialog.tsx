/** @format */

import {
  JSX,
  mergeProps,
  onCleanup,
  ParentComponent,
  splitProps,
} from 'solid-js';

type DialogProps = { isOpen?: boolean } & JSX.DialogHtmlAttributes<HTMLElement>;

const Dialog: ParentComponent<DialogProps> = (props) => {
  const merged = mergeProps({ id: 'arcane-dialog' }, props);
  const [local, others] = splitProps(merged, ['children', 'id']);
  return (
    <dialog id={local.id} {...others}>
      {local.children}
    </dialog>
  );
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
