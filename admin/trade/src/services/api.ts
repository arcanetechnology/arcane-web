/** @format */

import { RootState } from '@/state';
import { getEntireUrl } from '@/utils';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
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
    'Portfolios',
    'Portfolio',
    'Cryptos',
    'Crypto',
    'Virtual',
    'Custodies',
    'Custody',
  ],
  // enpoints are injected later
  endpoints: () => ({}),
});

export const getFrontendUrl = getEntireUrl();
