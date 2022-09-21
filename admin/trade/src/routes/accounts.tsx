/** @format */

import { AccountCard, CardsLoading } from '@/components';
import { useGetAccountsQuery } from '@/services/accounts';
import { AccountPath, ProfilePath } from '@/types/frontend';
import * as React from 'react';
import { useParams } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { Alert } from '@mui/material';

const Accounts: React.FC = () => {
  const { userId, profileId } = useParams<ProfilePath>();
  const {
    data: accounts,
    isLoading,
    isError,
    isFetching,
  } = useGetAccountsQuery({ userId, profileId } as ProfilePath);

  if (isError) throw new Error('some error occured in api call');
  if (isLoading || isFetching) return <CardsLoading />;
  if (!accounts) return null;

  return (
    <React.Fragment>
      {accounts.length > 0 ? (
        <Grid container spacing={2}>
          {accounts.map((account) => (
            <AccountCard key={account.id} account={account} />
          ))}
        </Grid>
      ) : (
        <Alert variant="outlined" severity="error">
          profile has no accounts
        </Alert>
      )}
    </React.Fragment>
  );
};

export default Accounts;
