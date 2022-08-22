/** @format */

import type { VoidComponent } from 'solid-js';
import { Header } from './components';

// TODO: make it into a cdn and shove it in base layout of arcane.
import '@arcane-web/alchemy';

const App: VoidComponent = () => {
  return <Header />;
};

export default App;
