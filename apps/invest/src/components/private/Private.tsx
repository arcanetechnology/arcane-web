/** @format */

import { getAuth } from 'firebase/auth';
import { useAuth } from '@arcane-web/arcane-auth';
import { useNavigate } from 'solid-app-router';
import {
  JSXElement,
  FlowComponent,
  createEffect,
  Show,
  createSignal,
} from 'solid-js';

type PrivateProps = {
  children: JSXElement;
};

const Private: FlowComponent<PrivateProps> = (props) => {
  const [showPage, setPage] = createSignal(false);
  const navigate = useNavigate();
  const auth = getAuth();
  const state = useAuth(auth);

  createEffect(() => {
    if (!state.loading && !state.data) {
      navigate('/', { replace: true });
    }
    setPage(true);
  });
  return (
    <Show
      when={showPage()}
      fallback={
        <>
          <section class="margin-48">
            <div class="container" style={{ 'text-align': 'center' }}>
              <div class="skeleton skeleton-text" />
              <div class="skeleton skeleton-text" />
            </div>
          </section>
          <section class="margin-48">
            <div id="apology-message" class="container" data-auto-grid="2">
              <div class="space-8">
                <img class="skeleton" alt="" id="cover-img" />
              </div>
              <div class="space-8 align-vertical">
                <div class="skeleton skeleton-text" />
                <div class="margin-top-16">
                  <div class="skeleton skeleton-text skeleton-text__body" />
                </div>
              </div>
            </div>
          </section>
        </>
      }
    >
      {props.children}
    </Show>
  );
};

export default Private;
