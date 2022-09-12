/** @format */

import { api } from './api';
import { UsersResponse, UserResponse, AccountOption } from '../types';
import { getAllUserAccountOptions } from '@/utils';

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
  }),
});

export const { useGetUsersQuery, useGetUserQuery, useGetAccountOptionsQuery } =
  usersApi;
