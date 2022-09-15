/** @format */

import { Box, Button, Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserQuery } from '@/services';

const User: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useGetUserQuery(params.userId as string);

  return (
    <Stack gap={2}>
      {isLoading && (
        <>
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
          <Skeleton height={60} />
        </>
      )}
      {isSuccess && (
        <>
          <Typography variant="h3">{user.email}</Typography>
          <Box>
            <Button
              onClick={() => navigate('transactions')}
              variant="contained"
              size="large"
            >
              Transaction
            </Button>
          </Box>
        </>
      )}
    </Stack>
  );
};

export default User;
