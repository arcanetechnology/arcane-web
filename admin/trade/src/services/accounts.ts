/** @format */
/** @format */

import { api } from './api';
import { VirtualAccountResponse, CustodyAccountResponse } from '../types';
import { GetAccountsResponse, GetAccountResponse } from '../types/backend';
import { ProfilePath, AccountPath } from '@/types/frontend';
import { PROFILES_ENDPOINT, USERS_ENDPOINT } from '@/constants';

export const accountsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAccounts: build.query<GetAccountsResponse, ProfilePath>({
      query: (path) => ({
        url: `${USERS_ENDPOINT}/${path.userId}/${PROFILES_ENDPOINT}/${path.profileId}/accounts`,
      }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Accounts', id } as const)),
        {
          type: 'Accounts' as const,
          id: 'LIST',
        },
      ],
    }),

    getAccount: build.query<GetAccountResponse, AccountPath>({
      query: (path) =>
        `${USERS_ENDPOINT}/${path.userId}/${PROFILES_ENDPOINT}/${path.profileId}/accounts/${path.accountId}`,
      providesTags: (_account, _err, path) => [
        { type: 'Account' as const, id: path.accountId },
      ],
    }),
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

export const {
  useGetVirtualAccountsQuery,
  useGetCustodyAccountsQuery,
  useGetAccountsQuery,
  useGetAccountQuery,
} = accountsApi;
