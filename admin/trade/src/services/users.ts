/** @format */

import { api } from './api';
import {
  UsersResponse,
  UserResponse,
  AccountOption,
  TradeUser,
  VirtualAccount,
  AccountTypes,
} from '../types';
import { getAllUserAccountOptions } from '@/utils';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<UsersResponse, void>({
      query: () => ({ url: 'users' }),
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Users', id } as const)),
        {
          type: 'Users' as const,
          id: 'LIST',
        },
      ],
    }),
    // TODO getProfiles
    // TODO getAccounts
    // TODO getPortfolios
    // TODO getCryptoAccounts
    getUser: build.query<UserResponse, string>({
      query: (id) => `users/${id}`,
      transformResponse: (response: UserResponse) => {
        return response;
      },
      providesTags: (_user, _err, id) => [{ type: 'User', id }],
    }),
    getAccountOptions: build.query<Array<AccountOption>, string>({
      query: (id) => `users/${id}`,
      transformResponse: (response: UserResponse) => {
        return getAllUserAccountOptions(response);
      },
      providesTags: (_user, _err, id) => [{ type: 'User', id }],
    }),
    getAllAccountOptions: build.query<Array<AccountOption>, string>({
      async queryFn(id, _queryApi, _extraOptions, fetchWithBQ) {
        const userResult = await fetchWithBQ(`users/${id}`);

        if (userResult.error) {
          return { error: userResult.error as FetchBaseQueryError };
        }

        // get the user
        const user = userResult.data as TradeUser;

        const result = await fetchWithBQ('virtual/accounts');
        if (result.error) {
          return { error: result.error as FetchBaseQueryError };
        }
        const virtual = result.data as Array<VirtualAccount>;

        const arcaneStakeholderAccountsResults = await fetchWithBQ(
          'arcane/accounts/stakeholder'
        );

        if (arcaneStakeholderAccountsResults.error) {
          return {
            error:
              arcaneStakeholderAccountsResults.error as FetchBaseQueryError,
          };
        }

        const arcaneStakeholderAccounts =
          arcaneStakeholderAccountsResults.data as Array<{
            id: string;
            alias: string;
            balance: number;
            currency: string;
            custodyAccountId: string;
            type: AccountTypes;
          }>;

        const stakeholderAccountsOptions: AccountOption[] =
          arcaneStakeholderAccounts.map(
            ({ id, currency, custodyAccountId, alias, balance, type }) => ({
              id,
              currency,
              custodyAccountId,
              balance,
              type,
              label: alias,
            })
          );

        const accountOptionVirtual: AccountOption[] = virtual.map(
          ({ id, currency, label, allowNegative }) => ({
            id,
            label,
            currency,
            allowNegative,
            type: 'Virtual',
          })
        );

        return {
          data: [
            ...getAllUserAccountOptions(user),
            ...accountOptionVirtual,
            ...stakeholderAccountsOptions,
          ],
        };
      },
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useGetAccountOptionsQuery,
  useGetAllAccountOptionsQuery,
} = usersApi;
