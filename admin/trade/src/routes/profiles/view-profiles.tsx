/** @format */

import * as React from 'react';
import { useGetProfilesQuery } from '@/services';
import { UserPath } from '@/types/frontend';
import { Outlet, useParams } from 'react-router-dom';
import { ListLoading, Loading, ProfileList } from '@/components';
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
        isLoading={isFetching || isLoading}
      />
    </Stack>
  );
};

export default ViewProfiles;
