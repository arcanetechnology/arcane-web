/** @format */

import * as React from 'react';
import ArcaneThemeProvider from './theme';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as rootLoader } from './routes/root';
import ErrorPage from './error-page';
import Edit from './routes/edit';
import Profiles from './routes/profiles';
import Index from './routes';
import Profile from './routes/profile';
import Accounts from './routes/accounts';
import { GenericError, ProtectedRoute } from './components';
import Account from './routes/account';
import Portfolios from './routes/portfolios';
import Portfolio from './routes/portfolio';
import Cryptos from './routes/cryptos';
import Custody from './routes/custody';
import Auth from './routes/auth';
import { CreateUser, ViewUser } from './routes/user';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute>{(user) => <Root user={user} />}</ProtectedRoute>,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    children: [
      { index: true, element: <Index /> },
      {
        path: ':userId',
        element: <ViewUser />,
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
              {
                path: 'accounts/:accountId',
                element: <Account />,
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
