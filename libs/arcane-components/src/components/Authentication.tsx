/** @format */

import { Button } from '@arcane-web/alchemy';
import { JSX, VoidComponent } from 'solid-js';

type AuthenticationProps = {
  onClick: JSX.EventHandlerUnion<HTMLButtonElement, MouseEvent>;
};

const Authentication: VoidComponent<AuthenticationProps> = (props) => {
  return (
    <Button
      title="sign into arcane platform"
      variant="secondary"
      id="auth"
      onClick={props.onClick}
    >
      <span>Sign-in</span>
    </Button>
  );
};

export default Authentication;
