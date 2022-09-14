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
import {
  currencyGroupCustodyAdded,
  currencyGroupOperationAdded,
  operationAdded,
  useTradeDispatch,
} from '@/state';
import { nanoid } from '@reduxjs/toolkit';

type TransactionToolbarProps = {
  transactionId: string;
  userId: string;
};

const TransactionToolbar: React.FC<TransactionToolbarProps> = ({
  transactionId,
  userId,
}) => {
  const { operations, groups } = useTransactionData(transactionId);
  const { data: accountOptions, error } = useGetAllAccountOptionsQuery(userId);
  const dispatch = useTradeDispatch();

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

    // remove existing custody accounts from the group
    // update the currency group depending on what operation has been removed.

    const custody = useCustodyPopulate(accountOptions ?? [], operations);

    Object.keys(custody).forEach((curr) => {
      const group = groups.find((g) => g.currency === curr);
      if (!group) {
        return;
      }
      const operationRecord = custody[curr];
      Object.keys(operationRecord).forEach((o) => {
        const custodyOperation = dispatch(
          operationAdded({
            id: nanoid(),
            amount: operationRecord[o],
            account: o,
          })
        );

        dispatch(
          currencyGroupCustodyAdded({
            id: group.id,
            operation: custodyOperation.payload.id,
            amount: custodyOperation.payload.amount,
          })
        );
      });
    });
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
