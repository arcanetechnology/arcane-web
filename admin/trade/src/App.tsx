/** @format */

import * as React from 'react';
import Home from './pages/Home';
import ArcaneThemeProvider from './theme';

const App: React.FC = () => {
  return (
    <ArcaneThemeProvider>
      <Home />
    </ArcaneThemeProvider>
  );
};

export default App;
