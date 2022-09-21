/** @format */

import { api } from './api';
import { GetProfilesResponse } from '@/types/backend';
import { PROFILES_ENDPOINT, USERS_ENDPOINT } from '@/constants';

export const profilesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfiles: build.query<GetProfilesResponse, string>({
      query: (args) => ({
        url: `${USERS_ENDPOINT}/${args}/${PROFILES_ENDPOINT}`,
        providesTags: (result = []) => [
          ...result.map(({ id }) => ({ type: 'Profiles', id } as const)),
          {
            type: 'Profiles' as const,
            id: 'LIST',
          },
        ],
      }),
    }),
  }),
});

export const { useGetProfilesQuery } = profilesApi;
