/** @format */

import { api } from './api';
import { GetPortfoliosResponse, GetPortfolioResponse } from '@/types/backend';
import {
  ACCOUNTS_ENDPOINT,
  PORTFOLIOS_ENDPOINT,
  PROFILES_ENDPOINT,
  USERS_ENDPOINT,
} from '@/constants';
import { AccountPath, PortfolioPath } from '@/types/frontend';

export const portfoliosApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPortfolios: build.query<GetPortfoliosResponse, AccountPath>({
      query: (path) => ({
        url: `${USERS_ENDPOINT}/${path.userId}/${PROFILES_ENDPOINT}/${path.profileId}/${ACCOUNTS_ENDPOINT}/${path.accountId}/${PORTFOLIOS_ENDPOINT}`,
        providesTags: (result = []) => [
          ...result.map(({ id }) => ({ type: 'Portfolios', id } as const)),
          {
            type: 'Portfolios' as const,
            id: 'LIST',
          },
        ],
      }),
    }),
    getPortfolio: build.query<GetPortfolioResponse, PortfolioPath>({
      query: (path) =>
        `${USERS_ENDPOINT}/${path.userId}/${PROFILES_ENDPOINT}/${path.profileId}/${ACCOUNTS_ENDPOINT}/${path.accountId}/${PORTFOLIOS_ENDPOINT}/${path.portfolioId}`,
      providesTags: (_portfolio, _err, path) => [
        { type: 'Portfolio' as const, id: path.portfolioId },
      ],
    }),
  }),
});

export const { useGetPortfoliosQuery, useGetPortfolioQuery } = portfoliosApi;
