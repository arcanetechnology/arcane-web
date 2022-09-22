/** @format */

import { CryptoList, ListLoading } from '@/components';
import { useGetCryptosQuery } from '@/services';
import { PortfolioPath } from '@/types/frontend';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import { Stack } from '@mui/system';
import { GAP } from '@/constants';
import { Typography } from '@mui/material';

const Cryptos: React.FC = () => {
  const { userId, profileId, accountId, portfolioId } =
    useParams<PortfolioPath>();
  const {
    data: cryptos,
    isLoading,
    isError,
    isFetching,
  } = useGetCryptosQuery({
    userId,
    profileId,
    accountId,
    portfolioId,
  } as PortfolioPath);

  if (isError) throw new Error('some error occured in crypto api call');
  if (isLoading || isFetching) return <ListLoading />;
  if (!cryptos) return null;
  return (
    <Stack gap={GAP}>
      <CryptoList cryptos={cryptos} />
    </Stack>
  );
};

export default Cryptos;
