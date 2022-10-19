/** @format */

import * as React from 'react';
import {
  DataGrid,
  GridCellModesModel,
  GridCellParams,
  GridColumns,
  GridRowModel,
} from '@mui/x-data-grid';
import { Transaction } from '@/types';
import { Typography } from '@mui/material';

type ListTransactionsProps = {
  transactions: Array<Omit<Transaction, 'operations'>>;
  loading?: boolean;
};

const ListTransactions: React.FC<ListTransactionsProps> = ({
  transactions,
  loading = false,
}) => {
  return <Typography>Transaction LIst</Typography>;
};

export default ListTransactions;
