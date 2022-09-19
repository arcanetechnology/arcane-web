/** @format */

import { Box, Typography } from '@mui/material';
import { Container, Stack } from '@mui/system';
import * as React from 'react';
import { useRouteError } from 'react-router-dom';

const ErrorPage: React.FC = () => {
  const error: any = useRouteError();
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
      <Typography variant="h1">Oops!</Typography>
      <Typography variant="subtitle1">
        Sorry, an unexpected error has occured.
      </Typography>
      <Typography variant="subtitle2">
        {error.statusText || error.message}
      </Typography>
    </Box>
  );
};

export default ErrorPage;
