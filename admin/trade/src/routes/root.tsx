/** @format */

import * as React from 'react';
import { NavigationBar, SearchUsers, TradeBreadCrumbs } from '@/components';
import { Container } from '@mui/system';
import { Outlet } from 'react-router-dom';
import { Auth } from '@/types/frontend';

type RootProps = {
  user: Auth;
};

const Root: React.FC<RootProps> = ({ user }) => {
  return (
    <React.Fragment>
      <NavigationBar user={user} />
      <Container component="main" maxWidth="xl" sx={{ mt: 5 }}>
        <TradeBreadCrumbs />
        <SearchUsers />
        <Outlet />
      </Container>
    </React.Fragment>
  );
};

export default Root;
