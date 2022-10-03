/** @format */

import { api } from './api';
import { GetCustodiesResponse, GetCustodyResponse } from '@/types';
import { custodies } from '@/constants';

export const custodyApi = api.injectEndpoints({
  endpoints: (build) => ({
    getCustodies: build.query<GetCustodiesResponse, void>({
      query: () => custodies,
      providesTags: (result = []) => [
        ...result.map(({ id }) => ({ type: 'Custodies', id } as const)),
        {
          type: 'Custodies' as const,
          id: 'LIST',
        },
      ],
    }),

    getCustody: build.query<GetCustodyResponse, string>({
      query: (path) => `${custodies}/${path}`,
      providesTags: (_custody, _err, path) => [
        { type: 'Custody' as const, id: path },
      ],
    }),
  }),
});

export const { useGetCustodiesQuery, useGetCustodyQuery } = custodyApi;
