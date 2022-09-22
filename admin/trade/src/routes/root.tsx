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
import { useAddUserMutation, useGetUsersQuery } from '@/services';
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
import { Add, Loop } from '@mui/icons-material';
import { toast } from 'react-toastify';

const Root: React.FC = () => {
  const { q } = useLoaderData() as { q: string };
  const { data: users, isLoading, refetch } = useGetUsersQuery(q);
  const [addUser, { isLoading: isAddUserLoading }] = useAddUserMutation();
  const submit = useSubmit();
  const debouncedSubmit = useDebounce(submit, 500);
  const navigation = useNavigation();
  getPath({ userId: 'user-1' }, 'profile');
  return (
    <React.Fragment>
      <NavigationBar />
      <Container component="main" maxWidth="xl" sx={{ mt: 5 }}>
        <TradeBreadCrumbs />
        <Grid container spacing={GAP}>
          <Grid xs="auto">
            <Paper
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                mb: 2,
              }}
            >
              <Box
                component="form"
                id="search-form"
                role="search"
                width={400}
                sx={{ display: 'flex', alignItems: 'center' }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
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
                {isLoading && <Loop />}
              </Box>
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <IconButton
                onClick={async () => {
                  try {
                    await addUser({}).unwrap();
                  } catch {
                    toast('error in creating user');
                  }
                }}
                color="primary"
                sx={{ p: '10px' }}
                aria-label="directions"
              >
                <Add />
              </IconButton>
            </Paper>
            <Box height={10}>
              {isAddUserLoading && (
                <LinearProgress sx={{ height: 10, borderRadius: 3 }} />
              )}
            </Box>
            <UsersList
              users={users ?? []}
              hasNextPage={false}
              loadMore={refetch}
            />
          </Grid>
          <Grid xs={8}>
            <Backdrop
              sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={navigation.state === 'loading'}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
            <Outlet />
          </Grid>
        </Grid>
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
