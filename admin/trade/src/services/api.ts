/** @format */

import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL,
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
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
