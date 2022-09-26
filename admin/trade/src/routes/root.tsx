/** @format */

import * as React from 'react';
import { NavigationBar, TradeBreadCrumbs, UsersList } from '@/components';
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
} from '@mui/material';
import { Add, Loop, Search } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { Auth } from '@/types/frontend';

type RootProps = {
  user: Auth;
};

const Root: React.FC<RootProps> = ({ user }) => {
  const { q } = useLoaderData() as { q: string };
  const [getUsers, users] = useLazyGetUsersQuery();
  const submit = useSubmit();
  const debouncedSubmit = useDebounce(submit, 500);
  const navigation = useNavigation();

  React.useEffect(() => {
    getUsers(q).unwrap();
  }, [q]);

  console.log(users.currentData);
  return (
    <React.Fragment>
      <NavigationBar user={user} />
      <Container component="main" maxWidth="xl" sx={{ mt: 5 }}>
        <TradeBreadCrumbs />
        <Paper
          sx={{
            pr: 2,
            display: 'flex',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Box
            component="form"
            id="search-form"
            role="search"
            width="100%"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <InputBase
              sx={{ ml: 2, flex: 1, fontSize: 25, height: 60 }}
              placeholder="Search Trade Users"
              inputProps={{ 'aria-label': 'search trade users' }}
              name="q"
              type="search"
              key={q}
              autoFocus
              defaultValue={q}
              onChange={(event) => {
                debouncedSubmit(event.currentTarget.form);
              }}
            />
          </Box>
          <Divider sx={{ height: 28, m: 2 }} orientation="vertical" />
          <IconButton size="large">
            <Search />
          </IconButton>
        </Paper>
        <Outlet />
      </Container>
    </React.Fragment>
  );
};

export default Root;

export const loader: LoaderFunction = async ({ request }) => {
  const url = new URL(request.url);
  const q = url.searchParams.get('q');
  return { q };
};
