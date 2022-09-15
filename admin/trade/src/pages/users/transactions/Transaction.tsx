/** @format */

import { Alert, Skeleton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { transactionsSelector, useTradeSelector } from '@/state';
import {
  CreateGroup,
  TransactionToolbar,
  GroupList,
  GroupsAndOperations,
} from '@/components';
import { useGetAllAccountOptionsQuery } from '@/services';

const Transaction: React.FC = () => {
  const params = useParams();
  const transaction = useTradeSelector((s) =>
    transactionsSelector.selectById(s, params.transactionId as string)
  );

  const { data: accountOptions, error } = useGetAllAccountOptionsQuery(
    params.userId as string
  );

  if (!transaction || error) {
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
        <TransactionToolbar
          transactionId={transaction.id}
          userId={params.userId!}
        />
      )}
      {/* <GroupList groups={transaction.groups || []} /> */}
      <GroupsAndOperations
        groups={transaction.groups || []}
        accountOptions={accountOptions ?? []}
      />
      {/* {transaction.status === 'draft' && (
        <CreateGroup userId={params.userId!} id={transaction.id} />
      )} */}
    </Stack>
  );
};

export default Transaction;
