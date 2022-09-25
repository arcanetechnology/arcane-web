/** @format */

import * as React from 'react';
import { useGetCustodiesQuery } from '@/services';
import { Stack } from '@mui/system';
import { GAP } from '@/constants';
import { Box, LinearProgress } from '@mui/material';
import { CustodyList } from '@/components';
import { Outlet } from 'react-router-dom';

const ViewCustodies: React.FC = () => {
  const {
    data: custodies,
    isLoading,
    isError,
    isFetching,
  } = useGetCustodiesQuery();

  if (isError) throw new Error('some error occured in api call');
  if (!custodies) return null;

  return (
    <Stack gap={GAP}>
      <Outlet />
      <CustodyList custodies={custodies} />
      <Box height={10}>{(isLoading || isFetching) && <LinearProgress />}</Box>
    </Stack>
  );
};

export default ViewCustodies;
