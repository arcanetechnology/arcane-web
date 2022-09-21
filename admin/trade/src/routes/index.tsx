/** @format */

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

const Index: React.FC = () => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        height: '100%',
        justifyContent: 'center',
      }}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <Typography variant="h4">Welcome to trade admin</Typography>
      <Typography>Select a user to do transactions</Typography>
    </Box>
  );
};

export default Index;
