/** @format */

import { FlowComponent, Show } from 'solid-js';
import { Button } from '../button';

const modalKeys = ['Title', 'Action', 'Content'] as const;
type ModalKeys = typeof modalKeys[number];

type TitleProps = {
  toggleModal: (val: boolean) => void;
};

type ModalFunction = {
  [key in ModalKeys]: FlowComponent<TitleProps>;
};

type ModalProps = {
  isOpen: boolean;
};

const Modal: FlowComponent<ModalProps> & ModalFunction = (props) => {
  return (
    <Show when={props.isOpen} fallback={null}>
      <div class="modal-background">
        <div class="elevation-300 radius-small modal">{props.children}</div>
      </div>
    </Show>
  );
};

const Content: FlowComponent = (props) => {
  return <div class="modal-content">{props.children}</div>;
};

const Title: FlowComponent<TitleProps> = (props) => {
  return (
    <div class="modal-title">
      {props.children}
      <Button
        type="button"
        onClick={() => props.toggleModal(false)}
        class="modal-close"
      >
        X
      </Button>
    </div>
  );
};

const Action: FlowComponent = (props) => {
  return <div class="modal-actions">{props.children}</div>;
};

Modal.Action = Action;
Modal.Title = Title;
Modal.Content = Content;

export default Modal;
