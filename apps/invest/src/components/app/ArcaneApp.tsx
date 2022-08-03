/** @format */

import { getAuth } from 'firebase/auth';
import { useAuth } from '@arcane-web/arcane-auth';
import { useNavigate } from 'solid-app-router';
import {
  createContext,
  FlowComponent,
  JSXElement,
  ErrorBoundary,
  useContext,
  Show,
  createResource,
  createSignal,
  createEffect,
} from 'solid-js';
import { fetchUserRegistration } from '../../api';

// app information type
const ArcaneAppContext = createContext();

type ArcaneAppProviderProps = {
  children: JSXElement;
  name: string;
};

const ArcaneAppProvider: FlowComponent<ArcaneAppProviderProps> = (props) => {
  const [data] = createResource(fetchUserRegistration);
  const navigate = useNavigate();
  const [show, setShow] = createSignal(false);
  const auth = getAuth();
  const state = useAuth(auth);

  createEffect(() => {
    if (!data && !state.loading && !state.data) {
      return navigate('/', { replace: true });
    }
    setShow(true);
  });
  return (
    <ErrorBoundary
      fallback={
        <section class="margin-48">
          <div id="apology-message" class="container" data-auto-grid="2">
            <div class="space-8">
              <h1>Something went wrong...</h1>
            </div>
          </div>
        </section>
      }
    >
      <Show
        when={data && show()}
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
        <ArcaneAppContext.Provider value={data}>
          {props.children}
        </ArcaneAppContext.Provider>
      </Show>
    </ErrorBoundary>
  );
};

export default ArcaneAppProvider;

export const useArcaneApp = () => {
  const ctx = useContext(ArcaneAppContext);

  if (!ctx)
    throw new Error(
      'useArcaneApp must be used within a <ArcaneAppContext.Provider />'
    );

  return ctx;
};
