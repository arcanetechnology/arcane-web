/** @format */

import * as React from 'react';
import ArcaneThemeProvider from './theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as rootLoader } from './routes/root';
import ErrorPage from './error-page';
import User from './routes/user';
import Edit from './routes/edit';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      { path: 'users/:userId', element: <User /> },
      { path: 'users/:userId/edit', element: <Edit /> },
    ],
  },
]);

const App: React.FC = () => {
  return (
    <ArcaneThemeProvider>
      <RouterProvider router={router} />
    </ArcaneThemeProvider>
  );
};

export default App;
