/** @format */

import { Suspense } from 'solid-js';
import { useRoutes, Router } from 'solid-app-router';
import type { VoidComponent } from 'solid-js';
import { routes } from './routes';

type AppProps = {
  url?: string;
};

// TODO: change the fallback to arcane logo
export const App: VoidComponent<AppProps> = (props) => {
  const Routes = useRoutes(routes);
  return (
    <Router url={props.url ?? '/'}>
      <Suspense fallback={'...loading'}>
        <Routes />
      </Suspense>
    </Router>
  );
};

export default App;
