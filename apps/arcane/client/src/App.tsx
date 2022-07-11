/** @format */

import { Router, Routes, Route } from 'solid-app-router';
import type { VoidComponent } from 'solid-js';
import { Login, Home } from './pages';

const App: VoidComponent = () => {
  return (
    <Routes>
      <Route path="/" component={Login} />
      <Route path="/home" component={Home} />
    </Routes>
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
