/** @format */

import { ListLoading, PortfolioList } from '@/components';
import { useGetPortfoliosQuery } from '@/services';
import { AccountPath } from '@/types/frontend';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@mui/material';

const Portfolios: React.FC = () => {
  const { userId, profileId, accountId } = useParams<AccountPath>();
  const {
    data: portfolios,
    isLoading,
    isError,
    isFetching,
  } = useGetPortfoliosQuery({ userId, profileId, accountId } as AccountPath);

  if (isError) throw new Error('some error occured in portfolios api call');
  if (isLoading || isFetching) return <ListLoading />;
  if (!portfolios) return null;
  return (
    <Stack>
      <PortfolioList portfolios={portfolios} />
    </Stack>
  );
};

export default Portfolios;
