/** @format */

import { Button } from '@arcane-web/alchemy-solid';
import { VoidComponent, Show } from 'solid-js';
import { useAuth } from '@arcane-web/arcane-auth';
import { getAuth } from 'firebase/auth';

const Authentication: VoidComponent = () => {
  const auth = getAuth();
  const state = useAuth(auth);

  const signin = () => {
    const width = 512;
    const height = 563;
    const left = window.screen.width / 2 - width / 2;
    const top = window.screen.height / 2 - height / 2;
    window.open(
      `${window.location.origin}/auth?redirect=${
        window.location.href
      }&t=${Date.now()}`,
      'authentication',
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no`
    );
  };

  const signOut = () => {
    auth.signOut();
  };

  return (
    <Show
      when={state.data}
      fallback={
        <Button
          onClick={signin}
          title="sign into arcane platform"
          variant="secondary"
          id="auth"
        >
          <span>Sign In</span>
        </Button>
      }
    >
      <Button
        onClick={signOut}
        title="sign into arcane platform"
        variant="secondary"
        id="auth"
      >
        <span>Sign Out</span>
      </Button>
    </Show>
  );
};

export default Authentication;
