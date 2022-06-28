/** @format */

import { Button } from '@arcane-web/alchemy-solid';
import { VoidComponent, Show } from 'solid-js';
import { useAuth } from '@arcane-web/arcane-auth';
import { getAuth } from 'firebase/auth';

const Authentication: VoidComponent = () => {
  const auth = getAuth();
  const state = useAuth(auth);
  return (
    <Show
      when={state.data}
      fallback={
        <Button title="sign into arcane platform" variant="secondary" id="auth">
          <span>Sign In</span>
        </Button>
      }
    >
      <Button title="sign into arcane platform" variant="secondary" id="auth">
        <span>Sign Out</span>
      </Button>
    </Show>
  );
};

export default Authentication;
