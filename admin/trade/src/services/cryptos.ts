/** @format */

import { api } from './api';
import { GetCryptosResponse, GetCryptoResponse } from '@/types/backend';
import {
  ACCOUNTS_ENDPOINT,
  CRYPTOS_ENDPOINT,
  PORTFOLIOS_ENDPOINT,
  PROFILES_ENDPOINT,
  USERS_ENDPOINT,
} from '@/constants';
import { CryptoPath, PortfolioPath } from '@/types/frontend';

export const cryptosApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCryptos: build.query<GetCryptosResponse, PortfolioPath>({
      query: (path) => ({
        url: `${USERS_ENDPOINT}/${path.userId}/${PROFILES_ENDPOINT}/${path.profileId}/${ACCOUNTS_ENDPOINT}/${path.accountId}/${PORTFOLIOS_ENDPOINT}/${path.portfolioId}/${CRYPTOS_ENDPOINT}`,
        providesTags: (result = []) => [
          ...result.map(({ id }) => ({ type: 'Cryptos', id } as const)),
          {
            type: 'Cryptos' as const,
            id: 'LIST',
          },
        ],
      }),
    }),
    getCrypto: build.query<GetCryptoResponse, CryptoPath>({
      query: (path) =>
        `${USERS_ENDPOINT}/${path.userId}/${PROFILES_ENDPOINT}/${path.profileId}/${ACCOUNTS_ENDPOINT}/${path.accountId}/${PORTFOLIOS_ENDPOINT}/${path.portfolioId}/${CRYPTOS_ENDPOINT}/${path.cryptoId}`,
      providesTags: (_crypto, _err, path) => [
        { type: 'Crypto' as const, id: path.cryptoId },
      ],
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoQuery } = cryptosApi;
