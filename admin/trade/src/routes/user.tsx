/** @format */

import { useGetUserQuery } from '@/services';
import { Alert, Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const User: React.FC = () => {
  const params = useParams<{ userId: string }>();
  const {
    data: User,
    isLoading,
    isError,
    isFetching,
  } = useGetUserQuery(params.userId!);

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
    <Stack pl={2} pr={2}>
      <Typography variant="h3">
        {User?.email === '' ? 'No Email' : User?.email}
      </Typography>
    </Stack>
  );
};

export default User;
