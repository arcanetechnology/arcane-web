/** @format */

import { CardsLoading, PortfolioCard } from '@/components';
import { useGetPortfoliosQuery } from '@/services';
import { AccountPath } from '@/types/frontend';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Alert } from '@mui/material';

const Portfolios: React.FC = () => {
  const { userId, profileId, accountId } = useParams<AccountPath>();
  const {
    data: portfolios,
    isLoading,
    isError,
    isFetching,
  } = useGetPortfoliosQuery({ userId, profileId, accountId } as AccountPath);

  if (isError) throw new Error('some error occured in portfolios api call');
  if (isLoading || isFetching) return <CardsLoading />;
  if (!portfolios) return null;
  return (
    <React.Fragment>
      {portfolios.length > 0 ? (
        <Grid container spacing={2}>
          {portfolios.map((portfolio) => (
            <PortfolioCard key={portfolio.id} portfolio={portfolio} />
          ))}
        </Grid>
      ) : (
        <Alert variant="outlined" severity="error">
          account has no portfolios
        </Alert>
      )}
    </React.Fragment>
  );
};

export default Portfolios;
