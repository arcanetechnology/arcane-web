/** @format */

import { GAP } from '@/constants';
import { useGetUserQuery } from '@/services';
import { UserPath } from '@/types/frontend';
import { Delete, Edit } from '@mui/icons-material';
import {
  Alert,
  Avatar,
  Box,
  Button,
  IconButton,
  Skeleton,
  Typography,
} from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const User: React.FC = () => {
  const { userId } = useParams<UserPath>();
  const {
    data: user,
    isLoading,
    isError,
    isFetching,
  } = useGetUserQuery(userId!);

  if (isError) return <Alert>User not found</Alert>;

  if (isLoading || isFetching)
    return (
      <Stack pl={2} pr={2}>
        <Skeleton height={60} width="100%" />
        <Skeleton height={60} width="100%" />
        <Skeleton height={60} width="100%" />
        <Skeleton height={60} width="100%" />
        <Skeleton height={60} width="100%" />
      </Stack>
    );
  return (
    <Stack gap={GAP}>
      <Box
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Box display="flex" gap={GAP}>
          <Avatar></Avatar>
          <Typography variant="h3" gutterBottom>
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

      {user?.profiles.length === 0 && (
        <Alert severity="error" variant="outlined">
          No Profiles attached to this user
        </Alert>
      )}
    </Stack>
  );
};

export default User;
