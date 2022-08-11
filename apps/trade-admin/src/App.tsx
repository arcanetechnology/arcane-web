/** @format */

import { ArcaneAuthProvider } from '@arcane-web/arcane-auth';
import { useRoutes, Router } from '@solidjs/router';
import { Shell } from './components';
import config from './firebase.config';
import { routes } from './routes';
import { Toaster } from 'solid-toast';

export function createApp() {
  const Routes = useRoutes(routes);
  return (
    <ArcaneAuthProvider config={config} name="invest">
      <Router base="trade-admin">
        <Shell>
          <section class="margin-48">
            <div class="container">
              <Routes />
            </div>
          </section>
        </Shell>
      </Router>
      <Toaster />
    </ArcaneAuthProvider>
  );
}
