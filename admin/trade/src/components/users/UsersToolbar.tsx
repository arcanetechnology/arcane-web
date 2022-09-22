/** @format */

import { GAP } from '@/constants';
import { Box, Button, ButtonGroup, Paper, Toolbar } from '@mui/material';
import * as React from 'react';
import { TransactionCreate } from '../transaction';

const UsersToolbar: React.FC = () => {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      gap={GAP}
    >
      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
      >
        <Button>Create Profile</Button>
        <Button>Add Account</Button>
        <Button>Create Portfolio</Button>
        <Button>Add Crypto</Button>
      </ButtonGroup>
      <TransactionCreate />
    </Box>
  );
};

export default UsersToolbar;
