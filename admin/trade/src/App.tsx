/** @format */

import * as React from 'react';
import { styled } from '@mui/material/styles';
import {
  Box,
  Toolbar,
  CssBaseline,
  Typography,
  AppBar as MuiAppBar,
  AppBarProps as MuiAppBarProps,
} from '@mui/material';
import Users, { User, Transactions, Transaction, Group } from './pages/users';
import { Routes, Route } from 'react-router-dom';
import { TradeBreadCrumbs } from './components';
import Auth from './pages/Auth';
import { useFirebaseAuth } from './hooks';
import { auth } from './services/firebase';
import { selectUser, useTradeSelector } from './state';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

export default function App() {
  const user = useTradeSelector(selectUser);
  useFirebaseAuth(auth);
  console.log(user);
  if (!user) return <h1>please auth</h1>;
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" elevation={0}>
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Trade Admin
          </Typography>
        </Toolbar>
      </AppBar>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <TradeBreadCrumbs />
        <Routes>
          <Route path="/">
            <Route index element={<Users />} />
            <Route path=":userId">
              <Route index element={<User />} />
              <Route path="transactions">
                <Route index element={<Transactions />} />
                <Route path=":transactionId">
                  <Route index element={<Transaction />} />
                  <Route path=":id" element={<Group />} />
                </Route>
              </Route>
            </Route>
          </Route>
          <Route path="/auth" element={<Auth />} />
        </Routes>
      </Box>
    </Box>
  );
}
