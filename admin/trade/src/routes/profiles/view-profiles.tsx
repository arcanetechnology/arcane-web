/** @format */

import * as React from 'react';
import { useGetProfilesQuery, useUpdateProfileMutation } from '@/services';
import { UpdateProfileForm, UserPath } from '@/types';
import { Outlet, useParams } from 'react-router-dom';
import { ProfileList } from '@/components';
import { Stack } from '@mui/system';
import { GAP } from '@/constants';
import { getBackgroundColor, getHoverBackgroundColor } from '@/utils';

const ViewProfiles: React.FC = () => {
  const { userId } = useParams<UserPath>();
  const {
    data: profiles,
    isLoading,
    isError,
    isFetching,
  } = useGetProfilesQuery(userId!);

  const [updateProfile, { isLoading: updateProfileLoading }] =
    useUpdateProfileMutation();

  const handleProfileUpdate = async (
    data: UpdateProfileForm,
    profileId: string,
  ) => {
    try {
      await updateProfile({
        profileId,
        userId: userId!,
        ...data,
      }).unwrap();
    } catch (err) {
      // ! will think of this usecase.
    }
  };

  if (isError) throw new Error('some error occured in api call');

  return (
    <Stack
      gap={GAP}
      sx={{
        '& .trade-app-profile-business': {
          bgcolor: (theme) =>
            getBackgroundColor(theme.palette.success.main, theme.palette.mode),
          '&:hover': {
            bgcolor: (theme) =>
              getHoverBackgroundColor(
                theme.palette.success.main,
                theme.palette.mode,
              ),
          },
        },
        '& .trade-app-profile-personal': {
          bgcolor: (theme) =>
            getBackgroundColor(theme.palette.info.main, theme.palette.mode),
          '&:hover': {
            bgcolor: (theme) =>
              getHoverBackgroundColor(
                theme.palette.info.main,
                theme.palette.mode,
              ),
          },
        },
      }}
    >
      <Outlet />
      <ProfileList
        profiles={profiles ?? []}
        isLoading={isFetching || isLoading || updateProfileLoading}
        handleUpdate={handleProfileUpdate}
      />
    </Stack>
  );
};

export default ViewProfiles;
