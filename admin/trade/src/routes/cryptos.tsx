/** @format */

import { CardsLoading, CryptoCard, CryptoList } from '@/components';
import { useGetCryptosQuery } from '@/services';
import { PortfolioPath } from '@/types/frontend';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Alert } from '@mui/material';
import { Stack } from '@mui/system';
import { GAP } from '@/constants';

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
  if (isLoading || isFetching) return <CardsLoading />;
  if (!cryptos) return null;
  return (
    <Stack gap={GAP}>
      <CryptoList cryptos={cryptos} />
    </Stack>
  );
};

export default Cryptos;
