/** @format */
/** @format */

import { api } from './api';
import { VirtualAccountResponse } from '../types';

export const accountsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getVirtualAccounts: build.query<VirtualAccountResponse, void>({
      query: () => ({ url: 'accounts/virtual' }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Virtual', id } as const)),
        {
          type: 'Virtual' as const,
          id: 'LIST',
        },
      ],
    }),
  }),
});

export const { useGetVirtualAccountsQuery } = accountsApi;
