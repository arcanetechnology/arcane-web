/** @format */

import * as React from 'react';
import { NavigationBar, TradeBreadCrumbs, UsersView } from '@/components';
import { Container } from '@mui/system';
import { Outlet } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { GAP } from '@/constants';

const Root: React.FC = () => {
  return (
    <React.Fragment>
      <NavigationBar />
      <Container component="main" maxWidth="xl" sx={{ mt: 5 }}>
        <TradeBreadCrumbs />
        <Grid container spacing={GAP}>
          <Grid xs="auto">
            <UsersView />
          </Grid>
          <Grid xs="auto">
            <Outlet />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
};

export default Root;
