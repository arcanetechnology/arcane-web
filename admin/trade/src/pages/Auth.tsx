/** @format */

import {
  auth,
  signInWithRedirect,
  provider,
  getRedirectResult,
} from '@/services/firebase';
import { login, selectUser, useTradeDispatch, useTradeSelector } from '@/state';
import { Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import { onAuthStateChanged } from 'firebase/auth';
import * as React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Auth: React.FC = () => {
  const dispatch = useTradeDispatch();
  const navigate = useNavigate();
  React.useEffect(() => {
    auth.tenantId = import.meta.env.VITE_GOOGLE_TENANT_ID;
    getRedirectResult(auth)
      .then((result) => {
        if (!result) {
          signInWithRedirect(auth, provider);
        } else {
          dispatch(
            login({
              email: result.user.email,
              uid: result.user.uid,
              photoUrl: result.user.photoURL,
              displayName: result.user.displayName,
            })
          );
          navigate('/');
        }
      })
      .catch((er) => {
        console.log(er);
      });
  }, []);
  return (
    <Container component="main">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        sx={{ margin: '0 auto' }}
      >
        <Typography variant="h2">Authenticating...</Typography>
      </Box>
    </Container>
  );
};

export default Auth;
