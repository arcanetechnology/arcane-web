/** @format */

import * as React from 'react';
import ArcaneThemeProvider from './theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as rootLoader } from './routes/root';
import ErrorPage from './error-page';
import Edit from './routes/edit';
import Index from './routes';
import { GenericError, ProtectedRoute } from './components';
import Portfolios from './routes/portfolios';
import Portfolio from './routes/portfolio';
import Cryptos from './routes/cryptos';
import Custody from './routes/custody';
import Auth from './routes/auth';
import { CreateUser, ViewUser } from './routes/user';
import { CreateProfile, ViewProfile, ViewProfiles } from './routes/profiles';
import { ViewAccounts, ViewAccount, CreateAccount } from './routes/accounts';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute>{(user) => <Root user={user} />}</ProtectedRoute>,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: ':userId',
        element: <ViewUser />,
        errorElement: <GenericError />,
        children: [
          {
            path: 'profiles',
            element: <ViewProfiles />,
            errorElement: <GenericError />,
            children: [
              {
                path: 'create',
                element: <CreateProfile />,
                errorElement: <GenericError />,
              },
            ],
          },
          {
            path: 'profiles/:profileId',
            element: <ViewProfile />,
            errorElement: <GenericError />,
            children: [
              {
                path: 'accounts',
                element: <ViewAccounts />,
                errorElement: <GenericError />,
                children: [
                  {
                    path: 'create',
                    element: <CreateAccount />,
                    errorElement: <GenericError />,
                  },
                ],
              },
              {
                path: 'accounts/:accountId',
                element: <ViewAccount />,
                errorElement: <GenericError />,
                children: [
                  {
                    path: 'portfolios',
                    element: <Portfolios />,
                    errorElement: <GenericError />,
                  },
                  {
                    path: 'portfolios/:portfolioId',
                    element: <Portfolio />,
                    errorElement: <GenericError />,
                    children: [
                      {
                        path: 'cryptos',
                        element: <Cryptos />,
                        errorElement: <GenericError />,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: ':userId/edit',
        element: <Edit />,
      },
      {
        path: 'custody',
        element: <Custody />,
        errorElement: <ErrorPage />,
      },
      {
        path: 'create',
        element: <CreateUser />,
        errorElement: <GenericError />,
        children: [{ path: 'profiles' }],
      },
    ],
  },
  {
    path: '/auth',
    element: <Auth />,
    errorElement: <ErrorPage />,
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
