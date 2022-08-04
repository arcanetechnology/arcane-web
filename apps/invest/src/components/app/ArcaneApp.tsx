/** @format */

import {
  FlowComponent,
  JSXElement,
  ErrorBoundary,
  createResource,
} from 'solid-js';
import { fetchUserRegistration } from '../../api';
import { useLocation } from 'solid-app-router';

// app information type

type ArcaneAppProviderProps = {
  children: JSXElement;
  name: string;
};

const ArcaneAppProvider: FlowComponent<ArcaneAppProviderProps> = (props) => {
  const location = useLocation();
  if (location.state) {
    if (location.state['valid'] !== true) {
      createResource(fetchUserRegistration);
    }
  } else {
    createResource(fetchUserRegistration);
  }

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
      <>{props.children}</>
    </ErrorBoundary>
  );
};

export default ArcaneAppProvider;
