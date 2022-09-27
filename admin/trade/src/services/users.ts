/** @format */

import { api } from './api';
import {
  UserResponse,
  AccountOption,
  TradeUser,
  VirtualAccount,
  AccountTypes,
} from '@/types';
import {
  GetUsersResponse,
  User,
  CreateUserRequest,
  GetUserResponse,
} from '@/types/backend';
import { getAllUserAccountOptions } from '@/utils';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';
import { USERS_ENDPOINT } from '@/constants';

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<GetUsersResponse, string>({
      query: (args) => ({ url: USERS_ENDPOINT, params: { q: args } }),
      extraOptions: {
        maxRetries: 0,
      },
    }),
    addUser: build.mutation<User, CreateUserRequest>({
      query(body) {
        return {
          url: USERS_ENDPOINT,
          method: 'POST',
          body,
        };
      },
    }),
    getUser: build.query<GetUserResponse, string>({
      query: (id) => `${USERS_ENDPOINT}/${id}`,
      providesTags: (_user, _err, id) => [{ type: 'User', id }],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `${USERS_ENDPOINT}/${id}`,
        method: 'DELETE',
        credentials: 'include',
      }),
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
  useLazyGetUsersQuery,
  useAddUserMutation,
  useGetUserQuery,
  useGetAccountOptionsQuery,
  useGetAllAccountOptionsQuery,
} = usersApi;
