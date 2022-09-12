/** @format */

import { api } from './api';
import { UsersResponse, UserResponse } from '../types';

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
        console.log(response);
        return response;
      },
      providesTags: (_user, _err, id) => [{ type: 'User', id }],
    }),
  }),
});

export const { useGetUsersQuery, useGetUserQuery } = usersApi;
