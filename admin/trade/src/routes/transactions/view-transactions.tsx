/** @format */

import { ListTransaction } from '@/components/transactions';
import { GAP } from '@/constants';
import { useGetTransactionsQuery } from '@/services/transactions';
import { Stack } from '@mui/system';
import * as React from 'react';
import { Outlet } from 'react-router-dom';

const ViewTransactions: React.FC = () => {
  const { data, isLoading, isFetching, isError } = useGetTransactionsQuery();
  if (isError) throw new Error('error occured in fetching transactions');
  return (
    <Stack gap={GAP}>
      {/* <ListTransaction transactions={data!} loading={isLoading || isFetching} /> */}
      <Outlet />
    </Stack>
  );
};

export default ViewTransactions;
