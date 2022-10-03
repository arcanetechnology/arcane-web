/** @format */

import { LoadingButton } from '@mui/lab';
import * as React from 'react';
import { Save } from '@mui/icons-material';
import { Button } from '@mui/material';

type CheckUserProps = {
  userId?: string;
};

const CheckUser: React.FC<CheckUserProps> = ({ userId = null }) => {
  if (!userId) return <Button>Create User</Button>;
  return (
    <LoadingButton
      loading
      loadingPosition="start"
      startIcon={<Save />}
      variant="contained"
    >
      View User
    </LoadingButton>
  );
};

export default CheckUser;
