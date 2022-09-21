/** @format */

import * as React from 'react';
import ArcaneThemeProvider from './theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as rootLoader } from './routes/root';
import ErrorPage from './error-page';
import User from './routes/user';
import Edit from './routes/edit';
import Profiles from './routes/profiles';
import { Alert, Typography } from '@mui/material';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        path: ':userId',
        element: <User />,
        errorElement: (
          <Alert variant="outlined" severity="error">
            there was an error
          </Alert>
        ),
        children: [
          {
            path: 'profiles',
            element: <Profiles />,
            errorElement: (
              <Alert variant="outlined" severity="error">
                there was an error
              </Alert>
            ),
          },
        ],
      },
      {
        path: ':userId/edit',
        element: <Edit />,
      },
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
