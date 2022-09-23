/** @format */

import { useRedirectAuth } from '@/hooks';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

const Auth: React.FC = () => {
  useRedirectAuth(import.meta.env.VITE_GOOGLE_TENANT_ID);
  return (
    <Box
      position={'absolute'}
      top={'50%'}
      left={'50%'}
      sx={{
        transform: 'translate(-50%,-50%)',
        textAlign: 'center',
      }}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <img src="https://c.tenor.com/3kLh3ryQQyoAAAAC/zootopia-sloth.gif" />
      <Typography variant="subtitle1">...</Typography>
    </Box>
  );
};

export default Auth;
