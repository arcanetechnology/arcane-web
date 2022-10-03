/** @format */

import { PortfolioList } from '@/components';
import { useGetPortfoliosQuery } from '@/services';
import { AccountPath } from '@/types/frontend';
import * as React from 'react';
import { Outlet, useParams } from 'react-router-dom';
import { Stack } from '@mui/material';
import { GAP } from '@/constants';

const ViewPortfolios: React.FC = () => {
  const { userId, profileId, accountId } = useParams<AccountPath>();
  const {
    data: portfolios,
    isLoading,
    isError,
    isFetching,
  } = useGetPortfoliosQuery({ userId, profileId, accountId } as AccountPath);

  if (isError) throw new Error('some error occured in portfolios api call');
  if (!portfolios) return null;
  return (
    <Stack gap={GAP}>
      <Outlet />
      <PortfolioList portfolios={portfolios} />
    </Stack>
  );
};

export default ViewPortfolios;
