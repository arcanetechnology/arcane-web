/** @format */

import { login, useTradeDispatch, updateToken } from '@/state';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import {
  getAuth,
  getRedirectResult,
  SAMLAuthProvider,
  signInWithRedirect,
} from 'firebase/auth';
import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Auth: React.FC = () => {
  const provider = new SAMLAuthProvider(import.meta.env.VITE_SAML_PROVIDER_ID);
  const auth = getAuth();
  auth.tenantId = import.meta.env.VITE_GOOGLE_TENANT_ID;

  const dispatch = useTradeDispatch();
  const navigate = useNavigate();

  // check if you are redirected here.
  React.useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (!result) {
          signInWithRedirect(auth, provider);
        } else {
          const { email, uid, photoURL, displayName } = result.user;
          dispatch(login({ email, uid, photoURL, displayName }));
          result.user.getIdToken(true).then((v) => {
            dispatch(updateToken(v));
            navigate('/');
          });
        }
      })
      .catch((err) => {
        toast('some error while logginin', { type: 'error' });
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
      <img src="https://c.tenor.com/3kLh3ryQQyoAAAAC/zootopia-sloth.gif" />
      <Typography variant="subtitle1">...</Typography>
    </Box>
  );
};

export default Auth;
