/** @format */

import { ArcaneAuthProvider } from '@arcane-web/arcane-auth';
import { useRoutes, Router } from 'solid-app-router';
import { Shell } from './components';
import config from './firebase.config';
import { routes } from './routes';

export function createApp() {
  const Routes = useRoutes(routes);
  return (
    <ArcaneAuthProvider config={config} name="invest">
      <Router base="invest">
        <Shell>
          <Routes />
        </Shell>
      </Router>
    </ArcaneAuthProvider>
  );
}
