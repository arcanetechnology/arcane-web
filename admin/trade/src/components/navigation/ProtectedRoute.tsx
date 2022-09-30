/** @format */

import { useTradeDispatch, useTradeSelector } from '@/state';
import { logout, selectAuth } from '@/state';
import { getAuth, onAuthStateChanged, onIdTokenChanged } from 'firebase/auth';
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
  React.useEffect(() => {
    onAuthStateChanged(getAuth(), (user) => {
      if (!user) {
        dispatch(logout());
      }
    });
  }, []);

  // update the token when token changes

  React.useEffect(() => {
    onIdTokenChanged(getAuth(), (user) => {
      console.log('token listener');
      console.log(user);
    });
  }, []);

  return <React.Fragment>{children}</React.Fragment>;
};

export default ProtectedRoute;
