/** @format */

import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import {
  currencyGroupsSelector,
  transactionsSelector,
  useTradeSelector,
} from '@/state';
import { AddOperation, OperationList } from '@/components';
import * as React from 'react';
import { useParams } from 'react-router-dom';

const Group: React.FC = () => {
  const params = useParams();

  const currencyGroup = useTradeSelector((s) =>
    currencyGroupsSelector.selectById(s, params.id as string)
  );

  const transaction = useTradeSelector((s) =>
    transactionsSelector.selectById(s, params.transactionId as string)
  );

  if (!currencyGroup || !transaction) {
    return null;
  }
  return (
    <Stack gap={2}>
      <Typography variant="h2">{currencyGroup.currency}</Typography>
      <OperationList status={transaction.status} group={currencyGroup} />
      <AddOperation userId={params.userId!} groupId={currencyGroup.id} />
    </Stack>
  );
};

export default Group;
