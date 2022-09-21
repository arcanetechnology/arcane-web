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
import loading from '@/assets/auth.gif';

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
    <Box
      position={'absolute'}
      top={'50%'}
      left={'50%'}
      sx={{
        transform: 'translate(-50%,-50%)',
        textAlign: 'center',
      }}
      display="flex"
      flexDirection="column"
      gap={2}
    >
      <img src={loading} alt="loading" />
    </Box>
  );
};

export default Auth;
