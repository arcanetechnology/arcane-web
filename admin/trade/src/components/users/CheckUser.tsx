/** @format */

import { LoadingButton } from '@mui/lab';
import * as React from 'react';
import { AppRegistrationRounded, Save } from '@mui/icons-material';
import { Button } from '@mui/material';
import { useAddUserMutation, useGetUserQuery } from '@/services';
import { NavLink } from 'react-router-dom';
import { Box } from '@mui/system';
import { GAP } from '@/constants';

type CheckUserProps = {
  userId: string;
};

const CheckUser: React.FC<CheckUserProps> = ({ userId }) => {
  const {
    data: user,
    isLoading,
    isFetching,
    isError,
    isSuccess,
  } = useGetUserQuery(userId);

  const [registerUser, { isLoading: isPostLoading }] = useAddUserMutation();

  const handleRegisterUser = async () => {
    try {
      await registerUser({ id: userId }).unwrap();
    } catch (err) {}
  };

  if (isFetching || isLoading) return <LoadingButton loading />;

  return (
    <Box display="flex" flexDirection="row" gap={GAP}>
      {isSuccess && (
        <LoadingButton
          loading={isLoading || isFetching}
          loadingPosition="start"
          size="small"
          startIcon={<Save />}
          variant="contained"
          component={NavLink}
          to={user?.id as string}
          LinkComponent={NavLink}
        >
          View User
        </LoadingButton>
      )}
      {isError && (
        <LoadingButton
          loading={isPostLoading}
          disabled={isPostLoading}
          onClick={handleRegisterUser}
          variant="contained"
          startIcon={<AppRegistrationRounded />}
        >
          Register User
        </LoadingButton>
      )}
    </Box>
  );
};

export default CheckUser;
