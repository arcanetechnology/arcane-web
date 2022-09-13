/** @format */

import { useGetAllAccountOptionsQuery } from '@/services';
import { Box, Button } from '@mui/material';
import * as React from 'react';
import {
  useCustodyPopulate,
  useTransactionData,
  useZeroSum,
} from '../../hooks';
import { toast } from 'react-toastify';

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

    const sum = useZeroSum(operations);
    if (sum !== 0) {
      toast('sum is not equal to zero', { type: 'error' });
      return;
    }
    toast('sum equals to zero', { type: 'success' });
    const custody = useCustodyPopulate(accountOptions ?? [], operations);
    // create rows
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
