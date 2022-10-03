/** @format */

import { api, getFrontendUrl } from './api';
import {
  GetPortfoliosResponse,
  GetPortfolioResponse,
  Portfolio,
  CreatePortfolioRequest,
  AccountPath,
  PortfolioPath,
} from '@/types';
import { accounts, portfolios, profiles, users } from '@/constants';

const getPortfolios = (path: AccountPath) =>
  getFrontendUrl(
    users,
    path.userId,
    profiles,
    path.profileId,
    accounts,
    path.accountId,
    portfolios
  );

const getPortfolio = ({ portfolioId, ...path }: PortfolioPath) =>
  getPortfolios(path) + '/' + portfolioId;

export const portfoliosApi = api.injectEndpoints({
  endpoints: (build) => ({
    getPortfolios: build.query<GetPortfoliosResponse, AccountPath>({
      query: (path) => ({
        url: getPortfolios(path),
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: 'Portfolios', id } as const)),
              { type: 'Portfolios', id: 'LIST' },
            ]
          : [{ type: 'Portfolios', id: 'LIST' }];
      },
    }),
    addPortfolio: build.mutation<
      Portfolio,
      CreatePortfolioRequest & AccountPath
    >({
      query({ userId, profileId, accountId, ...body }) {
        return {
          url: getPortfolios({ userId, profileId, accountId }),
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Account', 'Portfolios'],
    }),
    getPortfolio: build.query<GetPortfolioResponse, PortfolioPath>({
      query: (path) => getPortfolio(path),
      providesTags: (_portfolio, _err, path) => [
        { type: 'Portfolio' as const, id: path.portfolioId },
      ],
    }),
  }),
});

export const {
  useGetPortfoliosQuery,
  useGetPortfolioQuery,
  useAddPortfolioMutation,
} = portfoliosApi;
