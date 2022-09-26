/** @format */

import * as React from 'react';
import {
  NavigationBar,
  SearchUsers,
  TradeBreadCrumbs,
  UsersList,
} from '@/components';
import { Container } from '@mui/system';
import {
  LoaderFunction,
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2'; // Grid version 2
import { GAP, getPath } from '@/constants';
import { useGetUsersQuery, useLazyGetUsersQuery } from '@/services';
import { useDebounce } from 'rooks';
import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  InputBase,
  LinearProgress,
  Paper,
  Stack,
} from '@mui/material';
import { Add, Loop, Search } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Auth } from '@/types/frontend';
import SearchUser from '@/components/users/SearchUsers';

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
