/** @format */

import { api, getFrontendUrl } from './api';
import {
  ProfilePath,
  GetCryptoAccountsResponse,
  StakeholderCryptoAccount,
  CreateCryptoAccountRequest,
  UpdateCryptoAccountRequest,
  CryptoAccountPath,
} from '@/types';
import { cryptoAccounts, profiles, users } from '@/constants';

const getCryptoAccounts = (path: ProfilePath) =>
  getFrontendUrl(users, path.userId, profiles, path.profileId, cryptoAccounts);

const getCryptoAccount = ({ cryptoId, ...path }: CryptoAccountPath) =>
  getCryptoAccounts(path) + `/${cryptoId}`;

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
    updateCryptoAccount: build.mutation<
      StakeholderCryptoAccount,
      UpdateCryptoAccountRequest & CryptoAccountPath
    >({
      query({ userId, profileId, cryptoId, ...body }) {
        return {
          url: getCryptoAccount({ userId, profileId, cryptoId }),
          method: 'PUT',
          body,
        };
      },
      // since we are not diving deep into single crypto view no need to create or update sigle entity
      invalidatesTags: ['CryptoAccounts'],
    }),
  }),
});

export const {
  useCreateCryptoAccountMutation,
  useGetCryptoAccountsQuery,
  useUpdateCryptoAccountMutation,
} = cryptoAccountsApi;
