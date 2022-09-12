/** @format */

import { Alert, Skeleton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { transactionsSelector, useTradeSelector } from '../../../state';
import {
  CreateGroup,
  TransactionToolbar,
  GroupList,
} from '../../../components';

const Transaction: React.FC = () => {
  const params = useParams();
  const transaction = useTradeSelector((s) =>
    transactionsSelector.selectById(s, params.transactionId as string)
  );

  if (!transaction) {
    return (
      <Box>
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
        <Skeleton height={40} />
      </Box>
    );
  }

  return (
    <Stack gap={2}>
      <Typography variant="h2">{transaction.name}</Typography>
      {transaction.status === 'draft' && (
        <Alert>Transaction is in Draft Mode</Alert>
      )}
      {transaction.status === 'draft' && (
        <TransactionToolbar transactionId={transaction.id} />
      )}
      <GroupList groups={transaction.groups || []} />
      {transaction.status === 'draft' && (
        <CreateGroup userId={params.userId!} id={transaction.id} />
      )}
    </Stack>
  );
};

export default Transaction;
