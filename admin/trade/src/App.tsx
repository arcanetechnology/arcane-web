/** @format */

import * as React from 'react';
import ArcaneThemeProvider from './theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as rootLoader } from './routes/root';
import ErrorPage from './error-page';
import User from './routes/user';
import Edit from './routes/edit';
import Profiles from './routes/profiles';
import Index from './routes';
import Profile from './routes/profile';
import Accounts from './routes/accounts';
import { GenericError } from './components';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      { index: true, element: <Index /> },
      {
        path: ':userId',
        element: <User />,
        errorElement: <GenericError />,
        children: [
          {
            path: 'profiles',
            element: <Profiles />,
            errorElement: <GenericError />,
          },
          {
            path: 'profiles/:profileId',
            element: <Profile />,
            errorElement: <GenericError />,
            children: [
              {
                path: 'accounts',
                element: <Accounts />,
                errorElement: <GenericError />,
              },
            ],
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
