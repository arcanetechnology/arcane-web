/** @format */

import { useGetAllAccountOptionsQuery } from '@/services';
import { Box, Button } from '@mui/material';
import * as React from 'react';
import { useCustodyPopulate, useTransactionData } from '../../hooks';

type TransactionToolbarProps = {
  transactionId: string;
  userId: string;
};

const TransactionToolbar: React.FC<TransactionToolbarProps> = ({
  transactionId,
  userId,
}) => {
  const { operations } = useTransactionData(transactionId);
  const { data: accountOptions, error } = useGetAllAccountOptionsQuery(userId);

  const validateTransaction = () => {
    if (error) {
      // handle errors
      return;
    }
    const custody = useCustodyPopulate(accountOptions ?? [], operations);
    console.log(custody);
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
