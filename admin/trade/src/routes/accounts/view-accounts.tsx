/** @format */

import { AccountCard, AccountsList, CardsLoading } from '@/components';
import { useGetAccountsQuery } from '@/services';
import { ProfilePath } from '@/types';
import * as React from 'react';
import { Outlet, useParams, Link as RouterLink } from 'react-router-dom';
import { Stack } from '@mui/system';
import { GAP } from '@/constants';
import { Box, Button } from '@mui/material';

const Accounts: React.FC = () => {
  const { userId, profileId } = useParams<ProfilePath>();
  const {
    data: accounts = [],
    isLoading,
    isError,
    isFetching,
  } = useGetAccountsQuery({ userId, profileId } as ProfilePath);

  if (isError) throw new Error('some error occured in api call');

  return (
    <Stack gap={GAP}>
      <Box>
        <Button
          LinkComponent={RouterLink}
          component={RouterLink}
          to="create"
          variant="contained"
        >
          Create Account
        </Button>
      </Box>
      <Outlet />
      <AccountsList accounts={accounts} isLoading={isLoading || isFetching} />
    </Stack>
  );
};

export default Accounts;
