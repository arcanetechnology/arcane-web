/** @format */

import { FlowComponent, mergeProps, Show, splitProps } from 'solid-js';
import { Button } from '../button';
import { IoCloseCircleSharp } from 'solid-icons/io';
import { ModalSize } from '../../types';

type ModalProps = {
  isOpen: boolean;
  toggleModal: (val: boolean) => void;
  size: ModalSize;
};

const Modal: FlowComponent<ModalProps> = (props) => {
  const mergedProps = mergeProps({ size: 'large' }, props);
  const [local, others] = splitProps(mergedProps, ['size', 'children']);
  return (
    <Show when={others.isOpen} fallback={null}>
      <div class="modal-background">
        <div
          class="elevation-300 radius-small modal"
          classList={{
            'modal-small': local.size === 'small',
            'modal-large': local.size === 'large',
          }}
        >
          <div class="modal-close">
            <Button
              variant="tertiary"
              type="button"
              onClick={() => others.toggleModal(false)}
              class="modal-close"
            >
              <IoCloseCircleSharp size={42} />
            </Button>
          </div>
          {local.children}
        </div>
      </div>
    </Show>
  );
};

export default Modal;
