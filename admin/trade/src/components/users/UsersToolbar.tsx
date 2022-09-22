/** @format */

import { GAP } from '@/constants';
import { AccountBalance } from '@mui/icons-material';
import { Box, Button, ButtonGroup, Paper, Toolbar } from '@mui/material';
import * as React from 'react';

const UsersToolbar: React.FC = () => {
  return (
    <Box display="flex" flexDirection="row" gap={GAP}>
      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
      >
        <Button>Create Profile</Button>
        <Button>Add Account</Button>
        <Button>Create Portfolio</Button>
        <Button>Add Crypto</Button>
      </ButtonGroup>
    </Box>
  );
};

export default UsersToolbar;
