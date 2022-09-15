/** @format */
/** @format */

import { api } from './api';
import { VirtualAccountResponse, CustodyAccountResponse } from '../types';

export const accountsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getVirtualAccounts: build.query<VirtualAccountResponse, void>({
      query: () => ({ url: 'virtual/accounts' }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Virtual', id } as const)),
        {
          type: 'Virtual' as const,
          id: 'LIST',
        },
      ],
    }),
    getCustodyAccounts: build.query<CustodyAccountResponse, void>({
      query: () => ({ url: 'arcane/accounts/custody' }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Custody', id } as const)),
        {
          type: 'Custody' as const,
          id: 'LIST',
        },
      ],
    }),
  }),
});

export const { useGetVirtualAccountsQuery, useGetCustodyAccountsQuery } =
  accountsApi;
