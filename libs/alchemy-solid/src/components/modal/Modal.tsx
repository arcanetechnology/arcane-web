/** @format */

import { FlowComponent, JSX, mergeProps, Show, splitProps } from 'solid-js';
import { Button } from '../button';
import { ModalSize } from '../../types';

type ModalProps = {
  isOpen: boolean;
  toggleModal: (val: boolean) => void;
  size: ModalSize;
  class?: string;
  icon: JSX.Element;
};

const Modal: FlowComponent<ModalProps> = (props) => {
  const mergedProps = mergeProps({ size: 'large' }, props);
  const [local, others] = splitProps(mergedProps, ['size', 'class']);
  return (
    <>
      {props.isOpen ? (
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
            <Show when={local.size === 'large'}>
              <div class="modal-close">
                <Button
                  variant="tertiary"
                  size="medium"
                  style={{ width: '50px' }}
                  type="button"
                  onClick={() => others.toggleModal(false)}
                  class="modal-close"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    // eslint-disable-next-line solid/no-unknown-namespaces
                    width="1em"
                    height="1em"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fill="currentColor"
                      d="M10 8.586L2.929 1.515L1.515 2.929L8.586 10l-7.071 7.071l1.414 1.414L10 11.414l7.071 7.071l1.414-1.414L11.414 10l7.071-7.071l-1.414-1.414L10 8.586z"
                    />
                  </svg>
                </Button>
              </div>
            </Show>
            {others.children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default Modal;
