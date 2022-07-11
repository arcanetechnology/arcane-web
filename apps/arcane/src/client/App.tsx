/** @format */

import { Router, useRoutes } from 'solid-app-router';
import type { VoidComponent } from 'solid-js';

const App: VoidComponent = () => {
  const Route = useRoutes([]);
  return (
    <>
      <h1>Hello</h1>
      <Route />
    </>
  );
};

export default App;

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
