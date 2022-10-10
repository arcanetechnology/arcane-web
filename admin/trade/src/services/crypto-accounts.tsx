/** @format */

import { api, getFrontendUrl } from './api';
import {
  ProfilePath,
  GetCryptoAccountsResponse,
  StakeholderCryptoAccount,
  CreateCryptoAccountRequest,
} from '@/types';
import { cryptoAccounts, profiles, users } from '@/constants';

const getCryptoAccounts = (path: ProfilePath) =>
  getFrontendUrl(users, path.userId, profiles, path.profileId, cryptoAccounts);

export const cryptoAccountsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCryptoAccounts: build.query<GetCryptoAccountsResponse, ProfilePath>({
      query: (path) => ({
        url: getCryptoAccounts(path),
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(
                ({ id }) => ({ type: 'CryptoAccounts', id } as const),
              ),
              { type: 'CryptoAccounts', id: 'LIST' },
            ]
          : [{ type: 'CryptoAccounts', id: 'LIST' }];
      },
    }),
    createCryptoAccount: build.mutation<
      StakeholderCryptoAccount,
      CreateCryptoAccountRequest & ProfilePath
    >({
      query({ userId, profileId, ...body }) {
        return {
          url: getCryptoAccounts({ userId, profileId }),
          method: 'POST',
          body,
        };
      },
      extraOptions: {
        maxRetries: 0,
      },
      invalidatesTags: ['CryptoAccounts'],
    }),
  }),
});

export const { useCreateCryptoAccountMutation, useGetCryptoAccountsQuery } =
  cryptoAccountsApi;
