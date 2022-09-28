/** @format */

import * as React from 'react';
import ArcaneThemeProvider from './theme';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const App: React.FC = () => {
  return (
    <ArcaneThemeProvider>
      <RouterProvider router={router} />
    </ArcaneThemeProvider>
  );
};

export default App;
