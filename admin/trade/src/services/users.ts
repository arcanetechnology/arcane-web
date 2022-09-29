/** @format */

import { api } from './api';
import {
  GetUsersResponse,
  User,
  CreateUserRequest,
  GetUserResponse,
} from '@/types';
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
  }),
});

export const {
  useGetUsersQuery,
  useLazyGetUsersQuery,
  useAddUserMutation,
  useGetUserQuery,
} = usersApi;
