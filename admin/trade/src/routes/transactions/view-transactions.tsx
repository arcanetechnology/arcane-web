/** @format */

import { ListTransaction } from '@/components/transactions';
import { GAP } from '@/constants';
import { useGetTransactionsQuery } from '@/services/transactions';
import { Stack } from '@mui/system';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

const ViewTransactions: React.FC = () => {
  return (
    <Stack gap={GAP}>
      <Outlet />
    </Stack>
  );
};

export default ViewTransactions;
