/** @format */

import { CardsLoading } from '@/components';
import { useGetCryptosQuery } from '@/services';
import { PortfolioPath } from '@/types/frontend';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Alert } from '@mui/material';

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
    <React.Fragment>
      {cryptos.length > 0 ? (
        <Grid container spacing={2}>
          {cryptos.map((crypto) => (
            <h1 key={crypto.id}>{crypto.currency}</h1>
          ))}
        </Grid>
      ) : (
        <Alert variant="outlined" severity="error">
          portfolio has no crypto accounts
        </Alert>
      )}
    </React.Fragment>
  );
};

export default Cryptos;
