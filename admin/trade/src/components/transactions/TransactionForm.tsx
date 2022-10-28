/** @format */

import { TextField } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';

const TransactionForm: React.FC = () => {
  return (
    <Box component="form">
      <Box display="flex" flexDirection="row">
        <TextField name="Account" />
        <TextField name="Amount" />
      </Box>
    </Box>
  );
};

export default TransactionForm;
