/** @format */

import { TextLoading } from '@/components';
import { GAP } from '@/constants';
import { useGetProfileQuery } from '@/services';
import { ProfilePath } from '@/types/frontend';
import { AccountBalance } from '@mui/icons-material';
import { Divider, Typography } from '@mui/material';
import { Box, Stack } from '@mui/system';
import * as React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const Profile: React.FC = () => {
  const { profileId, userId } = useParams<ProfilePath>();
  const {
    data: profile,
    isLoading,
    isError,
    isFetching,
  } = useGetProfileQuery({ userId, profileId } as ProfilePath);

  if (isError) throw new Error('some error occured in api call');
  if (isLoading || isFetching) return <TextLoading />;
  if (!profile) return null;
  // box is same as user box
  return (
    <Stack gap={GAP}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={GAP} flexDirection="row" alignItems="center">
          <AccountBalance />
          <Typography variant="h4">{profile.type}</Typography>
        </Box>
        <Typography variant="caption">{profile.id}</Typography>
      </Box>
      <Divider />
      <Outlet />
    </Stack>
  );
};

export default Profile;
