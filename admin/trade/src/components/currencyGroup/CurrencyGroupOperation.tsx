/** @format */

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { accountsSelector, operationsSelector, RootState } from '../../state';

type CurrencyGroupOperationProps = {
  id: string;
};

const CurrencyGroupOperation: React.FC<CurrencyGroupOperationProps> = ({
  id,
}) => {
  const operation = useSelector((s: RootState) =>
    operationsSelector.selectById(s, id)
  );

  if (!operation) {
    return null;
  }

  const account = useSelector((s: RootState) =>
    accountsSelector.selectById(s, operation.account)
  );
  return (
    <Box display="flex" flexDirection="row" gap={5} mb={1}>
      <Typography variant="h6">{account?.label}</Typography>
      <Typography variant="h6">Account ID : {operation.account}</Typography>
      <Typography variant="h6">Amount : {operation.amount}</Typography>
      <Typography variant="h6">Balance : {account?.balance}</Typography>
    </Box>
  );
};

export default CurrencyGroupOperation;
