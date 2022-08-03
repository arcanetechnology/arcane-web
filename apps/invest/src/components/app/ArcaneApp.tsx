/** @format */

import { useNavigate } from 'solid-app-router';
import {
  createContext,
  FlowComponent,
  JSXElement,
  ErrorBoundary,
  useContext,
  Show,
  createResource,
  createEffect,
  on,
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

  createEffect(
    on(data, (data) => {
      if (data === 'error') {
        navigate('/');
      }
    })
  );

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
        when={data() === 'success'}
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
                    <div
                      style={{ color: 'grey', width: '400px', height: '40px' }}
                    />
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
