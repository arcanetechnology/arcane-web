/** @format */

import { RootState } from '@/state';
import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import { GetUserResponse } from '@/types';
import { users } from '@/constants';

const baseQuery = fetchBaseQuery({
  baseUrl:
    import.meta.env.VITE_BASE_URL + import.meta.env.VITE_BACKEND_ENDPOINT,
  mode: import.meta.env.DEV ? 'no-cors' : 'cors',
  prepareHeaders: (headers, { getState }) => {
    const { token } = (getState() as RootState).auth;
    headers.set('Content-Type', 'application/json');
    headers.set('Authorization', `Bearer ${token}`);
    headers.set('Access-Control-Allow-Origin', '*');
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  // enpoints are injected later
  endpoints: (build) => ({
    getUser: build.query<GetUserResponse, string>({
      query: (args) => ({ url: users, params: { email: args } }),
      extraOptions: {
        maxRetries: 0,
      },
    }),
  }),
});

export const { useLazyGetUserQuery } = api;
