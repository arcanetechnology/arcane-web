/** @format */

import * as React from 'react';
import { CreateTransaction, TransactionList } from '@/components';
import { Stack } from '@mui/system';
import { Box } from '@mui/material';

const Transactions: React.FC = () => {
  return (
    <Stack>
      <Box mb={2}>
        <CreateTransaction />
      </Box>
      <TransactionList />
    </Stack>
  );
};

export default Transactions;
