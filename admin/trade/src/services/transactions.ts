/** @format */

import { api, getFrontendUrl } from './api';
import { transactions } from '@/constants';
import {
  CreateTransactionRequest,
  GetTransactionResponse,
  GetTransactionsResponse,
  Transaction,
  TransactionPath,
} from '@/types';

const getTransactionsUrl = () => getFrontendUrl(transactions);

const getTransactionUrl = (path: TransactionPath) =>
  getTransactionsUrl() + '/' + path.transactionId;

export const transactionApi = api.injectEndpoints({
  endpoints: (build) => ({
    getTransactions: build.query<GetTransactionsResponse, void>({
      query: () => transactions,
      providesTags: (result) => {
        return result
          ? [
              ...result.map(
                ({ transactionId }) =>
                  ({ type: 'Transactions', transactionId } as const),
              ),
              { type: 'Transactions', id: 'LIST' },
            ]
          : [{ type: 'Transactions', id: 'LIST' }];
      },
    }),
    getTransaction: build.query<GetTransactionResponse, TransactionPath>({
      query: (path) => ({
        url: getTransactionUrl(path),
      }),
    }),
    transaction: build.mutation<Transaction, CreateTransactionRequest>({
      query(body) {
        return {
          url: getTransactionsUrl(),
          method: 'POST',
          body,
        };
      },
      extraOptions: {
        maxRetries: 0,
      },
      invalidatesTags: ['Transactions'],
    }),
  }),
});

export const {
  useGetTransactionQuery,
  useGetTransactionsQuery,
  useTransactionMutation,
} = transactionApi;
