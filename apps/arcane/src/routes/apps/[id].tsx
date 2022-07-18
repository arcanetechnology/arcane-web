/** @format */

import { RouteDataFunc, useRouteData } from 'solid-app-router';
import { Show, VoidComponent } from 'solid-js';
import type { AppDataType } from './[id].data';

const App: VoidComponent = () => {
  const user = useRouteData<AppDataType>();
  return (
    <Show when={user}>
      <div>{user.name}</div>
    </Show>
  );
};
export default App;
