/** @format */

import { FlowComponent, JSX, mergeProps, Show, splitProps } from 'solid-js';
import { Button } from '../button';
import { ModalSize } from '../../types';

type ModalProps = {
  isOpen: boolean;
  toggleModal: (val: boolean) => void;
  size: ModalSize;
  closeIcon: () => JSX.Element;
  class?: string;
};

const Modal: FlowComponent<ModalProps> = (props) => {
  const mergedProps = mergeProps({ size: 'large' }, props);
  const [local, others] = splitProps(mergedProps, ['size', 'class']);
  return (
    <Show when={others.isOpen} fallback={null}>
      <div class="modal-background">
        <div
          class={(['elevation-300', 'radius-small', 'modal'] as Array<string>)
            .concat(local.class ?? '')
            .join(' ')}
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
              {others.closeIcon()}
            </Button>
          </div>
          {others.children}
        </div>
      </div>
    </Show>
  );
};

export default Modal;
