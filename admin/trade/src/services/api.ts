/** @format */

import { RootState } from '@/state';
import { getEntireUrl } from '@/utils';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.VITE_BASE_URL + import.meta.env.VITE_TRADE_ADMIN_ENDPOINT,
  mode: 'cors',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${token}`);
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: [
    'User',
    'Profiles',
    'Profile',
    'Accounts',
    'Account',
    'CryptoAccounts',
    'Portfolios',
    'Portfolio',
    'Cryptos',
    'Crypto',
    'Virtual',
    'Custodies',
    'Custody',
    'Transactions',
  ],
  // enpoints are injected later
  endpoints: () => ({}),
});

export const getFrontendUrl = getEntireUrl();
