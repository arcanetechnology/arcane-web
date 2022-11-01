/** @format */

import { GAP } from '@/constants';
import { useGetProfileQuery } from '@/services';
import { ProfilePath } from '@/types/frontend';
import { AccountBalance } from '@mui/icons-material';
import { Typography, Chip, Skeleton } from '@mui/material';
import { Box, Stack } from '@mui/system';
import * as React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const ViewProfile: React.FC = () => {
  const { profileId, userId } = useParams<ProfilePath>();
  const {
    data: profile,
    isLoading,
    isError,
    isFetching,
  } = useGetProfileQuery({ userId, profileId } as ProfilePath);

  if (isError) throw new Error('some error occured in api call');

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
          {isLoading || isFetching ? (
            <Skeleton width={400} height={50} />
          ) : (
            <Typography variant="h4">{profile!.alias}</Typography>
          )}

          {isLoading || isFetching ? (
            <Skeleton width={400} height={50} />
          ) : (
            <Chip
              label={profile!.type}
              color={profile!.type === 'BUSINESS' ? 'success' : 'info'}
            />
          )}
        </Box>

        {isLoading || isFetching ? (
          <Skeleton width={400} height={50} />
        ) : (
          <Typography variant="caption">{profile!.id}</Typography>
        )}
      </Box>
      <Outlet />
    </Stack>
  );
};

export default ViewProfile;
