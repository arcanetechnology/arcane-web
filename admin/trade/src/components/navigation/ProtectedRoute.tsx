/** @format */

import { useAuthStateChanged, useLogout } from '@/hooks';
import { useTradeSelector } from '@/state';
import { selectAuth } from '@/state/auth';
import { Auth } from '@/types/frontend';
import * as React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: (auth: Auth) => React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { auth } = useTradeSelector(selectAuth);
  const logout = useLogout();

  if (!auth) {
    return <Navigate to="/auth" replace />;
  }

  useAuthStateChanged(import.meta.env.VITE_GOOGLE_TENANT_ID, (user) => {
    if (!user) {
      logout();
    }
  });

  return <React.Fragment>{children(auth)}</React.Fragment>;
};

export default ProtectedRoute;
