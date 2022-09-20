/** @format */

import { GAP } from '@/constants';
import { useGetUserQuery } from '@/services';
import { UserPath } from '@/types/frontend';
import { Alert, Box, Button, Skeleton, Typography } from '@mui/material';
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
      <Typography variant="h3">
        {user?.email === '' ? 'No Email' : user?.email}
      </Typography>
      <Box gap={GAP} display="flex">
        <Button variant="contained">Edit</Button>
        <Button color="secondary" variant="contained">
          Delete
        </Button>
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
