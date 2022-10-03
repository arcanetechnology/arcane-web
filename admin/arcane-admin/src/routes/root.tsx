/** @format */

import * as React from 'react';
import { NavigationBar, SearchUsers, TradeBreadCrumbs } from '@/components';
import { Container } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { Stack } from '@mui/material';
import { GAP } from '@/constants';
import { selectAuth, useTradeSelector } from '@/state';

const Root: React.FC = () => {
  const auth = useTradeSelector(selectAuth);
  return (
    <React.Fragment>
      <NavigationBar user={auth.user} />
      <Container component="main" maxWidth="xl" sx={{ mt: 5 }}>
        <Stack gap={GAP}>
          <TradeBreadCrumbs />
          <SearchUsers />
          <Outlet />
        </Stack>
      </Container>
    </React.Fragment>
  );
};

export default Root;
