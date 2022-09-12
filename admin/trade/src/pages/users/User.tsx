/** @format */

import { Button, Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';
import {
  useParams,
  NavLink as RouterLink,
  useNavigate,
} from 'react-router-dom';
import { useGetUserQuery } from '../../services/users';

const User: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const {
    data: user,
    isLoading,
    isSuccess,
  } = useGetUserQuery(params.userId as string);

  React.useEffect(() => {
    if (isSuccess) {
      // create profile entities
      // create account options
      // create portfolios
      // create crypto accounts
      // create fiat accounts
    }
  }, [isSuccess]);

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
          <Button
            onClick={() => navigate('transactions')}
            variant="contained"
            size="large"
          >
            Transaction
          </Button>
        </>
      )}
    </Stack>
  );
};

export default User;
