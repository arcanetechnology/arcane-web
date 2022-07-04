/** @format */

import { getAuth } from 'firebase/auth';
import { useAuth } from '@arcane-web/arcane-auth';
import { useNavigate } from 'solid-app-router';
import { JSXElement, FlowComponent, createEffect, Show } from 'solid-js';

type PrivateProps = {
  children: JSXElement;
};

const Private: FlowComponent<PrivateProps> = (props) => {
  const navigate = useNavigate();
  const auth = getAuth();
  const state = useAuth(auth);

  createEffect(() => {
    if (!state.loading && !state.data) {
      navigate('/', { replace: true });
    }
  });
  return (
    <Show when={state.loading} fallback={'...LOADING'}>
      <>{props.children}</>
    </Show>
  );
};

export default Private;
