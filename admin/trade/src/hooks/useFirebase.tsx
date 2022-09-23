/** @format */

import {
  getAuth,
  getRedirectResult,
  onAuthStateChanged,
  SAMLAuthProvider,
  signInWithRedirect,
  User,
} from 'firebase/auth';
import * as React from 'react';
import { toast } from 'react-toastify';
import { useLogin } from './useAuth';

const provider = new SAMLAuthProvider(import.meta.env.VITE_SAML_PROVIDER_ID);

export const useTenantAuth = (tenantId: string) => {
  const auth = getAuth();
  auth.tenantId = tenantId;
  return auth;
};

export const useRedirectAuth = (tenantId: string) => {
  const auth = useTenantAuth(tenantId);
  const authorize = useLogin('/');
  React.useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (!result) {
          signInWithRedirect(auth, provider);
        } else {
          const { email, uid, photoURL, displayName } = result.user;
          authorize(
            email ?? undefined,
            uid,
            photoURL ?? undefined,
            displayName ?? undefined
          );
        }
      })
      .catch((err) => {
        toast(err, { type: 'error' });
      });
  }, []);
};

export const useAuthStateChanged = (
  tenantId: string,
  callback: (user: User | null) => void
) => {
  const auth = useTenantAuth(tenantId);
  React.useEffect(() => {
    onAuthStateChanged(auth, callback);
  }, []);
};
