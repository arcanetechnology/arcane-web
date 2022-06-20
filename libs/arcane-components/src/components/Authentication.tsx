/** @format */

import { Button } from '@arcane-web/alchemy-solid';
import { JSX, VoidComponent } from 'solid-js';

const Authentication: VoidComponent = () => {
  return (
    <Button title="sign into arcane platform" variant="secondary" id="auth">
      <span>Sign-in</span>
    </Button>
  );
};

export default Authentication;
