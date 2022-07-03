/** @format */

import type { Component, VoidComponent } from 'solid-js';
import { Router } from 'solid-app-router';
import { useRoutes } from 'solid-app-router';
import { routes } from './routes';
import '@arcane-web/alchemy';

const App: Component = () => {
  const Route = useRoutes(routes);

  return (
    <>
      <Route />
    </>
  );
};

type CreateAppProps = {
  url: string;
};

export const createApp: VoidComponent<CreateAppProps> = (props) => {
  return (
    <Router url={props.url}>
      <App />
    </Router>
  );
};
