/** @format */

import { api } from './api';
import {
  GetAccountsResponse,
  GetAccountResponse,
  CreateAccountRequest,
  StakeholderFiatAccount,
} from '../types/backend';
import { ProfilePath, AccountPath } from '@/types';
import { PROFILES_ENDPOINT, USERS_ENDPOINT } from '@/constants';

const getAccounts = (path: ProfilePath) =>
  `${USERS_ENDPOINT}/${path.userId}/${PROFILES_ENDPOINT}/${path.profileId}/accounts`;

const getAccount = ({ accountId, ...path }: AccountPath) =>
  getAccounts(path) + `/${accountId}`;

export const accountsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAccounts: build.query<GetAccountsResponse, ProfilePath>({
      query: (path) => ({
        url: getAccounts(path),
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: 'Accounts', id } as const)),
              { type: 'Accounts', id: 'LIST' },
            ]
          : [{ type: 'Accounts', id: 'LIST' }];
      },
    }),
    addAccount: build.mutation<
      StakeholderFiatAccount,
      CreateAccountRequest & ProfilePath
    >({
      query({ userId, profileId, ...body }) {
        return {
          url: getAccounts({ userId, profileId }),
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Profile', 'Accounts'],
    }),
    getAccount: build.query<GetAccountResponse, AccountPath>({
      query: (path) => getAccount(path),
      providesTags: (_account, _err, path) => [
        { type: 'Account' as const, id: path.accountId },
      ],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useGetAccountQuery,
  useAddAccountMutation,
} = accountsApi;
