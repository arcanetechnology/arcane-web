/** @format */

import * as React from 'react';
import { NavigationBar, SearchUsers, TradeBreadCrumbs } from '@/components';
import { Container } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { Auth } from '@/types/frontend';
import { Stack } from '@mui/material';
import { GAP } from '@/constants';

type RootProps = {
  user: Auth;
};

const Root: React.FC<RootProps> = ({ user }) => {
  return (
    <React.Fragment>
      <NavigationBar user={user} />
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
