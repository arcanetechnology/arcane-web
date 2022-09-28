/** @format */

import { ListLoading, UserMenu, UsersToolbar } from '@/components';
import { GAP } from '@/constants';
import { useGetUserQuery } from '@/services';
import { UserPath } from '@/types/frontend';
import { Money, PointOfSale } from '@mui/icons-material';
import { Alert, AppBar, Grid, Tab, Tabs } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const ViewUser: React.FC = () => {
  const { userId } = useParams<UserPath>();
  const {
    data: user,
    isError,
    isLoading,
    isFetching,
  } = useGetUserQuery(userId!);
  if (isError) return <Alert>User not found</Alert>;
  if (!user) return null;

  return (
    <Stack gap={GAP}>
      <Grid container spacing={2}>
        <Grid item xs={6} md={8}>
          <AppBar
            position="relative"
            color="inherit"
            elevation={0}
            sx={{ borderRadius: 3 }}
          >
            <Tabs>
              <Tab
                icon={<PointOfSale />}
                iconPosition="start"
                label="transaction"
              />
              <Tab icon={<Money />} iconPosition="start" label="account" />
            </Tabs>
          </AppBar>
        </Grid>
        <Grid item xs={6} md={4}>
          <UserMenu user={user} loading={isLoading || isFetching} />
        </Grid>
      </Grid>
      <Outlet />
    </Stack>
  );
};

export default ViewUser;
