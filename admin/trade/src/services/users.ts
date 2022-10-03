/** @format */

import { api } from './api';
import {
  SearchUserResponse,
  User,
  CreateUserRequest,
  GetUserResponse,
} from '@/types';
import { user, users } from '@/constants';

// TODO : refactor the admin searchUsers/getUser to its own admin app

export const usersApi = api.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query<SearchUserResponse, string>({
      query: (args) => ({
        url:
          import.meta.env.VITE_BASE_URL +
          import.meta.env.VITE_ADMIN_ENDPOINT +
          user,
        params: { email: args },
        responseHandler: (res) => res.text(),
      }),
      extraOptions: {
        maxRetries: 0,
      },
    }),
    // trade-admin
    addUser: build.mutation<User, CreateUserRequest>({
      query(body) {
        return {
          url: users,
          method: 'POST',
          body,
        };
      },
    }),
    getUser: build.query<GetUserResponse, string>({
      query: (id) => `${users}/${id}`,
      providesTags: (_user, _err, id) => [{ type: 'User', id }],
    }),
    deleteUser: build.mutation<void, string>({
      query: (id) => ({
        url: `${users}/${id}`,
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
