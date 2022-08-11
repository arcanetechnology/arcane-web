/** @format */

import {
  FlowComponent,
  JSXElement,
  ErrorBoundary,
  createResource,
  Show,
  createEffect,
  createSignal,
} from 'solid-js';
import { fetchUserRegistration } from '../../api';

// app information type

type ArcaneAppProviderProps = {
  children: JSXElement;
  name: string;
};

const ArcaneAppProvider: FlowComponent<ArcaneAppProviderProps> = (props) => {
  const [show, setShowing] = createSignal(false);

  // ONCE auth is done in service worker, we can use the usual loading from createResource

  if (!import.meta.env.DEV) {
    createResource(fetchUserRegistration);
  }

  createEffect(() => {
    setTimeout(() => {
      setShowing(true);
    }, 200);
  });
  return (
    <ErrorBoundary
      fallback={
        <section class="margin-48">
          <div id="apology-message" class="container" data-auto-grid="2">
            <div class="space-8">
              <h6>Something went wrong...</h6>
            </div>
          </div>
        </section>
      }
    >
      <Show when={show()}>{props.children}</Show>
    </ErrorBoundary>
  );
};

export default ArcaneAppProvider;
