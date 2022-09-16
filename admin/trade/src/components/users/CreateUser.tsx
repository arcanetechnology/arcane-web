/** @format */

import { Button, Typography } from '@mui/material';
import { Stack } from '@mui/system';
import * as React from 'react';

const CreateUser: React.FC = () => {
  return (
    <Button
      sx={{ zIndex: 1 }}
      onClick={() => alert('hello')}
      size="large"
      variant="contained"
    >
      Create User
    </Button>
  );
};

export default CreateUser;
