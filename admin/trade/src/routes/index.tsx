/** @format */

import { Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

const Index: React.FC = () => {
  return (
    <Stack>
      <Box>
        <Typography variant="h4">Welcome to trade admin</Typography>
        <Typography>Select a user to do transactions</Typography>
      </Box>
    </Stack>
  );
};

export default Index;
