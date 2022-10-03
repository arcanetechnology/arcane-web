/** @format */

import { useTradeDispatch, useTradeSelector } from '@/state';
import { logout, selectAuth, updateToken } from '@/state';
import {
  getAuth,
  onAuthStateChanged,
  onIdTokenChanged,
  getIdToken,
} from 'firebase/auth';
import * as React from 'react';
import { Navigate } from 'react-router-dom';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useTradeSelector(selectAuth);
  const dispatch = useTradeDispatch();

  if (!auth.user) {
    return <Navigate to="/auth" replace />;
  }

  // listen to user being logged in

  // debounce updateToken dispatch
  React.useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        dispatch(logout());
      } else {
        user.getIdToken().then((v) => dispatch(updateToken(v)));
      }
    });
  }, []);

  // update the token when token changes

  return <React.Fragment>{children}</React.Fragment>;
};

export default ProtectedRoute;
