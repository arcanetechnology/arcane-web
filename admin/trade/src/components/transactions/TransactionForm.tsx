/** @format */

import { GAP } from '@/constants';
import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

// TODO: get virtual account data dropdown
// TODO; get crypto account data dropdown
// TODO: get fiat account data dropdown

const TransactionForm: React.FC = () => {
  return (
    <Box component="form">
      <Box display="flex" flexDirection="row" gap={GAP}>
        <TextField name="account" label="Acount ID" />
        <TextField name="amount" label="Amount" />
      </Box>
    </Box>
  );
};

export default TransactionForm;
