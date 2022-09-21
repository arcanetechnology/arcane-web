/** @format */

import { ListLoading } from '@/components/loading';
import { GAP } from '@/constants';
import { useGetUserQuery } from '@/services';
import { UserPath } from '@/types/frontend';
import { stringToAvatar } from '@/utils';
import { Delete, Edit } from '@mui/icons-material';
import { Alert, Avatar, Box, IconButton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import { Outlet, useParams } from 'react-router-dom';

const User: React.FC = () => {
  const { userId } = useParams<UserPath>();
  const {
    data: user,
    isLoading,
    isError,
    isFetching,
  } = useGetUserQuery(userId!);

  if (isError) return <Alert>User not found</Alert>;
  if (isLoading || isFetching) return <ListLoading />;
  return (
    <Stack gap={GAP}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={GAP} alignItems="center" mb={2}>
          <Avatar {...stringToAvatar(user?.email)} />
          <Typography variant="h3">
            {user?.email === '' ? 'No Email' : user?.email}
          </Typography>
        </Box>
        <Box gap={GAP} display="flex">
          <IconButton aria-label="edit-user" color="info">
            <Edit />
          </IconButton>
          <IconButton aria-label="delete-user" color="error">
            <Delete />
          </IconButton>
        </Box>
      </Box>

      <Outlet />
    </Stack>
  );
};

export default User;
