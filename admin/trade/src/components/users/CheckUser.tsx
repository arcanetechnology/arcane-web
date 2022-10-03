/** @format */

import { LoadingButton } from '@mui/lab';
import * as React from 'react';
import { Save } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useGetUserQuery } from '@/services';
import { NavLink } from 'react-router-dom';

type CheckUserProps = {
  userId?: string;
};

const CheckUser: React.FC<CheckUserProps> = ({ userId = null }) => {
  if (!userId) return <Button>Create User</Button>;

  const { data: user, isLoading, isFetching } = useGetUserQuery(userId);

  if (!user) return <Button>Create User</Button>;

  return (
    <LoadingButton
      loading={isLoading || isFetching}
      loadingPosition="start"
      startIcon={<Save />}
      variant="contained"
      component={NavLink}
      to={user?.id}
      LinkComponent={NavLink}
    >
      View User
    </LoadingButton>
  );
};

export default CheckUser;
