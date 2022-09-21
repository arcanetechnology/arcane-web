/** @format */

import { api } from './api';
import { GetProfilesResponse, GetProfileResponse } from '@/types/backend';
import { PROFILES_ENDPOINT, USERS_ENDPOINT } from '@/constants';
import { ProfilePath } from '@/types/frontend';

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
    getProfile: build.query<GetProfileResponse, ProfilePath>({
      query: (path) =>
        `${USERS_ENDPOINT}/${path.userId}/${PROFILES_ENDPOINT}/${path.profileId}`,
      providesTags: (_profile, _err, path) => [
        { type: 'Profile', id: path.profileId },
      ],
    }),
  }),
});

export const { useGetProfilesQuery, useGetProfileQuery } = profilesApi;
