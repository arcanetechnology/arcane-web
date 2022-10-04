/** @format */

import { UserInfo, UserMenu, UsersToolbar } from '@/components';
import { GAP } from '@/constants';
import { useGetUserQuery } from '@/services';
import { UserPath } from '@/types/frontend';
import { Alert, Grid, Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const ViewUser: React.FC = () => {
  const { userId } = useParams<UserPath>();
  const {
    data: user,
    isError,
    isFetching,
    isLoading,
  } = useGetUserQuery(userId!);
  return (
    <Stack gap={GAP}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <UserInfo
            user={user!}
            isError={isError}
            isLoading={isLoading || isFetching}
          />
        </Grid>
        <Grid item xs={6} md={4}>
          <UserMenu user={user!} isError={isError} />
        </Grid>
      </Grid>
      <Outlet />
    </Stack>
  );
};

export default ViewUser;
