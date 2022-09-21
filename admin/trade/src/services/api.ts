/** @format */

import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';
import axios from 'axios';

const baseQuery = fetchBaseQuery({
  baseUrl: '/',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json');
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  baseQuery: baseQueryWithRetry,
  tagTypes: ['Users', 'User', 'Profiles', 'Virtual', 'Custody'],
  // enpoints are injected later
  endpoints: () => ({}),
});
