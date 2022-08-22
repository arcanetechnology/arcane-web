/** @format */

import type { VoidComponent } from 'solid-js';
import { Router } from '@solidjs/router';
import { Footer } from './components';

const App: VoidComponent = () => {
  return (
    <Router>
      <Footer />
    </Router>
  );
};

export default App;
