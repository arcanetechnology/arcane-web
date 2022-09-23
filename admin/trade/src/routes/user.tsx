/** @format */

import { UsersToolbar } from '@/components';
import { TextLoading } from '@/components/loading';
import { GAP } from '@/constants';
import { useGetUserQuery } from '@/services';
import { UserPath } from '@/types/frontend';
import { stringToAvatar } from '@/utils';
import { Delete, Edit } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import { Outlet, useLocation, useParams } from 'react-router-dom';

const User: React.FC = () => {
  const { userId } = useParams<UserPath>();
  const {
    data: user,
    isLoading,
    isError,
    isFetching,
  } = useGetUserQuery(userId!);

  if (isError) return <Alert>User not found</Alert>;
  if (isLoading || isFetching) return <TextLoading />;

  return (
    <Stack gap={GAP}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={GAP} alignItems="center" mb={2}>
          <Badge badgeContent={user?.profiles.length} color="secondary">
            <Avatar {...stringToAvatar(user?.email)} />
          </Badge>
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
      <UsersToolbar />
      <Divider />
      <Outlet />
    </Stack>
  );
};

export default User;
