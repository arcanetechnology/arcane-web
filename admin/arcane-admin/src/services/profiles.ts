/** @format */

import { api, getFrontendUrl } from './api';
import {
  GetProfilesResponse,
  GetProfileResponse,
  Profile,
  CreateProfileRequest,
  ProfilePath,
  UserPath,
} from '@/types';
import { profiles, users } from '@/constants';

const getProfilesUrl = (userId: string) =>
  getFrontendUrl(users, userId, profiles);

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
