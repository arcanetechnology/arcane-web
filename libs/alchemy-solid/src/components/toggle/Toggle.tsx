/** @format */

import { createEffect, createSignal, VoidComponent } from 'solid-js';
import type { ToggleState } from '../../types';

const checked = () => <></>;
const unchecked = () => <></>;

type ToggleProps = {
  state?: ToggleState;
  disabled?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
};

const Toggle: VoidComponent<ToggleProps> = (props) => {
  const [toggle, setToggle] = createSignal(false);

  createEffect(() => {
    if (props.defaultChecked) {
      setToggle(props.defaultChecked);
    }
  });

  const getIcon = (state: ToggleState) => {
    if (state === 'checked') {
      return checked();
    }
    return unchecked();
  };

  const triggerToggle = () => {
    if (props.disabled) return;

    setToggle(!toggle());

    if (typeof props.onChange === 'function') {
      props.onChange(!toggle());
    }
  };

  return (
    <div
      onClick={triggerToggle}
      class="wrg-toggle"
      classList={{
        'wrg-toggle--checked': toggle(),
        'wrg-toggle--disabled': props.disabled,
      }}
    >
      <div class="wrg-toggle-container">
        <div class="wrg-toggle-check">
          <span>{getIcon('checked')}</span>
        </div>
        <div class="wrg-toggle-uncheck">
          <span>{getIcon('unchecked')}</span>
        </div>
      </div>
      <div class="wrg-toggle-circle" />
      <input
        type="checkbox"
        aria-label="Toggle Button"
        class="wrg-toggle-input"
      />
    </div>
  );
};

export default Toggle;
