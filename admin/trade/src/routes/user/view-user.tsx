/** @format */

import { UserInfo, UserMenu, UsersToolbar } from '@/components';
import { GAP } from '@/constants';
import { useGetUserQuery } from '@/services';
import { UserPath } from '@/types';
import { Box } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const ViewUser: React.FC = () => {
  const { userId } = useParams<UserPath>();
  const {
    data: user,
    isError,
    isFetching,
    isSuccess,
    isLoading,
  } = useGetUserQuery(userId!);
  return (
    <Stack gap={GAP}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <UserInfo
          user={user!}
          isError={isError}
          isLoading={isLoading || isFetching}
        />
        <UserMenu userId={userId!} isError={isError} isSuccess={isSuccess} />
      </Box>
      <Outlet />
    </Stack>
  );
};

export default ViewUser;
