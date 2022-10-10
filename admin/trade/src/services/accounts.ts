/** @format */

import { api, getFrontendUrl } from './api';
import {
  ProfilePath,
  AccountPath,
  GetAccountsResponse,
  GetAccountResponse,
  CreateAccountRequest,
  StakeholderFiatAccount,
} from '@/types';
import { accounts, profiles, users } from '@/constants';

const getAccounts = (path: ProfilePath) =>
  getFrontendUrl(users, path.userId, profiles, path.profileId, accounts);

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
      extraOptions: {
        maxRetries: 0,
      },
      invalidatesTags: ['Accounts'],
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
