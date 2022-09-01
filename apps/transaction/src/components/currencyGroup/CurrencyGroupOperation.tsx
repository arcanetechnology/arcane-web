/** @format */

import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { operationsSelector, RootState } from '../../state';

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
  return (
    <Box display="flex" flexDirection="row" gap={10} mb={2}>
      <Typography>Account ID : {operation.account}</Typography>
      <Typography>Amount : {operation.amount}</Typography>
    </Box>
  );
};

export default CurrencyGroupOperation;
