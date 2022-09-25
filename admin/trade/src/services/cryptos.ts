/** @format */

import { api } from './api';
import {
  GetCryptosResponse,
  GetCryptoResponse,
  StakeholderCryptoAccount,
  CreateCryptoRequest,
} from '@/types/backend';
import {
  ACCOUNTS_ENDPOINT,
  CRYPTOS_ENDPOINT,
  PORTFOLIOS_ENDPOINT,
  PROFILES_ENDPOINT,
  USERS_ENDPOINT,
} from '@/constants';
import { CryptoPath, PortfolioPath } from '@/types/frontend';

const getCryptos = (path: PortfolioPath) =>
  `${USERS_ENDPOINT}/${path.userId}/${PROFILES_ENDPOINT}/${path.profileId}/${ACCOUNTS_ENDPOINT}/${path.accountId}/${PORTFOLIOS_ENDPOINT}/${path.portfolioId}/${CRYPTOS_ENDPOINT}`;

const getCrypto = ({ cryptoId, ...path }: CryptoPath) =>
  getCryptos(path) + '/' + cryptoId;

export const cryptosApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCryptos: build.query<GetCryptosResponse, PortfolioPath>({
      query: (path) => ({
        url: getCryptos(path),
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: 'Cryptos', id } as const)),
              { type: 'Cryptos', id: 'LIST' },
            ]
          : [{ type: 'Cryptos', id: 'LIST' }];
      },
    }),
    addCrypto: build.mutation<
      StakeholderCryptoAccount,
      CreateCryptoRequest & PortfolioPath
    >({
      query({ userId, profileId, accountId, portfolioId, ...body }) {
        return {
          url: getCryptos({ userId, profileId, accountId, portfolioId }),
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Portfolio', 'Cryptos'],
    }),
    getCrypto: build.query<GetCryptoResponse, CryptoPath>({
      query: (path) => getCrypto(path),
      providesTags: (_crypto, _err, path) => [
        { type: 'Crypto' as const, id: path.cryptoId },
      ],
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoQuery, useAddCryptoMutation } =
  cryptosApi;
