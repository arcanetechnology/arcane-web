/** @format */

import { api, getFrontendUrl } from './api';
import {
  GetCryptosResponse,
  GetCryptoResponse,
  StakeholderCryptoAccount,
  CreateCryptoRequest,
  CryptoPath,
  PortfolioPath,
} from '@/types';
import { accounts, cryptos, portfolios, profiles, users } from '@/constants';

const getCryptos = (path: PortfolioPath) =>
  getFrontendUrl(
    users,
    path.userId,
    profiles,
    path.profileId,
    accounts,
    path.accountId,
    portfolios,
    path.portfolioId,
    cryptos
  );

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
