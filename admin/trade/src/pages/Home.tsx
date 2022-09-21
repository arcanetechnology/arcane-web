/** @format */

import * as React from 'react';
import { styled } from '@mui/material/styles';
import { Toolbar, CssBaseline, Typography, AppBar } from '@mui/material';
import Users, { User, Transactions, Transaction, Group } from './users';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { TradeBreadCrumbs } from '@/components';
import { Container } from '@mui/system';
import {
  logout,
  selectUser,
  useTradeDispatch,
  useTradeSelector,
} from '@/state';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/services/firebase';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function App() {
  const user = useTradeSelector(selectUser);
  const dispatch = useTradeDispatch();
  if (!user) return <Navigate to={'auth'} replace />;

  React.useEffect(() => {
    auth.tenantId = import.meta.env.VITE_GOOGLE_TENANT_ID;
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        dispatch(logout({}));
      }
    });
  }, []);
  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" elevation={0}>
        <Toolbar
          component={Container}
          maxWidth="xl"
          sx={{
            display: 'flex',
            flexDirection: 'row',
            gap: 2,
            alignContent: 'center',
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <Typography variant="h6">Trade Admin</Typography>
          <Typography>{user.email}</Typography>
        </Toolbar>
      </AppBar>
      <Container component="main" maxWidth="xl">
        <DrawerHeader />
        <TradeBreadCrumbs />
        <Outlet />
      </Container>
    </>
  );
}
