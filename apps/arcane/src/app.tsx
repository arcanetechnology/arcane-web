/** @format */

import type { Component } from 'solid-js';
import { Router } from 'solid-app-router';
import { useRoutes } from 'solid-app-router';
import { routes } from './routes';

const App: Component = () => {
  const Route = useRoutes(routes);

  return (
    <>
      <main>
        <Route />
      </main>
    </>
  );
};

export function createApp({ url }: { url?: string }) {
  return (
    <Router url={url}>
      <App />
    </Router>
  );
}
