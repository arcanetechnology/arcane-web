/** @format */

import * as React from 'react';
import { useGetProfilesQuery } from '@/services';
import { UserPath } from '@/types/frontend';
import { Outlet, useParams } from 'react-router-dom';
import { ListLoading, ProfileList } from '@/components';
import { Stack } from '@mui/system';
import { GAP } from '@/constants';
import { Box, LinearProgress } from '@mui/material';

const ViewProfiles: React.FC = () => {
  const { userId } = useParams<UserPath>();
  const {
    data: profiles,
    isLoading,
    isError,
    isFetching,
  } = useGetProfilesQuery(userId!);

  if (isError) throw new Error('some error occured in api call');
  if (!profiles) return null;

  return (
    <Stack gap={GAP}>
      <Outlet />
      <Box height={10}>{(isLoading || isFetching) && <LinearProgress />}</Box>
      <ProfileList profiles={profiles} />
    </Stack>
  );
};

export default ViewProfiles;
