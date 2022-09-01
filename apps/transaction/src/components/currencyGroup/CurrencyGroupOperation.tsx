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
      <Typography>{account?.label}</Typography>
      <Typography>Account ID : {operation.account}</Typography>
      <Typography>Amount : {operation.amount}</Typography>
      <Typography>Balance : {account?.balance}</Typography>
    </Box>
  );
};

export default CurrencyGroupOperation;
