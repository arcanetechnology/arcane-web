/** @format */

import { api } from './api';
import {
  GetProfilesResponse,
  GetProfileResponse,
  Profile,
  CreateProfileRequest,
  ProfileItem,
} from '@/types/backend';
import { PROFILES_ENDPOINT, USERS_ENDPOINT } from '@/constants';
import { ProfilePath, UserPath } from '@/types/frontend';

const getProfilesUrl = (userId: string) =>
  `${USERS_ENDPOINT}/${userId}/${PROFILES_ENDPOINT}`;

const getProfileUrl = (userId: string, profileId: string) =>
  getProfilesUrl(userId) + '/' + profileId;

export const profilesApi = api.injectEndpoints({
  endpoints: (build) => ({
    getProfiles: build.query<GetProfilesResponse, string>({
      query: (args) => ({
        url: getProfilesUrl(args),
      }),
      providesTags: (result) => {
        return result
          ? [
              ...result.map(({ id }) => ({ type: 'Profiles', id } as const)),
              { type: 'Profiles', id: 'LIST' },
            ]
          : [{ type: 'Profiles', id: 'LIST' }];
      },
    }),
    getProfile: build.query<GetProfileResponse, ProfilePath>({
      query: (path) => getProfileUrl(path.userId, path.profileId),
      providesTags: (_profile, _err, path) => [
        { type: 'Profile', id: path.profileId },
      ],
    }),

    addProfile: build.mutation<Profile, CreateProfileRequest & UserPath>({
      query({ userId, ...body }) {
        return {
          url: getProfilesUrl(userId),
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['User', 'Profiles'],
    }),
  }),
});

export const {
  useGetProfilesQuery,
  useGetProfileQuery,
  useAddProfileMutation,
} = profilesApi;
