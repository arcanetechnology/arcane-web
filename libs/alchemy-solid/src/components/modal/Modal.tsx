/** @format */

import { FlowComponent, Show } from 'solid-js';
import { Button } from '../button';

type ModalProps = {
  isOpen: boolean;
  toggleModal: (val: boolean) => void;
};

const Modal: FlowComponent<ModalProps> = (props) => {
  return (
    <Show when={props.isOpen} fallback={null}>
      <div class="modal-background">
        <div class="elevation-300 radius-small modal">
          <div class="modal-close">
            <Button
              type="button"
              onClick={() => props.toggleModal(false)}
              class="modal-close"
            >
              x
            </Button>
          </div>
          {props.children}
        </div>
      </div>
    </Show>
  );
};

export default Modal;
