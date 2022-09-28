/** @format */
import { createBrowserRouter, Params } from 'react-router-dom';
import Root from './routes/root';
import ErrorPage from './error-page';
import Index from './routes';
import {
  GenericError,
  NavigationLink,
  ProtectedRoute,
  UsersToolbar,
} from './components';
import Auth from './routes/auth';
import { CreateUser, ViewUser } from './routes/user';
import { CreateProfile, ViewProfile, ViewProfiles } from './routes/profiles';
import { ViewAccounts, ViewAccount, CreateAccount } from './routes/accounts';
import { ViewCustody, ViewCustodies } from './routes/custodies';
import {
  CreatePortfolio,
  ViewPortfolio,
  ViewPortfolios,
} from './routes/portfolios';
import { ViewCryptos, CreateCrypto } from './routes/cryptos';
import { Tab } from '@mui/material';
import React from 'react';
import { Add, Delete, Group, Money, PointOfSale } from '@mui/icons-material';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ProtectedRoute>{(user) => <Root user={user} />}</ProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Index />,
      },
      {
        path: ':userId',
        element: <ViewUser />,
        errorElement: <GenericError />,
        handle: {
          setting: (key: string) => (
            <NavigationLink
              key={key}
              to="profiles/create"
              primary="Create New Profile"
              icon={<Add />}
            />
          ),
        },
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
            handle: {
              tab: () => (
                <Tab
                  icon={<PointOfSale />}
                  iconPosition="start"
                  label="transaction"
                />
              ),
              setting: (key: string) => (
                <NavigationLink
                  key={key}
                  to=""
                  primary="Delete Profile"
                  icon={<Delete />}
                />
              ),
            },
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
                    element: <ViewPortfolios />,
                    errorElement: <GenericError />,
                    children: [
                      {
                        path: 'create',
                        element: <CreatePortfolio />,
                        errorElement: <GenericError />,
                      },
                    ],
                  },
                  {
                    path: 'portfolios/:portfolioId',
                    element: <ViewPortfolio />,
                    errorElement: <GenericError />,
                    children: [
                      {
                        path: 'cryptos',
                        element: <ViewCryptos />,
                        errorElement: <GenericError />,
                        children: [
                          {
                            path: 'create',
                            element: <CreateCrypto />,
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
        ],
      },
      {
        path: 'custody',
        element: <ViewCustodies />,
        errorElement: <ErrorPage />,
        children: [
          {
            path: ':custodyId',
            element: <ViewCustody />,
            errorElement: <GenericError />,
          },
        ],
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

export default router;
