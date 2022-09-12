/** @format */

import { Box, Button } from '@mui/material';
import * as React from 'react';
import { useTransactionData } from '../../hooks';

type TransactionToolbarProps = {
  transactionId: string;
};

const TransactionToolbar: React.FC<TransactionToolbarProps> = ({
  transactionId,
}) => {
  const { accounts, operations, transaction, groups } =
    useTransactionData(transactionId);

  const validateTransaction = () => {
    // TODO validate this transaction
    // TODO error array {}
  };

  return (
    <Box>
      <Button onClick={validateTransaction} variant="contained">
        Validate Transaction
      </Button>
    </Box>
  );
};
export default TransactionToolbar;
